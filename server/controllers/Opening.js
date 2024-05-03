import Opening from "../models/Opening.js";

export const getOneOpening = async (req, res) => {
  try {
    const opening_id = req.params.opening_id;
    const foundOpening = await Opening.find({ _id: opening_id });

    if (foundOpening.length < 1) {
      throw new Error("Opening not found");
    }

    res.status(200).json({
      message: "Opening gotten successfully",
      data: foundOpening,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting opening",
      error: error.message,
    });
  }
};

export const getAllOpenings = async (req, res) => {
  try {
    const user_id = req.get("userid");
    const openings = await Opening.find({
      referrer_id: user_id,
    });

    res.status(200).json({
      message: "Openings gotten successfully",
      data: openings,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error getting openings",
      error: error.message,
    });
  }
};

export const createOpening = async (req, res) => {
  try {
    const { number, company } = req.body;
    const { userid } = req.headers;
    const openings = [];

    if (number < 1 || !number) {
      throw new Error("Invalid request number");
    }

    for (let i = 0; i < number; i++) {
      const newOpening = await Opening.create({
        referrer_id: userid,
        company,
        status: "waiting",
      });
      openings.push(newOpening);
    }

    res.status(201).json({
      message: "Opening created successfully",
      data: openings,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating opening",
      error: error.message,
    });
  }
};
