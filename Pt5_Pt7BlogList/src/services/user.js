import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const getUser = async (id) => {
    const resp = await axios.get(`${baseUrl}/${id}`);
    return resp.data;
};

export default { getAll, getUser };
