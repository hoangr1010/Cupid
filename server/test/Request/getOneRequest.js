import request from "supertest";
import createApp from "../../app";
import mongoose from "mongoose";
import Request from "./../../models/Request";

export default getOneRequestTest = () => {

  describe("Get One Request Test", () => {
    let app;

    beforeAll(() => {
      app = createApp();
    });

    afterAll(async () => {
      await mongoose.connection.collections["Requests"].drop();
    });

    // successfully get one request: Test that when a requestid is provided, the function returns a 200 status code with the request object.
    it("should get one request", async () => {
      const requestData = {
        candidate_id: new mongoose.Types.ObjectId("663009c09004ced3b81eeaf1"),
        company: "company_value",
        priority: 1,
        status: "waiting",
        scale: 2,
      };
  
      // Create a new request using the Request model
      const createdRequest = await Request.create(requestData);
      // Make a GET request to retrieve the created request
      const response = await request(app).get(`/request/${createdRequest._id}`);

      // Assert that the response status is 200
      expect(response.status).toBe(200);
      // Assert that the response body matches the created request data
      expect(response.body.data[0]._id).toBe(createdRequest._id.toString());
      
    });

    // Request Not Found: Test that when a requestid that doesn't exist in the database is provided, the function returns a 400 status code with an appropriate error message.
    it("should return 400 if request not found", async () => {
      // Make a GET request with an invalid request id
      const response = await request(app).get("/request/invalid_request_id");

      // Assert that the response status is 400
      expect(response.status).toBe(400);
      // Assert that the response body contains an error message
      expect(response.body.message).toBe("Error getting request");
    });
  });
};
