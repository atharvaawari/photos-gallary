import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { login, setUser } from "../authSlice";

const USER_BASE_URL = "/api/users/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(login({ userData: result.data.data.user }));
        } catch (error) {
          console.log("error fetching user data", error);
        }
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: "current-user",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser({ userData: result.data.data }));
        } catch (error) {
          console.log("error fetching user data", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
} = authApi;
