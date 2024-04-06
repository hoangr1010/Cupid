import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const data = req.body;
    const newRequest = await Request.create(data);

    res.status(201).json({ 
      message: 'Request created successfully', 
      data: newRequest,
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating request', 
      error: error.message,
    });
  }
};