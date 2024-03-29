import express from "express";
import { 
    createUser, 
    getUser 
} from "./../controllers/UserController.js"
const UserRouter = express.Router();

UserRouter.post("/create", createUser);
UserRouter.get("/profile", getUser);

export default UserRouter;