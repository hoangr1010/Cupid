import express from "express";
import {
  createRequest,
  getOneRequest,
  getAllRequests,
} from "../controllers/RequestController.js";

const requestRouter = express.Router();

requestRouter.get("/getAll/:user_id", getAllRequests);

requestRouter.get("/:request_id", getOneRequest);

requestRouter.post("/create", createRequest);

export default requestRouter;
