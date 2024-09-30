import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";
import { Provider } from "react-redux";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    users: userReducer,
    blogs: blogReducer,
    notifications: notificationReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

