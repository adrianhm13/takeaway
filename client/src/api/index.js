import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchProducts = () => API.get("/menu");

export const createUser = (newUser) => API.post("/users/sign-up", newUser);
export const loginUser = (user) => API.post("/users/login", user);
