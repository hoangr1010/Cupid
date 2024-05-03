import request from "supertest";
import createApp from "../../app";
import mongoose from "mongoose";
import Opening from "./../../models/Opening";
import User from "./../../models/User";

export default getAllOpeningTest = () => {
  describe("Get All Opening", () => {
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

    // successfully get all openings: Test that when a user id is provided, the function returns a 200 status code with the openings object.
    it("successfully get all openings", async () => {
      const openings = await Promise.all(
        openingList.map(async (opening) => {
          return await Opening.create({ ...opening, referrer_id: userId });
        }),
      );

      const response = await request(app)
        .get(`/opening/getAll`)
        .set("userid", userId)
        .send();

      expect(response.body.message).toBe("Openings gotten successfully");
      expect(response.body.data.length).toBe(openingList.length);
    });

    // user not found: Test that when a user id that doesn't exist in the database is provided, the function returns a 400 status code with an appropriate error message.
    it("user not found", async () => {
      const response = await request(app)
        .get(`/opening/getAll`)
        .set("userid", new mongoose.Types.ObjectId())
        .send();

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User not found");
    });

    // Missing user: Test that when a user id that doesn't exist in the database
    it("missing user", async () => {
      const response = await request(app).get(`/opening/getAll`).send();

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "No userId specified in the request header",
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

const openingList = [
  {
    company: "Google",
    status: "waiting",
  },
  {
    company: "Facebook",
    status: "waiting",
  },
  {
    company: "Amazon",
    status: "waiting",
  },
];
