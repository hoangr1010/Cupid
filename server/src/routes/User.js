import express from "express";
import multer from "multer";
import { createUser, updateResume, uploadResume } from "../controllers/User.js";
import { checkUserId } from "../middleware/User.js";
import { loadResumeToS3 } from "../middleware/resumeUpload.js";

const UserRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

UserRouter.post("/create", createUser);
UserRouter.put("/resume", checkUserId, updateResume);

UserRouter.post(
  "/upload",
  upload.single("resume"),
  checkUserId,
  loadResumeToS3,
  uploadResume,
);

export default UserRouter;
