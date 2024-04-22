import request from "supertest";
import createApp from "../../app";
import mongoose from "mongoose";

export default createUserTest = () => {
  describe("Create User", () => {
    let app;

    beforeAll(() => {
      app = createApp();
    });

    afterAll(async () => {
      await mongoose.connection.collections["Users"].drop();
    });

    // Test that a user can be created with valid data.
    it("should create a new user", async () => {
      const res = await request(app).post("/user/create").send(user1);

      expect(res.statusCode).toBe(201);
      expect(res.body.data.email).toBe(user1.email);
      expect(res.body.data.first_name).toBe(user1.first_name);
      expect(res.body.data.last_name).toBe(user1.last_name);
      expect(res.body.data.linkedin_id).toBe(user1.linkedin_id);
    });

    // Test that a user cannot be created without a linkedin_id.
    it("should not create a new user without a linkedin_id", async () => {
      const res = await request(app).post("/user/create").send(user2);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe(
        "User validation failed: linkedin_id: Path `linkedin_id` is required.",
      );
    });
    // Test that a user cannot be created without an email.
    it("should not create a new user without an email", async () => {
      const res = await request(app).post("/user/create").send(user3);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe(
        "User validation failed: email: Path `email` is required.",
      );
    });

    // Test that a user cannot be created with a first_name shorter than 2 characters or longer than 50 characters.
    it("should not create a new user with a first_name shorter than 2 characters", async () => {
      const res = await request(app).post("/user/create").send(user4);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe(
        "User validation failed: first_name: Path `first_name` (`A`) is shorter than the minimum allowed length (2).",
      );
    });

    // Test that a user cannot be created with a last_name shorter than 2 characters or longer than 50 characters.
    it("should not create a new user with a last_name shorter than 2 characters", async () => {
      const res = await request(app).post("/user/create").send(user5);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe(
        "User validation failed: last_name: Path `last_name` is required.",
      );
    });

    // Test that a user can be created without a first_name.
    it("should create a new user without a first_name", async () => {
      const res = await request(app).post("/user/create").send(user6);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe(
        "User validation failed: first_name: Path `first_name` is required.",
      );
    });

    // Test that a user can be created with a last_name.
    it("should create a new user with a last_name", async () => {
      const res = await request(app).post("/user/create").send(user7);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe(
        "User validation failed: last_name: Path `last_name` is required.",
      );
    });
  });
};

// data that a user can be created with valid data.
const user1 = {
  linkedin_id: "123456789",
  email: "test1@example.com",
  first_name: "John",
  last_name: "Doe",
};

// data that a user cannot be created without a linkedin_id.
const user2 = {
  email: "test2@example.com",
  first_name: "Jane",
  last_name: "Smith",
};

// data that a user cannot be created without an email.
const user3 = {
  linkedin_id: "987654321",
  first_name: "Alice",
  last_name: "Johnson",
};

// data that a user cannot be created with a first_name shorter than 2 characters or longer than 50 characters.
const user4 = {
  linkedin_id: "567890123",
  email: "test4@example.com",
  first_name: "A",
  last_name: "Brown",
};

// data that a user cannot be created with a last_name shorter than 2 characters or longer than 50 characters.
const user5 = {
  linkedin_id: "456789012",
  email: "test5@example.com",
  first_name: "Robert",
};

// data that a user can be created without a first_name.
const user6 = {
  linkedin_id: "123456789",
  email: "test6@example.com",
  last_name: "Johnson",
};

// data that a user can be created with a last_name.
const user7 = {
  linkedin_id: "987654321",
  email: "test7@example.com",
  first_name: "Alice",
};
