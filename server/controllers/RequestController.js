import Request from "../models/Request.js";

export const getOneRequest = async (req, res) => {
  try {
    const request_id = req.params.request_id;
    const foundRequest = await Request.find({_id: request_id});

    res.status(200).json({ 
      message: 'Request gotten successfully', 
      data: foundRequest,
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error getting request', 
      error: error.message,
    });
  }
};

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