import request from "supertest";
import createApp from "../../app";
import mongoose from "mongoose";
import Request from "../../src/models/Request";
import User from "../../src/models/User";

export default getAllRequestsTest = () => {
  describe("Get All Request in 3 months Test", () => {
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

    // Get all requests within 3 months: Test that when a user id is provided, the function returns a 200 status code with the requests within 3 months.
    it("should return a 200 status code with the requests within 3 months", async () => {
      // add request to request collection
      await Promise.all(
        requestList.map(async (requestItem) => {
          await Request.create({ ...requestItem, candidate_id: userId });
        }),
      );

      // add old request to request collection
      await Promise.all(
        oldRequestList.map(async (requestItem) => {
          await Request.create({ ...requestItem, candidate_id: userId });
        }),
      );

      // only get requests from requestList but not old requests
      const response = await request(app)
        .get("/request")
        .set("userId", userId)
        .send();

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe(
        "Requests with 3 months gotten successfully",
      );
      expect(response.body.data.length).toBe(requestList.length);
    });

    // User Not Found: Test that when a user id that doesn't exist in the database is provided, the function returns a 400 status code with an appropriate error message.
    it("should return a 400 status code because user id doesn't exist in database", async () => {
      const response = await request(app)
        .get("/request")
        .set("userId", new mongoose.Types.ObjectId("123456789012345678901234"))
        .send();

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("User not found");
    });

    // Missing User ID: Test that when no user id is provided, the function returns a 400 status code with an appropriate error message.
    it("should return a 400 status code because Missing User ID in header", async () => {
      const response = await request(app).get("/request").send();

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        "No userId specified in the request header",
      );
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

// Data: Test case Get all requests within 3 months
const requestList = [
  {
    company: "Example Company",
    priority: 1,
    status: "waiting",
    scale: 1,
  },
  {
    company: "Example Company",
    priority: 1,
    status: "waiting",
    scale: 4,
  },
  {
    company: "Example Company",
    priority: 1,
    status: "waiting",
    scale: 3,
  },
];

const oldRequestList = [
  {
    company: "Example Company",
    priority: 1,
    status: "waiting",
    scale: 1,
    createdAt: new Date("2021-01-01"),
  },
  {
    company: "Example Company",
    priority: 1,
    status: "waiting",
    scale: 4,
    createdAt: new Date("2021-01-01"),
  },
  {
    company: "Example Company",
    priority: 1,
    status: "waiting",
    scale: 3,
    createdAt: new Date("2021-01-01"),
  },
];
