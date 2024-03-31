import OpeningBatch from "../models/OpeningBatch.js";

export const createOpeningtBatch = async (req, res) => {
  try {
    const { batch_name } = req.body;
    const newOpeningBatch = await OpeningBatch.create({ batch_name });
    res.status(201).json({ message: 'Opening Batch created successfully', data: newOpeningBatch });
  } catch (error) {
    res.status(400).json({ message: 'Error creating Opening Batch', error: error.message });
  }
};