// import User from "../models/User.js";
import User from "../models/User.js";
import autoFill from "../utils/autoFill.js";
import mongoose from "mongoose";
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

export const addExperience = async (req, res) => {
  try {
    const userId = req.get("userId");
    const {
      company,
      location,
      position,
      type,
      start_m,
      start_y,
      end_m,
      end_y,
      current,
      description,
    } = req.body;

    const experience = {
      company: company,
      location: location,
      position: position,
      type: type,
      start_m: start_m,
      start_y: start_y,
      end_m: end_m,
      end_y: end_y,
      current: current,
      description: description,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { experience: experience } },
      { new: true, runValidators: true },
    );

    res.status(201).json({
      message: "add experience successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const userId = req.get("userId");
    const { name, start_m, start_y, end_m, end_y, current, description, link } =
      req.body;

    const project = {
      name: name,
      start_m: start_m,
      start_y: start_y,
      end_m: end_m,
      end_y: end_y,
      current: current,
      description: description,
      link: link,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { project: project } },
      { new: true, runValidators: true },
    );

    res.status(201).json({
      message: "add project successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const addPortfolio = async (req, res) => {
  try {
    const userId = req.get("userId");
    const { linkedin, github, website } = req.body;

    const updatedFields = {};
    if (linkedin !== "") updatedFields["portfolio.0.linkedin"] = linkedin;
    if (github !== "") updatedFields["portfolio.0.github"] = github;
    if (website !== "") updatedFields["portfolio.0.website"] = website;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      message: "Added portfolio successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

const addEducationSub = async (userId, educationData, options = {}) => {
  return User.findByIdAndUpdate(
    userId,
    { $push: { education: educationData } },
    { new: true, runValidators: true, session: options.session },
  );
};

const addExperienceSub = async (userId, experienceData, options = {}) => {
  return User.findByIdAndUpdate(
    userId,
    { $push: { experience: experienceData } },
    { new: true, runValidators: true, session: options.session },
  );
};
const addProjectSub = async (userId, projectData, options = {}) => {
  return User.findByIdAndUpdate(
    userId,
    { $push: { project: projectData } },
    { new: true, runValidators: true, session: options.session },
  );
};
const addPortfolioSub = async (userId, portfolioData, options = {}) => {
  return User.findByIdAndUpdate(
    userId,
    { $push: { portfolio: portfolioData } },
    { new: true, runValidators: true, session: options.session },
  );
};
export const addAll = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.get("userId");

    const educationData = req.body.education;
    const experienceData = req.body.experience;
    const projectData = req.body.project;
    const portfolioData = req.body.portfolio;

    await addEducationSub(userId, educationData, { session });
    await addExperienceSub(userId, experienceData, { session });
    await addProjectSub(userId, projectData, { session });
    await addPortfolioSub(userId, portfolioData, { session });

    await session.commitTransaction();
    session.endSession();

    const user = await User.findById(userId);

    res.status(201).json({
      message: "Add all successfully",
      data: user,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const autoFillResume = async (req, res) => {
  try {
    const { resumeText } = req.body;
    const jsonResume = await autoFill(resumeText);

    res.status(201).json({
      message: "return resume json object successfully",
      data: jsonResume,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};
