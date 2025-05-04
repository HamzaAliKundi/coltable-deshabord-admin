import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data: { email: string, userType: string }) => ({
        url: "/auth/admin/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { token: string, newPassword: string }) => ({
        url: "/auth/admin/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;