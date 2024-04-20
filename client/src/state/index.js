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

const requestInitialState = {
  list: [],
};

const requestSlice = createSlice({
  name: "request",
  initialState: requestInitialState,
  reducers: {
    changeRequestList(state, action) {
      state.list = action.payload;
    },
  },
});

export const { changeUser, clearAuth } = authSlice.actions;
export const { changeRequestList } = requestSlice.actions;

export default {
  auth: authSlice.reducer,
  request: requestSlice.reducer,
};
