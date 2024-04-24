import API from ".";
import { setUserId } from "../utils/api";
import { Toaster, toast } from "sonner";

export const getAllRequests = async (userId) => {
  try {
    setUserId(userId);
    const response = await API.get(`/request`);
    return response;
  } catch (err) {
    toast.error(err);
  }
};

export const createRequest = async (formData, userId) => {
  if (userId) {
    setUserId(userId);
  }

  try {
    const body = {
      candidate_id: userId,
      company: formData.company,
      priority: formData.priority,
      status: formData.status,
      scale: formData.scale,
    };

    const response = await API.post(`/request/create`, body);
    console.log(response.data.data);
    toast.success("New request has been created");
  } catch (err) {
    console.error(err);
    toast.error("Error creating new request");
  }
};
