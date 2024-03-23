import express from "express";
import { createUser } from "./../controllers/UserController.js"
const UserRouter = express.Router();

UserRouter.post("/create", createUser);

export default UserRouter;