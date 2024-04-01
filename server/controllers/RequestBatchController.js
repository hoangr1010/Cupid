import RequestBatch from "../models/RequestBatch.js";

export const createRequestBatch = async (req, res) => {
  try {
    const { batch_name } = req.body;
    const newRequestBatch = await RequestBatch.create({ batch_name });
    res.status(201).json({ message: 'Request Batch created successfully', data: newRequestBatch });
  } catch (error) {
    res.status(400).json({ message: 'Error creating Request Batch', error: error.message });
  }
};