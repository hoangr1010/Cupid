import API from "./index";
import { setUserId } from "./../utils/api.js";
import { Toaster, toast } from "sonner";

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
    console.log(response.data.data);
    toast.success("New openings have been created");
  } catch (err) {
    console.error(err);
    toast.error("New openings have not been created");
  }
};

export const getAllOpenings = async (userId) => {
  if (userId) {
    setUserId(userId);
  }

  try {
    const response = await API.get(`/opening/getAll/${userId}`);
    console.log(response.data.data);
    return response;
  } catch (err) {
    console.error(err);
  }
};
