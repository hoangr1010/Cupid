import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import NotiRouter from "./routes/Notification.js";

const createApp = () => {
  // Configuration
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Routes

  // FOR TEST
  app.use("/", NotiRouter);

  return app;
};

export default createApp;
