import API from ".";
import { toast } from "sonner";
import { changeRequestList } from "../state";
import { validateFileName } from "../utils/request";

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

export const sendFile = async (request, name, file, dispatch) => {
  try {
    const formData = new FormData();

    formData.append("file", file);
    API.defaults.headers["requestId"] = request.request.request._id;
    API.defaults.headers["fileName"] = name;

    // validate if name is in redux
    validateFileName(request, name);

    await API.post(`request/upload`, formData);
    const response = await getAllRequests(request.request.request.candidate_id);
    dispatch(changeRequestList(response.data.data));

    toast.success("Upload file successfully");
  } catch (error) {
    toast.error("Error uploading file: " + error);
  }
};

export const delFile = async (path, dispatch) => {
  try {
    await API.post(`request/del`, { path });
    const response = await getAllRequests(path.split("/")[0]);
    dispatch(changeRequestList(response.data.data));
    toast.success("Delete file successfully");
  } catch (error) {
    toast.error("Error deleting file: " + error);
  }
};
