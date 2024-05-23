import dotenv from "dotenv";
dotenv.config();
import { createClient } from "redis";

const connectRedis = async (redis_password, redis_host, redis_port) => {
  const client = createClient({
    password: redis_password,
    socket: {
      host: redis_host,
      port: redis_port,
    },
  });

  client.on("connect", () => {
    console.log("Redis connected");
  });

  client.on("error", (err) => {
    console.log("Redis error", err);
  });

  await client.connect();
};

export default connectRedis;
