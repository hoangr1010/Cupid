import API from "./index";
import { setUserId } from "./../utils/api.js";
import { toast } from "sonner";

export const createOpenings = async (formData, userId) => {
  if (userId) {
    setUserId(userId);
  }

  try {
    const body = {
      number: formData.number,
      company: formData.company,
    };
    const response = await API.post(`/opening/create`, body);
    toast.success("New openings have been created");
    return response.data.data;
  } catch (err) {
    console.error(err);
    toast.error("New openings have not been created");
    return;
  }
};

export const getAllOpenings = async (userId) => {

  try {
    const response = await API.get(`/opening/getAll`);
    return response;
  } catch (err) {
    console.error(err);
  }
};
