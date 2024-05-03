import mongoose from "mongoose";

const connectDB = async (database_url) => {
  try {
    await mongoose.connect(database_url);
    console.log("Successfully connect to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
