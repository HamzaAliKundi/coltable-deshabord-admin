import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addBanner: builder.mutation({
      query: (payload) => ({
        url: `/api/admin/banner/add-banner`,
        method: "POST",
        body: payload,
      }),
    }),

    getAllBanners: builder.query({
      query: (type) => ({
        url: `/api/admin/banner/get-all-banners?type=${type}`,
      }),
    }),

    updateBanner: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/api/admin/banner/update-banner/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const {
  useAddBannerMutation,
  useGetAllBannersQuery,
  useUpdateBannerMutation,
  useLazyGetAllBannersQuery
} = bannerApi;
