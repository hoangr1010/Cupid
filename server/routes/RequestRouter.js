import express from "express";
import { createRequest } from "../controllers/RequestController.js";

const requestRouter = express.Router();

requestRouter.post("/create", createRequest);

export default requestRouter;