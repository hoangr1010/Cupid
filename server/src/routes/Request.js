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

requestRouter.use(checkUserId, verifyToken);

requestRouter.get("/", getAllRequests);
requestRouter.get("/getAllExistingRequests", getAllExistingRequests);

requestRouter.get("/:request_id", getOneRequest);

requestRouter.post("/create", createRequest);

requestRouter.put("/priority", changePriority);

export default requestRouter;
