import request from "supertest";
import createApp from "../../app";
import mongoose from "mongoose";
import Opening from "./../../src/models/Opening";

export default getOneOpeningTest = () => {
  describe("Get One Opening Test", () => {
    let app;

    beforeAll(() => {
      app = createApp();
    });

    afterAll(async () => {
      await mongoose.connection.collections["Openings"].drop();
    });

    // successfully get one opening: Test that when an openingid is provided, the function returns a 200 status code with the opening object.
    it("should get one opening", async () => {
      const openingData = {
        referrer_id: new mongoose.Types.ObjectId("663009c09004ced3b81eeaf1"),
        company: "company_value",
        status: "waiting",
      };

      // Create a new opening using the Opening model
      const createdOpening = await Opening.create(openingData);
      // Make a GET request to retrieve the created opening
      const response = await request(app).get(`/opening/${createdOpening._id}`);

      // Assert that the response status is 200
      expect(response.status).toBe(200);
      // Assert that the response body matches the created opening data
      expect(response.body.data[0]._id).toBe(createdOpening._id.toString());

      Opening.deleteMany();
    });

    // opening not found: Test that when an openingid that doesn't exist in the database is provided, the function returns a 400 status code with an appropriate error message.
    it("should return an error when opening is not found", async () => {
      const opening_id = new mongoose.Types.ObjectId(
        "663009c09004ced3b81eeaf1",
      );
      const response = await request(app).get(`/opening/${opening_id}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Opening not found");
    });

    // invalid opening id: Test that when an invalid openingid (not in the correct format) is provided, the function returns a 400 status code with an appropriate error message.
    it("should return an error when opening id is invalid", async () => {
      const opening_id = "invalid_id";
      const response = await request(app).get(`/opening/${opening_id}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Error getting opening");
    });

    // missing opening id: Test that when an invalid openingid
    it("should return an error when opening id is missing", async () => {
      const response = await request(app).get("/opening/");

      expect(response.status).toBe(404);
    });
  });
};
