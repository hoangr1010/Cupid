import express from "express";
import {
  createRequest,
  getOneRequest,
  getAllRequests,
  changePriority,
} from "../controllers/Request.js";
import { checkUserId } from "../middleware/User.js";

const requestRouter = express.Router();

requestRouter.get("/", checkUserId, getAllRequests);

requestRouter.get("/:request_id", getOneRequest);

requestRouter.post("/create", checkUserId, createRequest);

requestRouter.put("/priority", checkUserId, changePriority);

export default requestRouter;
