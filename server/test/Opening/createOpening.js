import request from "supertest";
import createApp from "../../app";
import mongoose from "mongoose";
import Opening from "./../../models/Opening";
import User from "./../../models/User";

export default createOpeningTest = () => {
  describe("create", () => {
    let app;
    let userId;

    beforeAll(async () => {
      app = createApp();

      // Create a user
      const newUser = await User.create(user);
      userId = newUser._id;
    });

    afterAll(async () => {
      await mongoose.connection.collections["Openings"].drop();
      await mongoose.connection.collections["Users"].drop();
    });

    // Successfully create opening: Test that when a userid and a number are provided, the function returns a 201 status code with the openings object.
    it("Successfully create opening", async () => {
      const response = await request(app)
        .post(`/opening/create`)
        .set("userid", userId)
        .send({ number: 3, company: "Google" });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Opening created successfully");
      expect(response.body.data.length).toBe(3);
    });
    
    // Test that when userid is not provided
    it("Missing user", async () => {
      const response = await request(app)
        .post(`/opening/create`)
        .send({ number: 3, company: "Google" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "No userId specified in the request header",
      );
    });

    // Test that when userid is not existing
    it("User not found", async () => {
      const response = await request(app)
        .post(`/opening/create`)
        .set("userid", new mongoose.Types.ObjectId())
        .send({ number: 3, company: "Google" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User not found");
    });

    // Test that when number is not provided
    it("Missing number", async () => {
      const response = await request(app)
        .post(`/opening/create`)
        .set("userid", userId)
        .send({ company: "Google" });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid request number");
    });

    // Test that when number is less than 1
    it("Invalid number", async () => {
      const response = await request(app)
        .post(`/opening/create`)
        .set("userid", userId)
        .send({ number: 0, company: "Google" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid request number");
    });

    // Test that when company is not provided
    it("Missing company", async () => {
      const response = await request(app)
        .post(`/opening/create`)
        .set("userid", userId)
        .send({ number: 3 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Opening validation failed: company: Path `company` is required.");
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
