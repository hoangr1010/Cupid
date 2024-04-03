import express from "express";
import { createRequestBatch } from "./../controllers/RequestBatchController.js"

import RequestRouter from "./RequestRouter.js";

const RequestBatchRouter = express.Router();

RequestBatchRouter.post("/create", createRequestBatch);

RequestBatchRouter.use("/:batch_id", (req, res, next) => {
  req.urlParams = {"batch_id": req.params.batch_id};
  next();
});

RequestBatchRouter.use("/:batch_id/Request/", RequestRouter);

export default RequestBatchRouter;