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
  changeStatus,
  sendRequestInfo,
  updateMultipleFiles
} from "../controllers/Request.js";
import { checkUserId } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";
import {
  loadFileRequestToS3,
  delFileS3,
  multipleFilesToS3,
} from "../middleware/fileHandle.js";

const requestRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

requestRouter.use(checkUserId, verifyToken);

requestRouter.get("/", getAllRequests);
requestRouter.get("/getAllExistingRequests", getAllExistingRequests);

requestRouter.get("/:request_id", getOneRequest);

requestRouter.post("/create", createRequest);

requestRouter.put("/priority", changePriority);
requestRouter.put("/changeStatus", changeStatus);
requestRouter.put("/sendRequestInfo", sendRequestInfo);

requestRouter.patch(
  "/upload",
  upload.single("file"),
  checkUserId,
  verifyToken,
  loadFileRequestToS3,
  updateFile,
);

requestRouter.patch(
  "/uploadMultiple",
  upload.array("file", 10),
  multipleFilesToS3,
  updateMultipleFiles,
);

requestRouter.patch("/del", checkUserId, verifyToken, delFileS3, deleteFile);

export default requestRouter;
