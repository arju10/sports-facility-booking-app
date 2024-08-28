import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Facility } from './types'; // Adjust the import path
import { facilitiesApi } from './facilitiesApi';

interface FacilitiesState {
  facilities: Facility[];
  loading: boolean;
  error: string | null;
}

const initialState: FacilitiesState = {
  facilities: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchAllFacilities = createAsyncThunk(
  'facilities/fetchAll',
  async () => {
    const response = await facilitiesApi.getAllFacilities();
    return response.data;
  },
);

export const fetchFacilityById = createAsyncThunk(
  'facilities/fetchById',
  async (id: string) => {
    const response = await facilitiesApi.getFacilityById(id);
    return response.data;
  },
);

export const createFacility = createAsyncThunk(
  'facilities/create',
  async (formData: FormData) => {
    const response = await facilitiesApi.createFacility(formData);
    return response.data;
  },
);

export const updateFacility = createAsyncThunk(
  'facilities/update',
  async ({
    id,
    facilityData,
  }: {
    id: string;
    facilityData: Partial<Facility>;
  }) => {
    const response = await facilitiesApi.updateFacility(id, facilityData);
    return response.data;
  },
);

export const deleteFacility = createAsyncThunk(
  'facilities/delete',
  async (id: string) => {
    await facilitiesApi.deleteFacility(id);
    return id;
  },
);

// Slice
const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllFacilities.fulfilled,
        (state, action: PayloadAction<Facility[]>) => {
          state.facilities = action.payload;
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(fetchAllFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch facilities';
      });

    builder
      .addCase(fetchFacilityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFacilityById.fulfilled,
        (state, action: PayloadAction<Facility>) => {
          const index = state.facilities.findIndex(
            (facility) => facility._id === action.payload._id,
          );
          if (index !== -1) {
            state.facilities[index] = action.payload;
          }
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(fetchFacilityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch facility';
      });

    builder
      .addCase(createFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createFacility.fulfilled,
        (state, action: PayloadAction<Facility>) => {
          state.facilities.push(action.payload);
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(createFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create facility';
      });

    builder
      .addCase(updateFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateFacility.fulfilled,
        (state, action: PayloadAction<Facility>) => {
          const index = state.facilities.findIndex(
            (facility) => facility._id === action.payload._id,
          );
          if (index !== -1) {
            state.facilities[index] = action.payload;
          }
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(updateFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update facility';
      });

    builder
      .addCase(deleteFacility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteFacility.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.facilities = state.facilities.filter(
            (facility) => facility._id !== action.payload,
          );
          state.loading = false;
          state.error = null;
        },
      )
      .addCase(deleteFacility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete facility';
      });
  },
});

export default facilitiesSlice.reducer;
