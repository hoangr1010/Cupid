import express from "express";
import { sendMessageToQueue } from "../services/SQS.js";
import { NotificationService } from "../microservice/Notification.js";

const NotiRouter = express.Router();

NotiRouter.post("/notiServcice", NotificationService)

/************************************************************
 *********************** FOR TEST ***************************
 ************************************************************/

// const test = async (req, res) => {
//   try {
//     console.log(req.body);
//     NotificationService(JSON.stringify(req.body));

//     res.status(201).json({
//       message: "success"
//     });
    
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: error.message,
//       error: error.message,
//     });
//   }
// }

// NotiRouter.post("/test", test);

/************************************************************
 ************************************************************
 ************************************************************/

export default NotiRouter;