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

export const addExperience = async (formData) => {
  try {
    const body = {
      company: formData.company,
      location: formData.location,
      position: formData.position,
      type: formData.type,
      start_m: formData.start_m,
      start_y: formData.start_y,
      end_m: formData.end_m,
      end_y: formData.end_y,
      current: formData.current,
      description: formData.description,
    };
    const response = await API.put(`user/addExperience`, body);
    toast.success("added experience");
    return response.data.data;
  } catch (error) {
    toast.error("error adding experience: " + error);
    return;
  }
};

export const addProject = async (formData) => {
  try {
    const body = {
      name: formData.name,
      start_m: formData.start_m,
      start_y: formData.start_y,
      end_m: formData.end_m,
      end_y: formData.end_y,
      current: formData.current,
      description: formData.description,
      link: formData.link,
    };
    const response = await API.put(`user/addProject`, body);
    toast.success("added project");
    return response.data.data;
  } catch (error) {
    toast.error("error adding project: " + error);
    return;
  }
};

export const addPortfolio = async (formData) => {
  try {
    const body = {
      linkedin: formData.linkedin,
      github: formData.github,
      website: formData.website,
    };
    const response = await API.put(`user/addPortfolio`, body);
    toast.success("added portfolio");
    return response.data.data;
  } catch (error) {
    toast.error("error adding portfolio: " + error);
    return;
  }
};

export const autoFillResume = async (resumeText) => {
  try {
    const body = { resumeText: resumeText };
    const response = await API.post(`user/autoFillResume`, body);
    return response.data.data;
  } catch (error) {
    toast.error("error uploading file: " + error);
  }
};

export const addAll = async (
  educationData,
  experienceData,
  projectData,
  portfolioData,
) => {
  try {
    const body = {
      education: educationData,
      experience: experienceData,
      project: projectData,
      portfolio: portfolioData,
    };
    const response = await API.put(`user/addAll`, body);

    return response.data.data;
  } catch (error) {
    toast.error("error uploading file: " + error);
  }
};
