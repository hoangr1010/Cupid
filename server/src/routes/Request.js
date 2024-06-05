import express from "express";
import multer from "multer";
import {
  createRequest,
  getOneRequest,
  getAllRequests,
  changePriority,
  getAllExistingRequests,
  updateFile,
  deleteFile,
} from "../controllers/Request.js";
import { checkUserId } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";
import { loadFileRequestToS3, delFileS3 } from "../middleware/fileHandle.js";

const requestRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

requestRouter.get("/", checkUserId, verifyToken, getAllRequests);
requestRouter.get("/getAllExistingRequests", getAllExistingRequests);

requestRouter.get("/:request_id", getOneRequest);

requestRouter.post("/create", checkUserId, verifyToken, createRequest);

requestRouter.put("/priority", checkUserId, verifyToken, changePriority);

requestRouter.patch(
  "/upload",
  upload.single("file"),
  checkUserId,
  verifyToken,
  loadFileRequestToS3,
  updateFile,
);

requestRouter.patch("/del", checkUserId, verifyToken, delFileS3, deleteFile);

export default requestRouter;
