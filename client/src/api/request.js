import API from ".";
import { setUserId } from "../utils/api";

export const getAllRequests = async (userId) => {
  try {
    setUserId(userId);
    const response = await API.get(`/request`);
    return response;
  } catch (err) {
    console.log(err);
  }
};
