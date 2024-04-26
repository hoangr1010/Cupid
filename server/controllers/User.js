// import User from "../models/User.js";
import User from "../models/User.js";

// create user profile -- POST
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await User.create(data);

    res.status(201).json({
      message: "User created successfully hehe",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};
