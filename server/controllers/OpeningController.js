import Opening from "../models/Opening.js";
import { getBatchPeriod } from "./date-utilities.js"

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

export const getAllOpenings = async (req, res) => {
    try {
      let [startDate, endDate] = getBatchPeriod();
  
      const { user_id } = req.params;
      const openings = await Opening.find({
        referrer_id: user_id,
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        }
      });
  
      res.status(200).json({ 
        message: 'Openings with 3 months gotten successfully', 
        data: openings,
      });
    } catch (error) {
      res.status(400).json({ 
        message: 'Error getting openings within 3 months', 
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
      message: 'Error creating opening', 
      error: error.message,
    });
  }
};