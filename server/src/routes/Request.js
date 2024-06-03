import express from "express";
import {
  createRequest,
  getOneRequest,
  getAllRequests,
  changePriority,
  getAllExistingRequests,
} from "../controllers/Request.js";
import { checkUserId } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";

const requestRouter = express.Router();

requestRouter.get("/", checkUserId, verifyToken, getAllRequests);
requestRouter.get("/getAllExistingRequests", getAllExistingRequests);

requestRouter.get("/:request_id", getOneRequest);

requestRouter.post("/create", checkUserId, verifyToken, createRequest);

requestRouter.put("/priority", checkUserId, verifyToken, changePriority);

export default requestRouter;
