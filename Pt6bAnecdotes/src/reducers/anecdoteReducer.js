import { createSlice } from "@reduxjs/toolkit";
import { getAll, create, increaseVote } from "../service/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    increment(state, action) {
      let anecdote = state.find((el) => el.id === action.payload);
      anecdote.votes += 1;
      state.map((el) => (el.id !== action.payload ? el : anecdote));
    },
    newAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const { increment, newAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const createAnecdote = (an) => {
  return async (dispatch) => {
    const anecdote = await create(an);
    dispatch(newAnecdote(anecdote));
  };
};
export const vote = (anecdote) => {
  return async (dispatch) => {
   const an= await increaseVote(anecdote);
    dispatch(increment(an.id));
  };
};

export default anecdoteSlice.reducer;
