import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, UserResponse, LoginRequest } from "./apiSliceTypes";

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
  }),
});

export const { useFetchProductsQuery, useLoginMutation } = apiSlice;
