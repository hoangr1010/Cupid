import express from "express";
import {
  createOpening,
  getOneOpening,
  getAllOpenings,
  changeStatus,
  processPassCode,
  verifyPasscode,
  getAllExistingOpenings,
} from "../controllers/Opening.js";
import { checkUserId } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";

const OpeningRouter = express.Router();

OpeningRouter.get("/getAll", checkUserId, verifyToken, getAllOpenings);
OpeningRouter.get("/verifyPasscode", checkUserId, verifyToken, verifyPasscode);
OpeningRouter.get("/getAllExistingOpenings", getAllExistingOpenings);
OpeningRouter.get("/:opening_id", verifyToken, getOneOpening);

OpeningRouter.post("/create", checkUserId, verifyToken, createOpening);
OpeningRouter.post("/passcode", checkUserId, verifyToken, processPassCode);

OpeningRouter.put("/changeStatus", verifyToken, changeStatus);

export default OpeningRouter;
