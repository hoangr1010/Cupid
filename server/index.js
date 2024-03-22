import dotenv from 'dotenv';
dotenv.config({path: "./env/.env"});
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import testRouter from  "./routes/test.js"

// CONFIGURATION
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }));

// ROUTES
app.use("/test", testRouter);
  
app.listen(process.env.PORT, () => {
    console.log(`Server running at localhost ${process.env.PORT}`);
});
  