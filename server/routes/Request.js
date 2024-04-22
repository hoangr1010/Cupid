import express from "express";
import {
  createRequest,
  getOneRequest,
  getAllRequests,
} from "../controllers/Request.js";

const requestRouter = express.Router();

requestRouter.get("/", getAllRequests);

requestRouter.get("/:request_id", getOneRequest);

requestRouter.post("/create", createRequest);

export default requestRouter;
