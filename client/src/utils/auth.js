import { clearAuth } from "./../state";

export const logout = (dispatch) => {
  dispatch(clearAuth());
  localStorage.removeItem("persist:root");
  window.location.href = "/";
};
