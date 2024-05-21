import API from ".";
import { toast } from "sonner";

export const getAllRequests = async (userId) => {
  try {
    const response = await API.get(`/request`);
    return response;
  } catch (err) {
    toast.error(err);
  }
};

export const createRequest = async (formData, userId) => {
  try {
    const body = {
      candidate_id: userId,
      company: formData.company,
      priority: formData.priority,
      status: formData.status,
      scale: formData.scale,
      job_posting_url: formData.jobPostingUrl,
    };

    const response = await API.post(`/request/create`, body);
    toast.success("New request has been created");
    return response.data.data;
  } catch (err) {
    console.error(err);
    toast.error("Error creating new request");
  }
};

export const changeRequestPriority = async (newRequests) => {
  try {
    const response = await API.put("/request/priority", { newRequests });
    return response.data.data;
  } catch (err) {
    toast.error(err);
  }
};
