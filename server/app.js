import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UserRouter from "./src/routes/User.js";
import AuthRouter from "./src/routes/Auth.js";
import requestRouter from "./src/routes/Request.js";
import OpeningRouter from "./src/routes/Opening.js";
import CompanyRouter from "./src/routes/Company.js";

const createApp = () => {
  // CONFIGURATION
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json({ limit: "30mb", extended: true }));

  // Set up routes
  app.use("/user", UserRouter);
  app.use("/auth", AuthRouter);
  app.use("/request", requestRouter);
  app.use("/opening", OpeningRouter);
  app.use("/company", CompanyRouter);
  app.get("/", (req, res) => {
    res.send("Hi, we're Cupid");
  });

  return app;
};

export default createApp;
