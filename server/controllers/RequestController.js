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

export const getRequestsWithin3Months = async (req, res) => {
  try {
    // The month goes from 0 to 11
    let startMonth;
    let endMonth;
    const thisMonth = (new Date()).getMonth();
    const thisYear = (new Date()).getFullYear();

    for (startMonth = 0; startMonth <= 9; startMonth += 3) {
      endMonth = startMonth + 2;
      if (startMonth <= thisMonth && thisMonth <= endMonth) {
        break;
      }
    }

    const startDate = new Date(thisYear, startMonth, 1);
    const endDate = new Date(new Date(thisYear, endMonth + 1, 1) - 1);

    const { candidate_id } = req.body;
    const requests = await Request.find({candidate_id: candidate_id, created_date: {$gte: startDate, $lte: endDate}});

    res.status(200).json({ 
      message: 'Requests with 3 months gotten successfully', 
      data: requests,
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error getting requests within 3 months', 
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