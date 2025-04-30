import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPerformerEvents: builder.query({
      query: () => "/performer/event/get-all-events"
    }),
    getVenueEvents: builder.query({
      query: () => "/venues/event" 
    }),
    getAdminEvents: builder.query({
      query: ({ page = 1, limit = 10, userType }) => ({
        url: "/api/admin/event/get-all-events",
        params: { page, limit, userType }
      })
    }),
    getSingleEvent: builder.query({
      query: (eventId) => `/api/admin/event/get-single-event/${eventId}`
    }),
    updateEventStatus: builder.mutation({
      query: ({ eventId, status }) => ({
        url: `/api/admin/event/update-event/${eventId}`,
        method: 'PATCH',
        body: { status }
      })
    })
  }),
});

export const { 
  useGetPerformerEventsQuery,
  useGetVenueEventsQuery, 
  useGetAdminEventsQuery,
  useGetSingleEventQuery,
  useUpdateEventStatusMutation
} = eventsApi;
