import express from "express";
import { createRequest } from "../controllers/RequestController.js";

const RequestRouter = express.Router();

RequestRouter.post("/create", createRequest);

export default RequestRouter;