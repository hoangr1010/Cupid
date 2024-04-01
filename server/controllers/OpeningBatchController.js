import OpeningBatch from "../models/OpeningBatch.js";

const createOpeningtBatch = async (req, res) => {
  try {
    const { batch_name } = req.body;
    const newOpeningBatch = await OpeningBatch.create({ batch_name });
    res.status(201).json({ message: 'Opening Batch created successfully', data: newOpeningBatch });
  } catch (error) {
    res.status(400).json({ message: 'Error creating Opening Batch', error: error.message });
  }
};

const deleteOpeningBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOpeningBatch = await OpeningBatch.findByIdAndDelete(id);
    if (!deletedOpeningBatch) {
      return res.status(404).json({ message: 'Opening Batch not found' });
    }
    res.status(200).json({ message: 'Opening Batch deleted successfully', data: deletedOpeningBatch });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting Opening Batch', error: error.message });
  }
};

module.exports = {
  createOpeningtBatch,
  deleteOpeningBatch
};