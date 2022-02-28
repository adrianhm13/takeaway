import axios from "axios";

const url = `http://localhost:5000`;

export const fetchProducts = () => {
  let endpoint = "/menu";
  return axios.get(`${url}${endpoint}`);
};

export const createUser = (newUser) => {
  let endpoint = "/users/sign-up";
  return axios.post(`${url}${endpoint}`, newUser);
};
