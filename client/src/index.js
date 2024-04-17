import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducer from "./state";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore({
  reducer: {
    auth: reducer.auth,
    request: reducer.request,
  },
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
