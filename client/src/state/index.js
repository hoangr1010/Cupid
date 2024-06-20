import { createSlice } from "@reduxjs/toolkit";
import { previewUser } from "./../constant/auth";

const authInitialState = {
  user: process.env.REACT_APP_VERCEL_PREVIEW ? previewUser : null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },

    updateToken(state, action) {
      state.token = action.payload;
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
    pushRequestList(state, action) {
      state.list = [...state.list, action.payload];
    },
    changeOneRequest(state, action) {
      const newRequest = action.payload;
      const updateRequestList = state.list.map((oldRequest) =>
        oldRequest.id === action.payload.id ? newRequest : oldRequest,
      );
      state.list = updateRequestList;
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

const distinctCompanyListInitialState = {
  list: [],
};

const distinctCompanyListSlice = createSlice({
  name: "distinctCompanyList",
  initialState: distinctCompanyListInitialState,
  reducers: {
    updateDistinctCompanyList(state, action) {
      state.list = action.payload;
    },
  },
});

const notificationListInitialState = {
  list: [],
};

const notificationListSlice = createSlice({
  name: "notificationList",
  initialState: notificationListInitialState,
  reducers: {
    updateNotificationList(state, action) {
      state.list = [...action.payload];
    },
  },
});

const companyStatisticInitialState = {
  map: new Object(),
};

const companyStatisticSlice = createSlice({
  name: "companyStatistic",
  initialState: companyStatisticInitialState,
  reducers: {
    updateCompanyStatistic(state, action) {
      state.map = {
        ...state.map,
        [action.payload.company]: action.payload.data,
      };
    },
  },
});

const allReducers = {
  auth: authSlice.reducer,
  request: requestSlice.reducer,
  opening: openingSlice.reducer,
  distinctCompanyList: distinctCompanyListSlice.reducer,
  companyStatistic: companyStatisticSlice.reducer,
  notificationList: notificationListSlice.reducer,
};

export const { updateUser, updateToken, clearAuth } = authSlice.actions;
export const { changeRequestList, pushRequestList, changeOneRequest } =
  requestSlice.actions;
export const { changeOpeningList, pushOpeningList } = openingSlice.actions;
export const { updateDistinctCompanyList } = distinctCompanyListSlice.actions;
export const { updateCompanyStatistic } = companyStatisticSlice.actions;
export const { updateNotificationList } = notificationListSlice.actions;

export default allReducers;
