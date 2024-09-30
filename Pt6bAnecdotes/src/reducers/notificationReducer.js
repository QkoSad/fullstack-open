import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    make(state, action, time) {
      state.push(action.payload);
    },
    remove(state, action) {
      state.pop();
    },
  },
});
const { make, remove} = notificationSlice.actions;
export const setNotification = (message,time) => {
  return (dispatch) => {
    dispatch(make(message));
    setTimeout(() => dispatch(remove()), time * 1000);
  };
};

export default notificationSlice.reducer;
