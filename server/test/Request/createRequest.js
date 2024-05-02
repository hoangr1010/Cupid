import request from "supertest";
import createApp from "../../app";
import mongoose from "mongoose";
import Request from "./../../models/Request";
import User from "./../../models/User";

export default createRequestTest = () => {
  describe("Create Request", () => {
    let app;
    let userId;

    beforeAll(async () => {
      app = createApp();

      // Create a user
      const newUser = await User.create(user);
      userId = newUser._id;
    });

    afterAll(async () => {
      await mongoose.connection.collections["Requests"].drop();
      await mongoose.connection.collections["Users"].drop();
    });

    // Successfully create request: Test that when a user id is provided, the function returns a 201 status code with the created request.
    it("should return a 201 status code with the created request", async () => {
      const response = await request(app)
        .post("/request/create")
        .set("userId", userId)
        .send({
          candidate_id: userId,
          ...request1,
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("Request created successfully");
      expect(response.body.data.candidate_id).toBe(userId.toString());
      await Request.deleteMany();
    });

    // User Not Found: Test that when a user id that doesn't exist in the database is provided, the function returns a 400 status code with an appropriate error message.
    it("should return a 400 status code because user doesn't exist in database", async () => {
      const unexistedUserId = new mongoose.Types.ObjectId(
        "123456789012345678901234",
      );

      const response = await request(app)
        .post("/request/create")
        .set("userId", unexistedUserId)
        .send({
          candidate_id: unexistedUserId,
          ...request1,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("User not found");

      await Request.deleteMany();
    });

    // Missing User ID: Test that when no user id is provided, the function returns a 400 status code with an appropriate error message.
    it("should return a 400 status code because user id is missing", async () => {
      const response = await request(app)
        .post("/request/create")
        .send({
          candidate_id: userId,
          ...request1,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        "No userId specified in the request header",
      );
    });

    // Missing Request Data: Test that when no request data is provided, the function returns a 400 status code with an appropriate error message.
    it("should return a 400 status code because request data is missing", async () => {
      const response = await request(app)
        .post("/request/create")
        .set("userId", userId);

      await Promise.all(
        unvalidRequestList.map(async (requestObject) => {
          const response = await request(app)
            .post("/request/create")
            .set("userId", userId)
            .send({
              candidate_id: userId,
              ...requestObject,
            });

          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBe("Error creating request");
        }),
      );
    });

    // Maximum number of requests reached
    it("should return a 400 status code because maximum number of requests reached", async () => {
      const requests = Array.from({ length: 10 }, (_, i) => ({
        candidate_id: userId,
        ...request1,
        priority: i + 1,
      }));

      const requestList = await Request.create(requests);

      const response = await request(app)
        .post("/request/create")
        .set("userId", userId)
        .send({
          candidate_id: userId,
          ...request1,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Maximum number of requests reached");

      await Request.deleteMany();
    });

    // Request with this priority already exists
    it("should return a 400 status code because request with this priority already exists", async () => {
      await Request.create({
        candidate_id: userId,
        ...request1,
      });

      const response = await request(app)
        .post("/request/create")
        .set("userId", userId)
        .send({
          candidate_id: userId,
          ...request1,
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Request with this priority already exists");
    });

    // Request with this company already exists
    it("should return a 400 status code because request with this company already exists", async () => {
      await Request.create({
        candidate_id: userId,
        ...request1,
      });

      const response = await request(app)
        .post("/request/create")
        .set("userId", userId)
        .send({
          ...request1,
          candidate_id: userId,
          priority: 2
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Request with this company already exists");
    });
  });
};

// User for test
const user = {
  linkedin_id: "123456789",
  email: "example@example.com",
  first_name: "John",
  last_name: "Doe",
  resume_url: "https://example.com/resume",
  picture_url: "https://example.com/picture",
};

// Data for test 1
const request1 = {
  company: "Example Company",
  priority: 1,
  status: "waiting",
  scale: 5,
};

// Data for test 2: missing required properties
const unvalidRequestList = [
  {
    priority: 1,
    status: "waiting",
    scale: 5,
  },
  {
    company: "Example Company",
    status: "waiting",
    scale: 5,
  },
  {
    company: "Example Company",
    priority: 1,
    scale: 5,
  },
  {
    company: "Example Company",
    priority: 1,
    scale: 5,
    status: "matched",
  },
];
