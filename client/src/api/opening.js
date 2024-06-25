import API from "./index";
import { setUserId } from "./../utils/api.js";
import { toast } from "sonner";

export const createOpenings = async (formData) => {
  try {
    const body = {
      amount: formData.amount,
      company: formData.company,
    };

    const response = await API.post(`/opening/create`, body);
    toast.success("New openings have been created");

    return response.data;
  } catch (err) {
    console.error(err);
    toast.error("Fail to create opening slots. Try again!");
    return;
  }
};

export const getAllOpenings = async () => {
  try {
    const response = await API.get(`/opening/getAll`);
    return response.data.data;
  } catch (err) {
    if (err.response.data.error == "Couldn't find opening") {
      return false;
    }
    console.error(err);
  }
};

export const changeStatus = async ({ requestId, newStatus }) => {
  const formData = { requestId, newStatus };
  try {
    const response = await API.put("/request/changeStatus", formData);

    return response.data.data;
  } catch (err) {
    console.error(err);
    toast.error("Fail to change status. Try again!");
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

export const requestInformation = async (requestId, messageText) => {
  try {
    const response = await API.put(`/request/sendRequestInfo`, {
      requestId,
      messageText,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    toast.error("Fail to send request information. Try again!");
  }
};
