import express from "express";
import {
  createOpening,
  getAllOpenings,
  changeStatus,
  processPassCode,
  verifyPasscode,
  getAllExistingOpenings,
} from "../controllers/Opening.js";
import { checkUserId } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";

const OpeningRouter = express.Router();

OpeningRouter.use(checkUserId, verifyToken);

OpeningRouter.get("/getAll", getAllOpenings);
OpeningRouter.get("/verifyPasscode", verifyPasscode);
OpeningRouter.get("/getAllExistingOpenings", getAllExistingOpenings);

OpeningRouter.post("/create", createOpening);
OpeningRouter.post("/passcode", processPassCode);

OpeningRouter.put("/changeStatus", changeStatus);

export default OpeningRouter;
