import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Request from "../src/models/Request.js";
import Opening from "../src/models/Opening.js";
import connectDB from "../src/utils/connectDB.js";
import { scaleCalculate } from "./scale/scale.js";
import { getBatchPeriod } from "../src/utils/date.js";

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
    openings = await Opening.find({ request_id: { $exists: false } });
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
  for (const request of requests) {
    if (matchedUser.has(request.user)) {
      continue;
    }

    if (!pointers.has(request.company)) {
      pointers.set(request.company, 0);
    }
    if (!availableOpenings.has(request.company)) {
      availableOpenings.set(request.company, []);
    }

    const p = pointers.get(request.company);
    const availableList = availableOpenings.get(request.company);
    if (p < availableList.length) {
      matchedUser.add(request.user);
      matchList.push([request._id, availableList[p]._id]);
      pointers.set(request.company, p + 1);
    }
  }

  // 2nd Iteration: match requests with highest scales to openings based on company
  // Implement n-pointers to match requests with highest scales to openings based on company
  for (const request of requests) {
    const p = pointers.get(request.company);
    const availableList = availableOpenings.get(request.company);
    if (p < availableList.length) {
      matchList.push([request._id, availableList[p]._id]);
      pointers.set(request.company, p + 1);
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
        { request_id: pair[0], status: "matched" },
      );
    } catch (error) {
      console.log("Error updating opening");
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
    await applyMatchingChanges(matchList);
    console.log("Matching algorithm ran successfully");
  } catch (err) {
    console.log(err.message);
  }
  mongoose.connection.close();
};

algorithmFunction(); // this only call when use command

export default algorithmFunction;
