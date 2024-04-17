import API from ".";

export const getAllRequests = async () => {
  try {
    const response = await API.get(`/request`);
    return response;
  } catch (err) {
    console.log(err);
  }
};
