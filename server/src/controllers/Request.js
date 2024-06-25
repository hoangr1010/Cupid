import Request from "../models/Request.js";
import Opening from "../models/Opening.js";
import mongoose from "mongoose";
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

    await Promise.all(
      newRequestsData.map(async (request) => {
        const { _id, priority, status } = request;

        if (status != "waiting") {
          // if request is non-waiting, do nothing
          newRequests.push(request);
          return;
        } else {
          // change priority of waiting request
          const updatedRequest = await Request.findByIdAndUpdate(
            _id,
            { priority },
            { new: true },
          );
          newRequests.push(updatedRequest);
        }
      }),
    );

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

export const getAllExistingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "waiting" });

    const requestStatistic = {};

    requests.forEach((request) => {
      if (!requestStatistic[request.company]) {
        requestStatistic[request.company] = 0;
      }

      requestStatistic[request.company] += 1;
    });

    res.status(200).json({
      message: "All existing Requests gotten successfully",
      data: requestStatistic,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting all existing Requests",
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

    const request = await Request.findByIdAndUpdate(
      requestId,
      { $push: { request_files: filePath } },
      { new: true },
    );

    console.log(request);

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

    const data = await Request.findOneAndUpdate(
      { _id: request_id },
      { $pullAll: { request_files: [path] } },
      { new: true },
    );

    res.status(200).json({
      message: "Delete file successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error deleting file",
      error: error.message,
    });
  }
};

export const changeStatus = async (req, res) => {
  const { requestId, newStatus } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let updatedRequest;

    // if new status is waiting
    if (newStatus === "waiting") {
      // find the request
      let request = await Request.findById(requestId).session(session);

      const matchedOpeningId = request.opening_id;

      // update status of the request
      updatedRequest = await Request.findByIdAndUpdate(
        requestId,
        { status: newStatus, opening_id: null },
        { new: true, session },
      );

      // remove request_id in its opening
      if (matchedOpeningId) {
        let opening = await Opening.findById(matchedOpeningId).session(session);
        if (!opening) {
          throw new Error("Opening not found");
        }

        const hehe = await Opening.findByIdAndUpdate(
          matchedOpeningId,
          { $pull: { request_id_list: requestId } },
          { session },
        );
      } else {
        throw new Error("Couldn't find opening id");
      }
    } else if (newStatus === "referred" || newStatus === "approved") {
      // if new status is non-waiting
      updatedRequest = await Request.findByIdAndUpdate(
        requestId,
        { status: newStatus },
        { new: true, session },
      );
    } else {
      throw new Error("Not valid new status");
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Request status updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      message: "Error updating request status",
      error: error.message,
    });
  }
};

export const sendRequestInfo = async (req, res) => {
  const { requestId, messageText } = req.body;

  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { _id: requestId },
      {
        $set: { "InfoRequest.isActive": true },
        $push: {
          "InfoRequest.Conversation": {
            sender: "referrer",
            message: messageText,
          },
        },
      },
      { new: true },
    );

    // Check if the request exists and was updated
    if (!updatedRequest) {
      return res
        .status(404)
        .json({ message: "Request not found or not updated" });
    }

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
