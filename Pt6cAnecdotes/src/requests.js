import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";
export const getAll = () => axios.get(baseUrl).then((res) => res.data);

export const createAnec = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data);
export const vote = (anecdote) =>
  axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
