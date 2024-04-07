import express from "express";
import { createOpening, getOneOpening } from "../controllers/OpeningController.js";

const OpeningRouter = express.Router();

OpeningRouter.get("/:opening_id", getOneOpening);

OpeningRouter.post("/create", createOpening);

export default OpeningRouter;