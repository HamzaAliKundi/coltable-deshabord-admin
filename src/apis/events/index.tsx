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
      query: () => "/performer/event/get-all-events",
    }),
    getVenueEvents: builder.query({
      query: () => "/venues/event",
    }),
    getAdminEvents: builder.query({
      query: ({ page = 1, limit = 10, userType, past }) => ({
        url: "/api/admin/event/get-all-events",
        params: { page, limit, userType, past },
      }),
    }),
    getSingleEvent: builder.query({
      query: (eventId) => `/api/admin/event/get-single-event/${eventId}`,
      keepUnusedDataFor: 0, 
    }),
    updateEventStatus: builder.mutation({
      query: ({ eventId, status }) => ({
        url: `/api/admin/event/update-event/${eventId}`,
        method: "PATCH",
        body: { status },
      }),
    }),

    addEvent: builder.mutation({
      query: (payload) => ({
        url: `/api/admin/event/add-event`,
        method: "POST",
        body: payload,
      }),
    }),

    updateEvent: builder.mutation({
      query: ({ id, eventData }) => ({
        url: `/api/admin/event/update-event/${id}`,
        method: "PATCH",
        body: eventData,
      }),
    }),
  }),
});

export const {
  useGetPerformerEventsQuery,
  useGetVenueEventsQuery,
  useGetAdminEventsQuery,
  useGetSingleEventQuery,
  useUpdateEventStatusMutation,
  useAddEventMutation,
  useUpdateEventMutation,
} = eventsApi;
