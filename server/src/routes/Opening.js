import express from "express";
import {
  createOpening,
  getOneOpening,
  getAllOpenings,
  changeStatus,
  processPassCode,
  verifyPasscode,
  getRemainingOpeningsByCompany,
  getAllExistingOpenings,
} from "../controllers/Opening.js";
import { checkUserId } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";

const OpeningRouter = express.Router();

OpeningRouter.get("/getAll", checkUserId, verifyToken, getAllOpenings);
OpeningRouter.get("/verifyPasscode", checkUserId, verifyPasscode, verifyToken);
OpeningRouter.get("/getAllExistingOpenings", getAllExistingOpenings);
OpeningRouter.get(
  "/getRemainingOpenings/:company_name",
  getRemainingOpeningsByCompany,
);
OpeningRouter.get("/:opening_id", verifyToken, getOneOpening);

OpeningRouter.post("/create", checkUserId, verifyToken, createOpening);
OpeningRouter.post("/passcode", checkUserId, verifyToken, processPassCode);

OpeningRouter.put("/changeStatus", verifyToken, changeStatus);

export default OpeningRouter;
