import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const NotificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.pop()
    },
  },
});

export default NotificationReducer.reducer;
export const { removeNotification, createNotification } = NotificationReducer.actions;
