import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    changeUser(state, action) {
      state.user = action.payload;
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

export const { changeUser } = authSlice.actions;

export const { changeRequestList } = requestSlice.actions;

export default {
  auth: authSlice.reducer,
  request: requestSlice.reducer,
};
