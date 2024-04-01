import express from "express";
import { createRequestBatch } from "./../controllers/RequestBatchController.js"
const RequestBatchRouter = express.Router();

RequestBatchRouter.post("/create", createRequestBatch);

export default RequestBatchRouter;