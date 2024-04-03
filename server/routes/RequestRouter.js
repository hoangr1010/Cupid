import express from "express";
import { createRequest } from "../controllers/RequestController.js";

const RequestBatchRouter = express.Router();

RequestBatchRouter.post("/create", createRequest);

export default RequestBatchRouter;