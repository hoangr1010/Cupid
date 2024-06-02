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

    const newRequest = await Request.create({
      candidate_id: user_id,
      ...data,
    });

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

export const changePriority = async (req, res) => {
  try {
    const newRequestsData = req.body.newRequests;
    const newRequests = [];
    for (const request of newRequestsData) {
      const { _id, priority, status } = request;

      if (status != "waiting") {
        // if request is non-waiting, do nothing
        newRequests.push(request);
        continue;
      } else {
        // change priority of waiting request
        const updatedRequest = await Request.findByIdAndUpdate(
          _id,
          { priority },
          { new: true },
        );
        newRequests.push(updatedRequest);
      }
    }

    res.status(200).json({
      message: "Priority changed successfully",
      data: newRequests,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error changing priority",
      error: error.message,
    });
  }
};

export const updateFile = async (req, res) => {
  try {
    const requestId = req.get("requestId");
    const fileName = req.get("fileName");
    const userId = req.get("userId");
    const filePath = `${userId}/request/${requestId}/${fileName}`;

    // console.log(filePath);

    const request = await Request.findByIdAndUpdate(
      requestId,
      { $push: { request_files: filePath } },
      { returnOriginal: false },
    );

    // console.log(request);
    res.status(200).json({
      message: "Upload file successfully",
      data: request,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error storing file path",
      error: error.message,
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { path } = req.body;
    
    const request_id = path.split("/")[2];
    const request = await Request.findById(request_id);
    
    const new_request_files = request.request_files.filter((e) => e != path);
    const data = await Request.findByIdAndUpdate(request_id, {
      request_files: new_request_files,
    });

    res.status(200).json({
      message: "Delete file successfully",
      data: data,
    });
    // console.log(request.request_files.filter((e) => e != path));
    // console.log(request);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error deleting file",
      error: error.message,
    });
  }
};
