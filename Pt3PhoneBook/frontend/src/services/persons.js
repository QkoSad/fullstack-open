import axios from "axios";
const baseUrl = "/api/persons/";


const getAll = () => axios.get(baseUrl);
const create = (newPerson) => axios.post(baseUrl, newPerson);
const remove = (id) => axios.delete(baseUrl.concat(id.toString()));
const update = (id, newPerson) => axios.put(`${baseUrl}${id}`, newPerson);

export default {
  getAll: getAll,
  create: create,
  remove: remove,
  update: update,
};
