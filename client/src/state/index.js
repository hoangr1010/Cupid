import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    changeUser(state, action) {
      console.log(action.payload);
      state.user = {
        pictureUrl: action.payload.pictureUrl,
        ...action.payload.userProfile,
      };
    },

    clearAuth(state, action) {
      state = authInitialState;
    },
  },
});

export const { changeUser, clearAuth } = authSlice.actions;
export default {
  auth: authSlice.reducer,
};
