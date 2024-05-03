import express from "express";
import {
  createOpening,
  getOneOpening,
  getAllOpenings,
} from "../controllers/Opening.js";
import { checkUserId } from "../middleware/User.js";

const OpeningRouter = express.Router();

OpeningRouter.get("/getAll", checkUserId, getAllOpenings);

OpeningRouter.get("/:opening_id", getOneOpening);

OpeningRouter.post("/create", checkUserId, createOpening);

export default OpeningRouter;
