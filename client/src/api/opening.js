import API from "./index";
import { setUserId } from "./../utils/api.js";

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
  } catch (err) {
    console.error(err);
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
