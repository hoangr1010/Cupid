import { request } from "express";
import Request from "../models/Request.js";
import { getBatchPeriod } from "../utils/date.js";

export const getOneRequest = async (req, res) => {
  try {
    const request_id = req.params.request_id;
    const foundRequest = await Request.find({ _id: request_id });

    if (foundRequest.length < 1) {
      throw new Error("Request not found");
    }

    res.status(200).json({
      message: "Request gotten successfully",
      data: foundRequest,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting request",
      error: error.message,
    });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    let [startDate, endDate] = getBatchPeriod();

    const user_id = req.get("userId");

    const requests = await Request.find({
      candidate_id: user_id,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.status(200).json({
      message: "Requests with 3 months gotten successfully",
      data: requests,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting requests within 3 months",
      error: error.message,
    });
  }
};

export const createRequest = async (req, res) => {
  try {
    let [startDate, endDate] = getBatchPeriod();

    const user_id = req.get("userId");

    const requests = await Request.find({
      candidate_id: user_id,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const data = req.body;

    // check if the maximum number of requests has been reached
    if (requests.length == 10) {
      throw new Error("Maximum number of requests reached");
    } else if (requests.length > 10) {
      throw new Error(
        "Somehow there are already more than 10 requests. Something wrong must have happened",
      );
    }

    // check if the request with the priority exists
    if (requests.find((request) => request.priority == data.priority)) {
      throw new Error("Request with this priority already exists");
    }

    // check if the company exists
    if (requests.find((request) => request.company == data.company)) {
      throw new Error("Request with this company already exists");
    }

    const newRequest = await Request.create(data);

    res.status(201).json({
      message: "Request created successfully",
      data: newRequest,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating request",
      error: error.message,
    });
  }
};
