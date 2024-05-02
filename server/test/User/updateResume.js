import request from "supertest";
import createApp from "../../app";
import mongoose from "mongoose";
import User from "./../../models/User";

export default updateResumeTest = () => {
  describe("Update resume", () => {
    let app;

    beforeAll(() => {
      app = createApp();
    });

    afterAll(async () => {
      await mongoose.connection.collections["Users"].drop();
    });
  });
  
  // Successfully update resume: Test that when a userid and a resumeLink are provided, the function returns a 201 status code with the updated user object.

  // User Not Found: Test that when a userid that doesn't exist in the database is provided, the function returns a 400 status code with an appropriate error message.

  // Invalid User ID: Test that when an invalid userid (not in the correct format) is provided, the function returns a 400 status code with an appropriate error message.
  
  // Missing User ID: Test that when no userid is provided, the function returns a 400 status code with an appropriate error message.
  
  // Missing Resume Link: Test that when no resumeLink is provided, the function returns a 400 status code with an appropriate error message.
  
  // Database Error: Test that when a database error occurs (you can simulate this by mocking an error in the User.findByIdAndUpdate function), the function returns a 400 status code with an appropriate error message.

}