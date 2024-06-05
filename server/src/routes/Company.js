import express from "express";
import { getCompany } from "./../controllers/Company.js";
import { verifyToken } from "./../middleware/Auth.js";

const CompanyRouter = express.Router();

CompanyRouter.get("/", verifyToken, getCompany);

export default CompanyRouter;
