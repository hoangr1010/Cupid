import { request } from "express";
import Request from "../models/Request.js";
import { getBatchPeriod } from "../utils/date.js";
import redisClient from "../utils/connectRedis.js";

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

export const getAllExistingRequests = async (req, res) => {
  try {
    const requests = await Request.find({});

    res.status(200).json({
      message: "All existing Requests gotten successfully",
      data: requests,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting all existing Requests",
      error: error.message,
    });
  }
};

export const getRemainingRequestsByCompany = async (req, res) => {
  const companyName = req.params.company_name;

  try {
    const [startDate, endDate] = getBatchPeriod();

    const data = await redisClient.get(
      `${companyName}:${startDate}:${endDate}`,
    );

    if (data) {
      console.log("Cache Hit");
      res.status(200).json({
        message: `All remaining Requests from ${req.params.company_name} gotten successfully`,
        data: JSON.parse(data),
      });
    } else {
      console.log("Cache Miss");
      const requests = await Request.find({
        status: "waiting",
        company: companyName,
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      redisClient.set(
        `${companyName}:${startDate}:${endDate}`,
        JSON.stringify(requests),
        {
          EX: 1800,
        },
      );

      res.status(200).json({
        message: `All remaining Requests from ${companyName} gotten successfully`,
        data: requests,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `Error getting remaining Openings from ${companyName}`,
      error: error.message,
    });
  }
};
