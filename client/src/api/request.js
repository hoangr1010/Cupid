import API from ".";
import { setUserId } from "../utils/api";
import { toast } from "sonner";

export const getAllRequests = async (userId) => {
  try {
    setUserId(userId);
    const response = await API.get(`/request`);
    return response;
  } catch (err) {
    toast.error(err);
  }
};
