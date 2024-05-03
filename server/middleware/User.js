import mongoose from "mongoose";
import User from "../models/User.js";

export const checkUserId = async (req, res, next) => {
  const userId = req.get("userId");

  // check if userId exists in headers
  if (!userId) {
    return res.status(400).json({
      message: "No userId specified in the request header",
    });
  }

  // check if userId exists in the database
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  next();
};
