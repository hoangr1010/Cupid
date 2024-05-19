import API from ".";
import { updateUser } from "../state";

export const sendResumeLink = async (resumeLink, dispatch, navigate) => {
  const response = await API.put(`/user/resume`, resumeLink);

  await dispatch(updateUser(response.data.data));

  navigate("/profile");
};

export const sendResume = async (resume) => {
  const formData = new FormData();
  formData.append("resume", resume);

  console.log("send resume")
  console.log(resume);
  console.log(formData.get("resume"));

  const response = await API.post(`user/upload`, formData);
};
