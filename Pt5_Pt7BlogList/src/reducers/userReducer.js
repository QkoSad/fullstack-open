import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const userReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state, action) => {},
    setAllUsers: (state, action) => action.payload,
  },
});

export default userReducer.reducer;
export const { createUser ,setAllUsers} = userReducer.actions;
