import express from "express";
import { createRequest, getOneRequest, getRequestsWithin3Months } from "../controllers/RequestController.js";

const requestRouter = express.Router();

requestRouter.get("/", getRequestsWithin3Months);

requestRouter.get("/:request_id", getOneRequest);

requestRouter.post("/create", createRequest);

export default requestRouter;