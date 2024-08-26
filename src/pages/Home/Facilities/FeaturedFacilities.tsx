import React from 'react';
import { useGetFeaturedFacilitiesQuery } from '../../../redux/features/facilities/facilitiesApi';

const FeaturedFacilities: React.FC = () => {
  const { data, error, isLoading } = useGetFeaturedFacilitiesQuery();

  // Log data to inspect its structure
  console.log('Fetched data:', data);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        Failed to load facilities. Please try again later.
      </div>
    );
  }

  // Check if data is in the expected format
  if (!data || !data.data || !Array.isArray(data.data.result)) {
    return (
      <div className="text-center py-12 text-red-600">
        Unexpected data format. Please try again later.
      </div>
    );
  }

  // Extract facilities from data.data.result
  const facilities = data.data.result;

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 sm:text-4xl lg:text-5xl">
          Featured Facilities
        </h2>
        <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover some of the top facilities available for booking. Whether
          you’re looking for a place to play soccer, basketball, tennis, or
          more, we have you covered.
        </p>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={facility.imageUrl || '/default-image.jpg'} // Fallback image if none is provided
                alt={facility.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{facility.name}</h3>
                <p className="text-gray-700 mb-4">{facility.description}</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedFacilities;
