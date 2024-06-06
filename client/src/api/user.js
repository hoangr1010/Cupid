import { toast } from "sonner";
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

  try {
    const response = await API.post(`user/upload`, formData);

    await dispatch(updateUser(response.data.data));
    toast.success("Resume uploaded");
  } catch (error) {
    toast.error("error uploading file: " + error);
  }
};

export const addEducation = async (formData) => {
  try {
    const body = {
      school: formData.school,
      major: formData.major,
      degree: formData.major,
      gpa: formData.gpa,
      start_year: formData.start_year,
      end_year: formData.end_year,
    };
    const response = await API.put(`user/addEducation`, body);
    toast.success("added education");
    return response.data.data;
  } catch (error) {
    toast.error("error adding education: " + error);
    return;
  }
};
