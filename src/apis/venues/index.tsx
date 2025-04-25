import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const venueApi = createApi({
  reducerPath: "venueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllVenues: builder.query({
      query: ({page = 1, limit = 10, status}) => {
        let url = `/api/admin/venue/get-all-venues?limit=${limit}&page=${page}&sort=-1`;
        if (status) url += `&status=${status}`;
        return url;
      },
      transformResponse: (response: any) => {
        console.log('Raw API Response:', response);
        // Check if response has docs or data property
        const venues = response?.docs || response?.data || [];
        const totalPages = response?.totalPages || 0;
        console.log('Transformed Response:', { venues, totalPages });
        return {
          data: venues,
          totalPages
        };
      }
    }),
    updateVenueStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/admin/venue/update-venue/${id}`,
        method: 'PATCH',
        body: { status }
      })
    }),
    deleteVenue: builder.mutation({
      query: (id) => ({
        url: `/api/admin/venue/delete-venue/${id}`,
        method: 'DELETE'
      })
    })
  }),
});

export const { 
  useGetAllVenuesQuery,
  useUpdateVenueStatusMutation,
  useDeleteVenueMutation
} = venueApi;
