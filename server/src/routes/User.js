import express from "express";
import multer from "multer";
import {
  createUser,
  // updateResume,
  uploadResume,
  addEducation,
  addExperience,
  addProject,
  addPortfolio,
  addAll,
  autoFillResume,
} from "../controllers/User.js";
import { checkUserId, updateResumeText } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";

import { loadResumeToS3 } from "../middleware/fileHandle.js";
// TEST
// import { Notification } from "../utils/notification.js";
// import { sendNoti } from "../services/Notification/notification.js";

const UserRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

UserRouter.post("/create", createUser);

UserRouter.post(
  "/upload",
  upload.single("resume"),
  verifyToken,
  checkUserId,
  updateResumeText,
  loadResumeToS3,
  uploadResume,
);

UserRouter.put("/addEducation", checkUserId, verifyToken, addEducation);
UserRouter.put("/addExperience", checkUserId, verifyToken, addExperience);
UserRouter.put("/addProject", checkUserId, verifyToken, addProject);
UserRouter.put("/addPortfolio", checkUserId, verifyToken, addPortfolio);
UserRouter.put("/addAll", checkUserId, verifyToken, addAll);
UserRouter.post("/autoFillResume", checkUserId, verifyToken, autoFillResume);

// TEST
// UserRouter.post("/test", async (req, res) => {
//   try {
//     // make Notification
//     const noti = await Notification.openingRemindAction(
//       "openingRemindAction",
//       "666e989c9dd52b874141de11",
//     );
//     console.log(noti);

//     // send Notification data to the notification microservice
//     await sendNoti(noti);

//     res.status(201).json({
//       message: "success",
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "Error",
//       error: error.message,
//     });
//   }
// });

export default UserRouter;
