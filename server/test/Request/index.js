import getOneRequestTest from "./getOneRequest";
import getAllRequestsTest from "./getAllRequests";
import createRequestTest from "./createRequest";

export default RequestTest = () => {
  describe("Request", () => {
    getOneRequestTest();
    getAllRequestsTest();
    createRequestTest();
  });
};
