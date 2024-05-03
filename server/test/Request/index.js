import getOneRequestTest from "./getOneRequest";
import getAllRequestsTest from "./getAllRequest";
import createRequestTest from "./createRequest";

export default RequestTest = () => {
  describe("Request", () => {
    getOneRequestTest();
    getAllRequestsTest();
    createRequestTest();
  });
};
