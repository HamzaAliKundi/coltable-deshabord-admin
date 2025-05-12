import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth";
import { eventsApi } from "./apis/events";
import { performerApi } from "./apis/performer";
import { venueApi } from "./apis/venues";
import { reviewsApi } from "./apis/reviews";
import { bannerApi } from "./apis/banner";
import { adsApi } from "./apis/ads";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [performerApi.reducerPath]: performerApi.reducer,
    [venueApi.reducerPath]: venueApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [adsApi.reducerPath]: adsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      eventsApi.middleware,
      performerApi.middleware,
      venueApi.middleware,
      reviewsApi.middleware,
      bannerApi.middleware,
      adsApi.middleware
    ),
});
