import API from ".";
import { toast } from "sonner";
import { updateUser } from "../state";

export const sendResumeLink = async (resumeLink, dispatch, navigate) => {
  const response = await API.put(`/user/resume`, resumeLink);

  await dispatch(updateUser(response.data.data));

  navigate("/profile");
};
