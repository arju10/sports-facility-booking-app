import { configureStore } from '@reduxjs/toolkit';
import facilitiesReducer from './features/facilities/facilitiesSlice';

export const store = configureStore({
  reducer: {
    facilities: facilitiesReducer,
  },
});

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;
