import express from "express";
import { createUser, updateResume } from "../controllers/User.js";
import { checkUserId } from "../middleware/User.js";
const UserRouter = express.Router();

UserRouter.post("/create", createUser);
UserRouter.put("/resume", checkUserId, updateResume);

export default UserRouter;
