import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './apis/auth';
import { eventsApi } from './apis/events';
import { performerApi } from './apis/performer';
import { venueApi } from './apis/venues';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [performerApi.reducerPath]: performerApi.reducer,
    [venueApi.reducerPath]: venueApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, eventsApi.middleware, performerApi.middleware, venueApi.middleware),
});