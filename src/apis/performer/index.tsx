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
      query: ({page = 1, limit = 10}) => `/api/admin/performer/get-all-performers?limit=${limit}&page=${page}`
    }),
    updatePerformerStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/admin/performer/update-performer/${id}`,
        method: 'PATCH',
        body: { status }
      })
    }),
    deletePerformer: builder.mutation({
      query: (id) => ({
        url: `/api/admin/performer/delete-performer/${id}`,
        method: 'DELETE'
      })
    })
  }),
});

export const { 
  useGetAllPerformersQuery, 
  useUpdatePerformerStatusMutation,
  useDeletePerformerMutation 
} = performerApi;
