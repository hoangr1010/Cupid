import express from "express";
import { createUser, updateResume } from "./../controllers/UserController.js";
const UserRouter = express.Router();

UserRouter.post("/create", createUser);
UserRouter.put("/resume", updateResume);

export default UserRouter;
