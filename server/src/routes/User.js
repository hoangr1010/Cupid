import express from "express";
import multer from "multer";
import {
  createUser,
  updateResume,
  uploadResume,
  addEducation,
} from "../controllers/User.js";
import { checkUserId } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";

import { loadResumeToS3 } from "../middleware/fileHandle.js";

const UserRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

UserRouter.post("/create", createUser);
UserRouter.put("/resume", checkUserId, verifyToken, updateResume);

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

export default UserRouter;
