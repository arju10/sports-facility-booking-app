import { configureStore } from '@reduxjs/toolkit';
import facilitiesReducer from './features/facilities/facilitiesSlice';
import { facilitiesApi } from './features/facilities/facilitiesApi';

export const store = configureStore({
  reducer: {
    facilities: facilitiesReducer,
    [facilitiesApi.reducerPath]: facilitiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(facilitiesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
