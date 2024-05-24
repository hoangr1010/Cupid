import API from "./../api";

export const setUserId = (userId) => {
  if (userId) {
    API.defaults.headers["userId"] = userId;
  } else {
    delete API.defaults.headers.common["userId"];
  }
};

export const setToken = (token) => {
  if (token) {
    API.defaults.headers["authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["authorization"];
  }
};
