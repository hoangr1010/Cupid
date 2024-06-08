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

