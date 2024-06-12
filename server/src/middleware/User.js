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

    // Start parsing the PDF in the background
    parsePdfFromBuffer(req.file.buffer)
      .then((resumeText) => {
        // Once the parsing is finished, update the user with the parsed text
        User.findByIdAndUpdate(
          userId,
          { $set: { "resume.text": resumeText } },
          { returnOriginal: false },
        ).catch((err) => {
          console.error("Error updating user:", err);
        });
      })
      .catch((err) => {
        console.error("Error parsing PDF:", err);
      });

    // Move on to the next middleware without waiting for the parsing to finish
    next();
  } catch (err) {
    res.status(400).json({
      message: "Error updating resume text",
      error: err.message,
    });
  }
};
