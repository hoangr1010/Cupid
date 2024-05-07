import express from "express";
import { getCompany } from "./../controllers/Company.js";

const CompanyRouter = express.Router();

CompanyRouter.get("/", getCompany);

export default CompanyRouter;
