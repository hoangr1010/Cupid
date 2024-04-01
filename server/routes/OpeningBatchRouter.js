import express from "express";
import { createOpeningBatch, deleteOpeningBatch } from "./../controllers/OpeningBatchController.js";

const OpeningBatchRouter = express.Router();

OpeningBatchRouter.post("/create", createOpeningBatch);
OpeningBatchRouter.delete('/delete/:id', deleteOpeningBatch);

export default OpeningBatchRouter;