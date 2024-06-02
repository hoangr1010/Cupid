import express from "express";
import multer from "multer";
import { createUser, updateResume, uploadResume } from "../controllers/User.js";
import { checkUserId, updateResumeText } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";

import { loadResumeToS3 } from "../middleware/resumeUpload.js";

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

export default UserRouter;
