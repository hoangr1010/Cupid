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
        oldRequest._id === action.payload._id ? newRequest : oldRequest,
      );
      state.list = updateRequestList;
    },
    addFilesOneRequest(state, action) {
      const newRequestList = action.payload;
      const updateRequestList = state.list.map((oldRequest) => {
        const matchingNewRequest = newRequestList.find(
          (newRequest) => newRequest._id === oldRequest._id,
        );
        return matchingNewRequest ? matchingNewRequest : oldRequest;
      });

      state.list = updateRequestList;
    },
  },
});

const openingInitialState = {
  originalAmount: null,
  company: null,
  requestList: [],
};

const openingSlice = createSlice({
  name: "opening",
  initialState: openingInitialState,
  reducers: {
    loadOpening(state, action) {
      state.company = action.payload.company;
      state.originalAmount = action.payload.original_amount;
      state.requestList = action.payload.requests;
    },
    changeOpeningList(state, action) {
      state.list = action.payload;
    },
    pushOpeningList(state, action) {
      state.requestList = [...state.list, ...action.payload];
    },
    changeAmount(state, action) {
      state.originalAmount = action.payload;
    },
    resetOpening(state) {
      state.originalAmount = null;
      state.company = null;
      state.requestList = [];
    },
    changeRequestStatusInOpening(state, action) {
      const { requestId, newStatus } = action.payload;

      if (newStatus != "waiting") {
        state.requestList = state.requestList.map((request) =>
          request._id === requestId
            ? { ...request, status: newStatus }
            : request,
        );
      } else {
        state.requestList = state.requestList.filter(
          (request) => request._id !== requestId,
        );
        state.originalAmount -= 1;
      }
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
export const {
  changeRequestList,
  pushRequestList,
  changeOneRequest,
  addFilesOneRequest,
} = requestSlice.actions;
export const {
  changeOpeningList,
  pushOpeningList,
  changeAmount,
  loadOpening,
  resetOpening,
  changeRequestStatusInOpening,
} = openingSlice.actions;
export const { updateDistinctCompanyList } = distinctCompanyListSlice.actions;
export const { updateCompanyStatistic } = companyStatisticSlice.actions;
export const { updateNotificationList } = notificationListSlice.actions;

export default allReducers;
