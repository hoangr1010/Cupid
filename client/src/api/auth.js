import { changeUser } from "./../state";
import API from "./index";

export const getUserInfo = async (authCode, navigate, dispatch) => {
  try {
    const response = await API.get(`/auth/linkedin/${authCode}`);
    console.log(response.data);

    // put data into redux
    dispatch(changeUser(response.data.userInfo));

    // redirect to page
    if (response.data.exist) {
      navigate("/profile");
    } else {
      navigate("/onboard");
    }
  } catch (err) {
    console.log(err);
  }
};
