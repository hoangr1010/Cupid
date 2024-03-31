import express from "express";
import { 
    createUser, 
    getUser,
    addExperience,
} from "./../controllers/UserController.js"
const UserRouter = express.Router();

UserRouter.post("/create", createUser);
UserRouter.get("/profile", getUser);

// for testing 
UserRouter.post("/profile/addExp", addExperience);

export default UserRouter;