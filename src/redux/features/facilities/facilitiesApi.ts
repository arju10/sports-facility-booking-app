import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Facility } from './facilitiesSlice';

export const facilitiesApi = createApi({
  reducerPath: 'facilitiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://sports-facility-booking-platform-backend-chi.vercel.app/api',
  }), // Update with your actual URL
  endpoints: (builder) => ({
    getFeaturedFacilities: builder.query<
      {
        result: any;
        success: boolean;
        message: string;
        data: {
          meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
          };
          result: Facility[];
        };
      },
      void
    >({
      query: () => 'facility',
    }),
  }),
});

export const { useGetFeaturedFacilitiesQuery } = facilitiesApi;
