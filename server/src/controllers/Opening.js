import Opening from "../models/Opening.js";
import Request from "../models/Request.js";
import Passcode from "./../models/Passcode.js";
import { sendEmail } from "./../services/Sendgrid/sendEmail.js";
import { generatePasscode } from "./../utils/generatePasscode.js";
import { getBatchPeriod } from "./../utils/date.js";

export const getAllOpenings = async (req, res) => {
  try {
    const userId = req.get("userid");

    let [startDate, endDate] = getBatchPeriod();

    // Check if referrer have opening object for this term
    const existingOpening = await Opening.findOne({
      referrer_id: userId,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    if (!existingOpening) {
      throw new Error("Couldn't find opening");
    }

    const requestIdList = existingOpening.request_id_list;

    const requestPromises = requestIdList.map(async (requestId) => {
      const request = await Request.findById(requestId).populate(
        "candidate_id",
        "_id first_name last_name",
      );

      return request;
    });

    const requests = await Promise.all(requestPromises);

    res.status(200).json({
      message: "Openings gotten successfully",
      data: { ...existingOpening.toObject(), requests },
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting openings",
      error: error.message,
    });
  }
};

export const createOpening = async (req, res) => {
  try {
    const userId = req.get("userid");
    const { amount, company } = req.body;
    let [startDate, endDate] = getBatchPeriod();

    // Check if referrer have opening object for this term
    const existingOpening = await Opening.findOne({
      referrer_id: userId,
      createdAt: { $gte: startDate, $lte: endDate },
    });

    let responseOpening;
    // if user already have opening
    if (existingOpening) {
      // check if the company they request match with the opening
      if (existingOpening.company == company) {
        // if matched, add up the original amount of the opening
        existingOpening.original_amount += amount;
        await existingOpening.save();

        responseOpening = existingOpening;
      } else {
        throw Error("Not matched company");
      }
    } else {
      // if not exist, create new opening for referrer this term
      responseOpening = await Opening.create({
        referrer_id: userId,
        original_amount: amount,
        company,
      });
    }
    res.status(200).json(responseOpening);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error creating opening",
      error: error.message,
    });
  }
};

export const processPassCode = async (req, res) => {
  try {
    const { gmail } = req.body;
    const userId = req.get("userId");

    // create passcode object
    const passcode = await Passcode.create({
      pass_code: generatePasscode(),
      gmail,
      user_id: userId,
    });

    // send passcode to email
    const emailSuccess = await sendEmail(
      gmail,
      "hiwecupid@gmail.com",
      "Cupid: Email Verification Passcode",
      `This is your passcode: ${passcode.pass_code}`,
      `<h1>Cupid</h1><p>This is your passcode: ${passcode.pass_code}</p>`,
    );

    if (emailSuccess) {
      res.status(200).json({
        message: "sent email successfully",
      });
    } else {
      throw new Error("Error sending passcode");
    }
  } catch (err) {
    res.status(400).json({
      message: "Error processing passcode",
      error: err.message,
    });
  }
};

export const verifyPasscode = async (req, res) => {
  try {
    const { passcode, gmail } = req.query;
    const userId = req.get("userId");

    // find passcode object
    const foundPasscode = await Passcode.findOne({
      pass_code: passcode,
      gmail,
      user_id: userId,
    });

    if (!foundPasscode) {
      throw new Error("Passcode not found");
    }

    res.status(200).json({
      message: "Passcode verified successfully",
      data: foundPasscode,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error verifying passcode",
      error: err.message,
    });
  }
};

export const getAllExistingOpenings = async (req, res) => {
  try {
    let [startDate, endDate] = getBatchPeriod();

    const openingList = await Opening.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const statisticMap = {};

    openingList.forEach((opening) => {
      if (!statisticMap[opening.company]) {
        statisticMap[opening.company] = 0;
      }

      const remainingAmount =
        opening.original_amount - opening.request_id_list.length;

      statisticMap[opening.company] += remainingAmount;
    });

    res.status(200).json({
      message: "All Openings gotten successfully",
      data: statisticMap,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting all Openings",
      error: error.message,
    });
  }
};
