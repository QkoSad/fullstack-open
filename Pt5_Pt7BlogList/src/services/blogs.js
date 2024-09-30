import axios from "axios";

const baseUrl = "/api/blogs";
let token = null;
const getBlog = async(id)=>{
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const changeBlog = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(baseUrl + "/" + id, newObject, config);
  return res.data;
};

const getAll = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.delete(baseUrl + "/" + id, config);
  return res.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { deleteBlog, changeBlog, getAll,getBlog, setToken, create };
