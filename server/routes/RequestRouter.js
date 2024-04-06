import express from "express";
import { createRequest, getRequest } from "../controllers/RequestController.js";

const requestRouter = express.Router();

requestRouter.get("/:request_id", getRequest);

requestRouter.post("/create", createRequest);

export default requestRouter;