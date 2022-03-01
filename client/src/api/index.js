import axios from "axios";

const url = `http://localhost:5000`;
let endpoint;

export const fetchProducts = () => {
  endpoint = "/menu";
  return axios.get(`${url}${endpoint}`);
};

export const createUser = (newUser) => {
  endpoint = "/users/sign-up";
  return axios.post(`${url}${endpoint}`, newUser);
};

export const loginUser = (user) => {
  endpoint = "/users/login"
  return axios.post(`${url}${endpoint}`, user)
};
