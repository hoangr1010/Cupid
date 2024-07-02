import dotenv from "dotenv";
dotenv.config();
import mongoose, { connect } from "mongoose";
import Request from "../src/models/Request.js";
import Opening from "../src/models/Opening.js";
import connectDB from "../src/utils/connectDB.js";
import { scaleCalculate } from "./scale/scale.js";
import { getBatchPeriod } from "../src/utils/date.js";
import { Notification } from "../src/utils/notification.js";
import { sendNoti } from "../src/services/Notification/notification.js";

/* 
Input: None
Output:
  - Array of requests
  - Array of openings
 */
export const getMatchingInput = async () => {
  let requests, openings;

  try {
    let [startDate, endDate] = getBatchPeriod();

    requests = await Request.find({
      opening_id: { $exists: false },
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // console.log(requests);
  } catch (error) {
    console.log("Error getting all requests");
    console.log(error.message);
  }

  try {
    openings = await Opening.find({
      $expr: {
        $gt: ["$original_amount", { $size: "$request_id_list" }],
      },
    });
    // console.log(openings);
  } catch (error) {
    console.log("Error getting all openings");
    console.log(error.message);
  }

  return [requests, openings];
};

/*
Input:
  - Array of Requests
  - Array of Openings
Output:
  - Array of 2-size arrays, each 2-size array representing a match
*/
export const runMatchingAlgorithm = (requestList, openingList) => {
  const requests = JSON.parse(JSON.stringify(requestList));
  const openings = JSON.parse(JSON.stringify(openingList));
  // console.log(requests);
  // console.log(openings);

  // Sort Requests according to scale
  requests.sort((a, b) => b.scale - a.scale);

  // Populate a map of available openings based on company's name
  const availableOpenings = new Map();
  for (const opening of openings) {
    if (!availableOpenings.has(opening.company)) {
      availableOpenings.set(opening.company, []);
    }

    availableOpenings.get(opening.company).push(opening);
  }

  // 1st Iteration: spread out available openings to as many people as possible
  const matchList = [];
  const pointers = new Map();
  const matchedUser = new Set();
  const matchedRequest = new Set();
  for (const request of requests) {
    if (matchedUser.has(request.candidate_id)) {
      continue;
    }

    if (!pointers.has(request.company)) {
      pointers.set(request.company, 0);
    }
    if (!availableOpenings.has(request.company)) {
      availableOpenings.set(request.company, []);
    }

    let p = pointers.get(request.company);
    const availableList = availableOpenings.get(request.company);

    while (
      p < availableList.length &&
      availableList[p].request_id_list.length >=
        availableList[p].original_amount
    ) {
      p += 1;
    }
    pointers.set(request.company, p);

    if (p < availableList.length) {
      availableList[p].request_id_list.push(request._id);
      matchList.push([request, availableList[p]]);
      matchedUser.add(request.candidate_id);
      matchedRequest.add(request._id);
    }
  }

  // 2nd Iteration: whoever has better scale gets the referral
  for (const request of requests) {
    if (matchedRequest.has(request._id)) {
      continue;
    }

    if (!pointers.has(request.company)) {
      pointers.set(request.company, 0);
    }

    if (!availableOpenings.has(request.company)) {
      availableOpenings.set(request.company, []);
    }

    let p = pointers.get(request.company);
    const availableList = availableOpenings.get(request.company);

    while (
      p < availableList.length &&
      availableList[p].request_id_list.length >=
        availableList[p].original_amount
    ) {
      p += 1;
    }
    pointers.set(request.company, p);

    if (p < availableList.length) {
      availableList[p].request_id_list.push(request._id);
      matchList.push([request, availableList[p]]);
    }
  }

  return matchList;
};

/*
Input:
  - Array of 2-size arrays, each 2-size array representing a match
Output:
  - None. Apply database changes using the given matchList
*/

export const applyMatchingChanges = async (matchList) => {
  for (const pair of matchList) {
    try {
      await Request.findOneAndUpdate(
        { _id: pair[0] },
        { opening_id: pair[1], status: "matched" },
      );
    } catch (error) {
      console.log("Error updating request");
      console.log(error.message);
    }

    try {
      await Opening.findOneAndUpdate(
        { _id: pair[1] },
        {
          $push: { request_id_list: pair[0] },
        },
        { new: true },
      );
    } catch (error) {
      console.log("Error updating opening");
      console.log(error.message);
    }

    try {
      const requestNoti = await Notification.matchingDone(
        "matchingDoneCandidate",
        pair[0].candidate_id,
      );
      console.log(requestNoti);

      const openingNoti = await Notification.matchingDone(
        "matchingDoneReferrer",
        pair[1].referrer_id,
      );
      console.log(openingNoti);

      await sendNoti(requestNoti);
      await sendNoti(openingNoti);
    } catch (error) {
      console.log("Error sending post-matching emails");
      console.log(error.message);
    }
  }
};

// For testing purposes:
const algorithmFunction = async () => {
  await connectDB(process.env.DATABASE_CONNECTION_STRING);

  try {
    // retrieve all requests and openings
    const inp = await getMatchingInput();
    const [requests, openings] = inp;

    // update request scale
    await scaleCalculate(requests);

    // run matching algorithm
    const matchList = runMatchingAlgorithm(requests, openings);
    console.log(matchList);
    await applyMatchingChanges(matchList);
    console.log("Matching algorithm ran successfully");
  } catch (err) {
    console.log(err.message);
  }
  mongoose.connection.close();
};

algorithmFunction(); // this only call when use command

export default algorithmFunction;
