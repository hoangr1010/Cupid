import express from "express";
import { sendMessageToQueue } from "../services/SQS.js";

const NotiRouter = express.Router();

/************************************************************
 *********************** FOR TEST ***************************
 ************************************************************/

const test = async (req, res) => {
  try {
    const {a} = req.body;
    sendMessageToQueue(a);

    console.log(a);

    res.status(201).json({
      message: "success"
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      error: error.message,
    });
  }
}

NotiRouter.post("/test", test);

/************************************************************
 ************************************************************
 ************************************************************/

export default NotiRouter;