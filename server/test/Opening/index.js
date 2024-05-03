import getOneOpeningTest from "./getOneOpening";
import getAllOpeningTest from "./getAllOpening";
import createOpeningTest from "./createOpening";

export default OpeningTest = () => {
  describe("Opening", () => {
    getOneOpeningTest();
    getAllOpeningTest();
    createOpeningTest();
  });
};