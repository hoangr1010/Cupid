import express from "express";
import { getUserInfo } from "../controllers/Auth.js";

const AuthRouter = express.Router();

AuthRouter.get("/linkedin/:authCode", getUserInfo);

export default AuthRouter;
