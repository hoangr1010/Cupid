import { changeUser } from "./../state";
import API from "./index";
import { toast } from "sonner"

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
    navigate("/");
    toast.error("Failed to login. Please try again.");
  }
};
