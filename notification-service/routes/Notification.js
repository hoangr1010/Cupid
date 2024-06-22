import express from "express";
import { sendMessageToQueue } from "../services/SQS.js";
import { notificationService } from "../microservice/Notification.js";
import { changeSeenField } from "../controllers/Notification.js";

const NotiRouter = express.Router();

NotiRouter.post("/notiServcice", notificationService);
NotiRouter.patch("/seenNoti", changeSeenField);

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