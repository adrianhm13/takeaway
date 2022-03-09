import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Product,
  UserResponse,
  LoginRequest,
  User,
  RegisterRequest
} from "./apiSlice.types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], number | void>({
      query: () => `/menu`,
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation<UserResponse, RegisterRequest>({
      query: (registerForm) => ({
        url: "/users/sign-up",
        method: "POST",
        body: registerForm,
      }),
    }),
  }),
});

export const { useFetchProductsQuery, useLoginMutation, useRegisterUserMutation } = apiSlice;
