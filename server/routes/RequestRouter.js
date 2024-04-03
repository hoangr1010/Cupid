import express from "express";
import { createRequest, getRequest } from "../controllers/RequestController.js";

const RequestRouter = express.Router();

RequestRouter.get("/:request_id", getRequest);

RequestRouter.post("/create", createRequest);

export default RequestRouter;