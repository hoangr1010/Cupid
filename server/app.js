import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UserRouter from "./routes/User.js";
import AuthRouter from "./routes/Auth.js";
import requestRouter from "./routes/Request.js";
import OpeningRouter from "./routes/Opening.js";

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

  return app;
};

export default createApp;
