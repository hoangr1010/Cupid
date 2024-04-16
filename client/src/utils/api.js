import API from "./../api";

export const setUserId = (userId) => {
  if (userId) {
    API.defaults.headers["userId"] = userId;
  } else {
    delete API.defaults.headers.common["userId"];
  }
};
