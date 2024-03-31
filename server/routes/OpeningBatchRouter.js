import express from "express";
import { createOpeningBatch } from "./../controllers/OpeningBatchController.js"
const OpeningBatchRouter = express.Router();

OpeningBatchRouter.post("/create", createOpeningBatch);

export default OpeningBatchRouter;