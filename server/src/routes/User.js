import express from "express";
import { createUser, updateResume } from "../controllers/User.js";
import { checkUserId } from "../middleware/User.js";
import { verifyToken } from "../middleware/Auth.js";

const UserRouter = express.Router();

UserRouter.post("/create", createUser);
UserRouter.put("/resume", checkUserId, verifyToken, updateResume);

export default UserRouter;
