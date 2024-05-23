import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import createApp from "./app.js";
import connectDB from "./src/utils/connectDB.js";
import connectRedis from "./src/utils/connectRedis.js";

const app = createApp();
connectDB(process.env.DATABASE_CONNECTION_STRING);
connectRedis(
  process.env.REDIS_PASSWORD,
  process.env.REDIS_HOST,
  process.env.REDIS_PORT,
);

app.listen(process.env.PORT, () => {
  console.log(`Server running at localhost ${process.env.PORT}`);
});

export default app;
