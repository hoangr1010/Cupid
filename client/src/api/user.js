import API from ".";
import { updateUser } from "../state";

export const sendResumeLink = async (resumeLink, dispatch, navigate) => {
  const response = await API.put(`/user/resume`, resumeLink);

  await dispatch(updateUser(response.data.data));

  navigate("/profile");
};

export const sendResume = async (resume, dispatch) => {
  const formData = new FormData();
  formData.append("resume", resume);

  const response = await API.post(`user/upload`, formData);

  console.log(response);

  await dispatch(updateUser(response.data.data));

};
