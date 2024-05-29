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
    console.log(response)
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const changeStatus = async (formData) => {
  try {
    const body = {
      openingId: formData.openingId,
      newStatus: formData.newStatus,
    };

    const response = await API.put(`/opening/changeStatus`, body);
    toast.success("Opening has been updated");
    return response.data.data;
  } catch (err) {
    console.error(err);
    toast.error("Opening has not been updated");
    return;
  }
};

export const processPasscode = async (gmail) => {
  try {
    await API.post(`/opening/passcode`, { gmail });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const verifyPasscode = async (gmail, passcode) => {
  try {
    const response = await API.get(
      `/opening/verifyPasscode?gmail=${gmail}&passcode=${passcode}`,
    );
    return response;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const getAllExistingOpenings = async () => {
  try {
    const response = await API.get(`/opening/getAllExistingOpenings`);
    return response.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const getRemainingOpeningsByCompany = async (companyName) => {
  try {
    const response = await API.get(
      `/opening/getRemainingOpenings/${companyName}`,
    );
    return response.data.data;
  } catch (err) {
    toast.error(err);
  }
};
