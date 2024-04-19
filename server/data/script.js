import dotenv from "dotenv";
dotenv.config({ path: "./../.env" });
import Opening from "./../models/Opening.js";
import User from "./../models/User.js";
import Request from "./../models/Request.js";
import mongoose from "mongoose";
import { openings, requests, users } from "./sampleData.js";

try {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
  console.log("Successfully connect to MongoDB");
} catch (error) {
  console.log(error);
  process.exit(0);
}

const writeSampleData = async () => {
  try {
    await Opening.insertMany(openings);
    await Request.insertMany(requests);
    await User.insertMany(users);
    console.log("Sample data created successfully");
  } catch (error) {
    console.error("Error creating sample data", error);
  } finally {
    process.exit(0);
  }
};

const deleteSampleData = async () => {
  try {
    await Opening.deleteMany();

    await Opening.deleteMany({ $or: openings });
    await Request.deleteMany({ $or: requests });
    await User.deleteMany({ $or: users });

    console.log("Sample data deleted successfully");
  } catch (error) {
    console.error("Error deleting sample data", error);
  } finally {
    process.exit(0);
  }
};

if (process.argv[2] === "-d") {
  deleteSampleData();
} else if (process.argv[2] === "-w") {
  writeSampleData();
}
