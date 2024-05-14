import Opening from "../models/Opening.js";
import Request from "../models/Request.js";
import Passcode from "./../models/Passcode.js";
import { sendEmail } from "./../services/Sendgrid/sendEmail.js";
import { generatePasscode } from "./../utils/generatePasscode.js";

export const getOneOpening = async (req, res) => {
  try {
    const opening_id = req.params.opening_id;
    const foundOpening = await Opening.find({ _id: opening_id });

    if (foundOpening.length < 1) {
      throw new Error("Opening not found");
    }

    res.status(200).json({
      message: "Opening gotten successfully",
      data: foundOpening,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting opening",
      error: error.message,
    });
  }
};

export const getAllOpenings = async (req, res) => {
  try {
    const user_id = req.get("userid");
    const openings = await Opening.find({
      referrer_id: user_id,
    });

    res.status(200).json({
      message: "Openings gotten successfully",
      data: openings,
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
    const { number, company } = req.body;
    const { userid } = req.headers;
    const openings = [];

    if (number < 1 || !number) {
      throw new Error("Invalid request number");
    }

    for (let i = 0; i < number; i++) {
      const newOpening = await Opening.create({
        referrer_id: userid,
        company,
        status: "waiting",
      });
      openings.push(newOpening);
    }

    res.status(201).json({
      message: "Opening created successfully",
      data: openings,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating opening",
      error: error.message,
    });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { openingId, newStatus } = req.body;

    // check if openingId exist
    const opening = await Opening.findById(openingId);
    if (!opening) {
      throw new Error("Opening not found");
    }

    // if opening having status is non-waiting but no request_id associated with, throw error
    if (newStatus != "waiting") {
      if (!opening.request_id) {
        throw new Error("not valid opening");
      }
    }

    // check if request_id exist and match with opening
    const request = await Request.findById(opening.request_id);
    if (!request) {
      throw new Error("Request not found");
    } else if (request._id.toString() !== opening.request_id.toString()) {
      throw new Error("Request not matched with opening");
    }

    // update status in both opening and request
    let updatedOpening, updatedRequest;
    if (newStatus != "waiting") {
      updatedOpening = await Opening.findByIdAndUpdate(
        openingId,
        { status: newStatus },
        { new: true },
      );
      updatedRequest = await Request.findByIdAndUpdate(
        opening.request_id,
        { status: newStatus },
        { new: true },
      );
    } else {
      // if new status is waiting, delete request_id and opening_id in document
      updatedOpening = await Opening.findByIdAndUpdate(
        openingId,
        { $unset: { request_id: 1 }, status: newStatus },
        { new: true },
      );
      updatedRequest = await Request.findByIdAndUpdate(
        opening.request_id,
        { $unset: { opening_id: 1 }, status: newStatus },
        { new: true },
      );
    }

    res.status(200).json({
      message: "Status updated successfully",
      data: updatedOpening,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating status",
      error: error.message,
    });
  }
};

export const processPassCode = async (req, res) => {
  try {
    const { gmail } = req.body;
    const userId = req.get("userId");

    // create passcode object
    const passcode = generatePasscode();
    await Passcode.create({
      pass_code: passcode,
      gmail,
      user_id: userId,
    });

    // send passcode to email
    const emailSuccess = await sendEmail(
      gmail,
      "hiwecupid@gmail.com",
      "Cupid: Email Verification Passcode",
      `This is your passcode: ${passcode}`,
      `<h1>Cupid</h1><p>This is your passcode: ${passcode}</p>`,
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
