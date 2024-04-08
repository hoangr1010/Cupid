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
    // In JS, month is 0-indexed
    let startMonth;
    let endMonth;

    // Get current month and year
    const thisMonth = (new Date()).getMonth();
    const thisYear = (new Date()).getFullYear();

    // Get the start month and end month of the 3-month period that our current date is in (i.e. Jan 1st - 31st Mar, Apr 1st - Jun 30th, Jul 1st - Sep 30th, Oct 1st - Dec 31st)
    // For example, today is Apr 7th, so it is in the period [Apr 1st, Jun 30th]
    for (startMonth = 0; startMonth <= 9; startMonth += 3) {
      endMonth = startMonth + 2;
      if (startMonth <= thisMonth && thisMonth <= endMonth) {
        break;
      }
    }

    // Get the specific start date and end date from the months gotten in the 3-month period
    // For example, start month is April and end month is June, so the start date is April 1st and the end date is June 30th
    const startDate = new Date(thisYear, startMonth, 1);
    const endDate = new Date(new Date(thisYear, endMonth + 1, 1) - 1);

    // From this point on, it's just typical CREATE endpoint
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