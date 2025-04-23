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
      query: () => "/admin/events"
    })
  }),
});

export const { 
  useGetPerformerEventsQuery,
  useGetVenueEventsQuery, 
  useGetAdminEventsQuery
} = eventsApi;
