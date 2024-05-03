import createUserTest from "./createUser";
import updateResumeTest from "./updateResume";

export default UserTest = () => {
  describe("User", () => {
    createUserTest();
    updateResumeTest();
  });
};
