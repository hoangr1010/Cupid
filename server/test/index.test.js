import connectDB from "../src/utils/connectDB.js";
import mongoose from "mongoose";
import UserTest from "./User/index.js";
import RequestTest from "./Request/index.js";
import OpeningTest from "./Opening/index.js";
import MatchingTest from "./MatchingAlgorithm/index.js";

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
    // RequestTest();
    // OpeningTest();
    MatchingTest();
  });
});
