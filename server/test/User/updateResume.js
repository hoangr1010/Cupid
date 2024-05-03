import request from "supertest";
import createApp from "../../app";
import mongoose from "mongoose";
import User from "./../../src/models/User";

export default updateResumeTest = () => {
  describe("Update resume", () => {
    let app;
    let userId;

    beforeAll(async () => {
      app = createApp();

      // Create a user
      const newUser = await User.create(user);
      userId = newUser._id;
    });

    afterAll(async () => {
      await mongoose.connection.collections["Users"].drop();
    });

    // Successfully update resume: Test that when a userid and a resumeLink are provided, the function returns a 201 status code with the updated user object.
    it("Successfully update resume", async () => {
      const resumeLink = "https://example.com/test1";

      const response = await request(app)
        .put(`/user/resume`)
        .set("userid", userId)
        .send({ resumeLink });

      expect(response.status).toBe(201);
      expect(response.body.data._id).toBe(userId.toString());
      expect(response.body.data.resume_url).toBe(resumeLink);
    });

    // User Not Found: Test that when a userid that doesn't exist in the database is provided, the function returns a 400 status code with an appropriate error message.
    it("User Not Found", async () => {
      const resumeLink = "https://example.com/test2";

      const response = await request(app)
        .put(`/user/resume`)
        .set("userid", new mongoose.Types.ObjectId())
        .send({ resumeLink });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User not found");
    });

    // Missing User ID: Test that when no userid is provided, the function returns a 400 status code with an appropriate error message.
    it("Missing User ID", async () => {
      const resumeLink = "https://example.com/test3";

      const response = await request(app)
        .put(`/user/resume`)
        .send({ resumeLink });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "No userId specified in the request header",
      );
    });

    // Missing Resume Link: Test that when no resumeLink is provided, the function returns a 400 status code with an appropriate error message.
    it("Missing Resume Link", async () => {
      const response = await request(app)
        .put(`/user/resume`)
        .set("userid", userId);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "No resumeLink specified in the request body",
      );
    });
  });
};

const user = {
  linkedin_id: "123456789",
  email: "example@example.com",
  first_name: "John",
  last_name: "Doe",
  resume_url: "https://example.com/resume",
  picture_url: "https://example.com/picture",
};
