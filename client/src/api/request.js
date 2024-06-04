import API from ".";
import { toast } from "sonner";
import { changeRequestList } from "../state";
import { validateFileName } from "../utils/request";
import { changeOneRequest } from "../state";
import axios, { Axios } from "axios";

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
    console.log("api: " + API.headers);
    // API.defaults.headers["requestId"] = request.request.request._id;
    // API.defaults.headers["fileName"] = name;

    // validate if name is in redux
    validateFileName(request, name);

    const headers = {};

    headers["requestId"] = request.request.request._id;
    headers["fileName"] = name;

    const response = await API.patch(`request/upload`, formData, {
      headers: headers,
    });

    dispatch(changeOneRequest(response.data.data));
    toast.success("Upload file successfully");
  } catch (error) {
    toast.error("Error uploading file: " + error);
  }
};

export const delFile = async (path, dispatch) => {
  try {
    const response = await API.post(`request/del`, { path });

    dispatch(changeOneRequest(response.data.data));
    toast.success("Delete file successfully");
  } catch (error) {
    toast.error("Error deleting file: " + error);
  }
};

export const getAllExistingRequests = async () => {
  try {
    const response = await API.get(`/request/getAllExistingRequests`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const getRemainingRequestsByCompany = async (companyName) => {
  try {
    const response = await API.get(
      `/request/getRemainingRequests/${companyName}`,
    );
    return response.data.data;
  } catch (err) {
    toast.error(err);
  }
};
