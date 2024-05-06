import API from "./index.js";
import { toast } from "sonner";

export const getCompany = async (string) => {
  try {
    const response = await API.get(`company?value=${string}`);
    return response.data.items;
  } catch (err) {
    console.error(err);
    toast.error("Error getting company");
  }
};
