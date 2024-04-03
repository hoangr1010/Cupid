import RequestBatch from "../models/RequestBatch.js";

export const getRequestBatch = async (req, res) => {
  try {
    const { batch_id } = req.params;
    const batch = await RequestBatch.find({ _id: batch_id }).exec();
    res.status(201).json({ message: 'Successfully accessed Request Batch', data: batch });
  } catch (error) {
    res.status(400).json({ message: 'Error accessing Request Batch', error: error.message });
  }
};

export const createRequestBatch = async (req, res) => {
  try {
    const { batch_name } = req.body;
    const newBatch = await RequestBatch.create({ batch_name });
    res.status(201).json({ message: 'Successfully created Request Batch', data: newBatch });
  } catch (error) {
    res.status(400).json({ message: 'Error creating Request Batch', error: error.message });
  }
}