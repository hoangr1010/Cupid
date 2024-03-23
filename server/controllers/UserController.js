import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const newUser = await User.create({ first_name, last_name });
    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating course', error: error.message });
  }
};

