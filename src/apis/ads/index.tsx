import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addAdvertisement: builder.mutation({
      query: (payload) => ({
        url: `/api/admin/advertisement/add-advertisement`,
        method: "POST",
        body: payload,
      }),
    }),

    getAllAds: builder.query({
      query: (type) => ({
        url: `/api/admin/advertisement/get-all-advertisements?type=${type}`,
      }),
    }),

    updateAds: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/admin/advertisement/update-advertisement/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const {
  useAddAdvertisementMutation,
  useGetAllAdsQuery,
  useUpdateAdsMutation,
} = adsApi;
