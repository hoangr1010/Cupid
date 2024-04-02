import express from "express";
import { createRequestBatch, getRequestBatch } from "./../controllers/RequestBatchController.js"
const RequestBatchRouter = express.Router();

RequestBatchRouter.get("/:request_id", getRequestBatch);
RequestBatchRouter.post("/create", createRequestBatch);

export default RequestBatchRouter;