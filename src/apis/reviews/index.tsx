import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: ({page = 1, limit = 10}) => 
        `/api/admin/review/get-all-reviews?limit=${limit}&page=${page}`,
      providesTags: ['Reviews']
    }),
    updateReviewStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/admin/review/update-review/${id}`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: ['Reviews']
    })
  }),
});

export const { 
  useGetReviewsQuery,
  useUpdateReviewStatusMutation
} = reviewsApi;
