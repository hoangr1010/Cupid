import Opening from "../models/Opening.js";

export const getOneOpening = async (req, res) => {
  try {
    const opening_id = req.params.opening_id;
    const foundOpening = await Opening.find({_id: opening_id});

    res.status(200).json({ 
      message: 'Opening gotten successfully', 
      data: foundOpening,
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error getting opening', 
      error: error.message,
    });
  }
};

export const createOpening = async (req, res) => {
  try {
    const data = req.body;
    const newOpening = await Opening.create(data);

    res.status(201).json({ 
      message: 'Opening created successfully', 
      data: newOpening,
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating request', 
      error: error.message,
    });
  }
};