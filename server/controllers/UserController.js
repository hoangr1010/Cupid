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
      message: "Error creating course",
      error: error.message,
    });
  }
};

export const updateResume = async (req, res) => {
  try {
    const resume_url = req.body;
    const userid = req.headers.userid;
    console.log(req.headers.userid);
    console.log(resume_url);

    const user = await User.findByIdAndUpdate(userid, {resume_url: resume_url});

    // return user to update redux-toolkit

    res.status(201).json({
      message: "Update resume successfully",
    })

  } catch (error) {
    res.status(400).json({
      message: "Error updating resume",
      error: error.message,
    });
  }
}