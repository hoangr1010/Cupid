import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from './routes/UserRouter.js';
import AuthRouter from './routes/AuthRouter.js';
import RequestBatchRouter from './routes/RequestBatchRouter.js';

// CONFIGURATION
const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }));

// Set up routes
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);
app.use("/request-batch", RequestBatchRouter);

// Connect to Database
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("Successfully connect to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

app.listen(process.env.PORT, () => {
    console.log(`Server running at localhost ${process.env.PORT}`);
});