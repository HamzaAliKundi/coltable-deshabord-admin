import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const performerApi = createApi({
  reducerPath: "performerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPerformers: builder.query({
      query: ({ page = 1, limit = 10, address, status }) => {
        let url = `/api/admin/performer/get-all-performers?limit=${limit}&page=${page}`;
        if (address && address !== "all")
          url += `&address=${encodeURIComponent(address)}`;
        if (status && status !== "all") url += `&status=${status}`;
        return url;
      },
    }),
    getSinglePerformer: builder.query({
      query: (id) => `/api/admin/performer/get-single-performer/${id}`,
    }),
    updatePerformerStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/admin/performer/update-performer/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    updatePerformerFeatured: builder.mutation({
      query: ({ id, isFeatured }) => ({
        url: `/api/admin/performer/update-performer/${id}`,
        method: "PATCH",
        body: { isFeatured },
      }),
    }),
    deletePerformer: builder.mutation({
      query: (id) => ({
        url: `/api/admin/performer/delete-performer/${id}`,
        method: "DELETE",
      }),
    }),

    getPerformers: builder.query({
      query: () => "/api/admin/performer/get-performers",
    }),
  }),
});

export const {
  useGetAllPerformersQuery,
  useGetSinglePerformerQuery,
  useUpdatePerformerStatusMutation,
  useUpdatePerformerFeaturedMutation,
  useDeletePerformerMutation,
  useGetPerformersQuery,
} = performerApi;
