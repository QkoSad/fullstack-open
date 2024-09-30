import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const resp = await axios.get(baseUrl);
  return resp.data;
};
const create = async (data) => {
  const resp = await axios.post(baseUrl, data);
  return resp.data;
};
const increaseVote = async (element) => {
  const id = element.id;
  const newElement = { ...element, votes: element.votes + 1 };
  const resp = await axios.put(baseUrl + "/" + id, newElement);
  return resp.data
};

export { getAll, create, increaseVote };
