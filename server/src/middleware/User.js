import User from "../models/User.js";
import { parsePdfFromBuffer } from "./../utils/extractPDF.js";

export const checkUserId = async (req, res, next) => {
  const userId = req.get("userId");

  // check if userId exists in headers
  if (!userId) {
    return res.status(400).json({
      message: "No userId specified in the request header",
    });
  }

  // // this is commented out for optimized performance
  // // check if userId exists in the database
  // const user = await User.findById(userId);
  // if (!user) {
  //   return res.status(400).json({
  //     message: "User not found",
  //   });
  // }

  next();
};

export const updateResumeText = async (req, res, next) => {
  try {
    const userId = req.get("userId");

    // Parse the PDF and wait for the result
    const resumeText = await parsePdfFromBuffer(req.file.buffer);

    // Update the user with the parsed text
    await User.findByIdAndUpdate(
      userId,
      { $set: { "resume.text": resumeText } },
      { returnOriginal: false },
    );

    // Move on to the next middleware
    next();
  } catch (err) {
    res.status(400).json({
      message: "Error updating resume text",
      error: err.message,
    });
  }
};
