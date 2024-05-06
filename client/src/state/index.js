import { createSlice } from "@reduxjs/toolkit";
import { previewUser } from "./../constant/auth";

const authInitialState = {
  user: process.env.REACT_APP_VERCEL_PREVIEW ? previewUser : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
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

const openingInitialState = {
  list: [],
};

const openingSlice = createSlice({
  name: "opening",
  initialState: openingInitialState,
  reducers: {
    changeOpeningList(state, action) {
      state.list = action.payload;
    },
    pushOpeningList(state, action) {
      state.list = [...state.list, ...action.payload];
    },
  },
});

const allReducers = {
  auth: authSlice.reducer,
  request: requestSlice.reducer,
  opening: openingSlice.reducer,
};

export const { updateUser, clearAuth } = authSlice.actions;
export const { changeRequestList } = requestSlice.actions;
export const { changeOpeningList, pushOpeningList } = openingSlice.actions;

export default allReducers;
