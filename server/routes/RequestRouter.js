import express from "express";
import { createRequest, getOneRequest } from "../controllers/RequestController.js";

const requestRouter = express.Router();

requestRouter.get("/:request_id", getOneRequest);

requestRouter.post("/create", createRequest);

export default requestRouter;