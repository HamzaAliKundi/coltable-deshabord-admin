import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllImages: builder.query({
      query: ({ limit = 10, page = 1, sort = -1 }) => ({
        url: `/api/admin/media/get-all-images?limit=${limit}&page=${page}&sort=${sort}`,
      }),
    }),
    updateImage: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/admin/media/update-image/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllImagesQuery, useUpdateImageMutation } = mediaApi;
