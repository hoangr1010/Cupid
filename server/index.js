import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import createApp from "./app.js";
import connectDB from "./src/utils/connectDB.js";
import redisClient from "./src/utils/connectRedis.js";

const app = createApp();
connectDB(process.env.DATABASE_CONNECTION_STRING);

app.listen(process.env.PORT, () => {
  console.log(`Server running at localhost ${process.env.PORT}`);
});

export default app;
