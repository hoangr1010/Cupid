import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const batch_id = req.urlParams.batch_id;
    const {candidate_id, company, priority, status} = req.body;
    const newRequest = await Request.create({ batch_id, candidate_id, company, priority, status });
    res.status(201).json({ message: 'Successfully created Request', data: newRequest });
  } catch (error) {
    res.status(400).json({ message: 'Error creating Request', error: error.message });
  }
};