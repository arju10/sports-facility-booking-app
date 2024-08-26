import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TSchedule } from './types';
import { facilitiesApi } from './facilitiesApi';

export interface Facility {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  schedule: TSchedule[];
  imageUrl?: string;
  isDeleted: boolean;
}

interface FacilitiesState {
  facilities: Facility[];
}

const initialState: FacilitiesState = {
  facilities: [],
};

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    setFacilities(state, action: PayloadAction<Facility[]>) {
      state.facilities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      facilitiesApi.endpoints.getFeaturedFacilities.matchFulfilled,
      (state, action) => {
        state.facilities = action.payload.result;
      },
    );
  },
});

export const { setFacilities } = facilitiesSlice.actions;
export default facilitiesSlice.reducer;
