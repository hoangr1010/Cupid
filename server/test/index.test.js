import connectDB from "../utils/connectDB.js";
import mongoose from "mongoose";
import UserTest from "./User/index.js";
import RequestTest from "./Request/index.js";

describe("GENERAL TEST", () => {
  beforeAll(async () => {
    await connectDB(process.env.MOCK_DATABASE_CONNECTION_STRING);
    console.log("Connected to mock database");
  });

  afterAll(async () => {
    await mongoose.connection.close();
    console.log("Closed mock database");
  });

  describe("ENDPOINT TESTING", () => {
    // UserTest();
    RequestTest();
  });
});
