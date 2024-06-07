// import User from "../models/User.js";
import User from "../models/User.js";

// create user profile -- POST
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await User.create(data);

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const userId = req.get("userId");
    const resumePath = `${userId}/user-resume/${req.file.originalname}`;

    // Immediately update the user with the resume URL
    const user = await User.findByIdAndUpdate(
      userId,
      { "resume.url": resumePath },
      { returnOriginal: false },
    );

    res.status(201).json({
      message: "upload resume successful",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume_url = req.body;
    const userid = req.headers.userid;

    if (!resume_url.resumeLink) {
      throw new Error("No resumeLink specified in the request body");
    }

    const user = await User.findByIdAndUpdate(
      userid,
      { resume_url: resume_url.resumeLink },
      { returnOriginal: false },
    );

    res.status(201).json({
      message: "Update resume successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating resume",
      error: error.message,
    });
  }
};

export const addEducation = async (req, res) => {
  try {
    const userId = req.get("userId");
    const { school, major, degree, gpa, start_year, end_year } = req.body;

    const education = {
      school: school,
      major: major,
      degree: degree,
      gpa: gpa,
      start_year: start_year,
      end_year: end_year,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { education: education } },
      { new: true, runValidators: true },
    );

    res.status(201).json({
      message: "add education successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};
