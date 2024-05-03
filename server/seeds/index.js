import dotenv from "dotenv";
dotenv.config(); // change this to {./../.env} if run in seeds folder
import Opening from "../src/models/Opening.js";
import Request from "../src/models/Request.js";
import connectDB from "./../src/utils/connectDB.js";
import {
  userOpening,
  testRequest,
  userRequest,
  testOpening,
} from "./sampleData.js";

connectDB(process.env.DATABASE_CONNECTION_STRING);

const writeSampleData = async (userId) => {
  try {
    await Opening.insertMany(userOpening(userId));
    await Opening.insertMany(testOpening());
    await Request.insertMany(testRequest());
    await Request.insertMany(userRequest(userId));
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
    await Request.deleteMany();

    console.log("Sample data deleted successfully");
  } catch (error) {
    console.error("Error deleting sample data", error);
  } finally {
    process.exit(0);
  }
};

// Exit if no options passed
if (!process.argv[2]) {
  console.log("Please specify an option -d or -w");
  process.exit(0);
}

if (process.argv[2] === "-d") {
  deleteSampleData();
} else if (process.argv[2] === "-w") {
  // Exit if no user id is provided
  if (!process.argv[3]) {
    console.log("Please specify your user id");
    process.exit(0);
  }
  const userId = process.argv[3].trim();

  writeSampleData(userId);
}
