import express from "express";
import { createOpening, getOneOpening, getAllOpenings } from "../controllers/Opening.js";

const OpeningRouter = express.Router();

OpeningRouter.get("/getAll/:user_id", getAllOpenings);

OpeningRouter.get("/:opening_id", getOneOpening);

OpeningRouter.post("/create", createOpening);

export default OpeningRouter;