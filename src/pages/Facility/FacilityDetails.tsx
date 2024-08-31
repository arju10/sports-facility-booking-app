import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Facility } from '../../redux/features/facilities/types';

const FacilityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/facility/${id}`,
        );
        console.log('API Response:', response);
        // Adjust this line based on the actual response structure
        const facilityData = response.data.data; // Adjust based on the response structure
        console.log('Facility Data:', facilityData);
        if (facilityData) {
          setFacility(facilityData);
        } else {
          setError('Facility not found');
        }
      } catch (err) {
        setError('Error fetching facility');
        console.error('Error fetching facility:', err);
      }
    };

    fetchFacility();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!facility) return <div>Loading...</div>;

  const isAvailable = facility.schedule.some(
    (avail) =>
      avail.day === selectedDay &&
      startTime &&
      endTime &&
      avail.startTime <= startTime &&
      avail.endTime >= endTime,
  );

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={facility.imageUrl}
          alt={facility.name}
          className="w-full md:w-1/2 h-64 object-cover"
        />
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold">{facility.name}</h1>
          <p className="text-gray-600">Location: {facility.location}</p>
          <p className="text-gray-600">
            Price per Hour: ${facility.pricePerHour}
          </p>
          <p className="mt-4">{facility.description}</p>
          <div className="mt-4">
            <input
              type="date"
              placeholder="Select day"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="time"
              placeholder="Start time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="time"
              placeholder="End time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <Link
              to={
                isAvailable
                  ? `/book/${facility._id}?day=${selectedDay}&startTime=${startTime}&endTime=${endTime}`
                  : '#'
              }
              className={`mt-4 inline-block px-4 py-2 ${isAvailable ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
            >
              {isAvailable ? 'Book Now' : 'Not Available'}
            </Link>
          </div>
          {/* Render Schedule Information */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Schedule</h2>
            {facility.schedule.length > 0 ? (
              <ul className="mt-2">
                {facility.schedule.map((avail, index) => (
                  <li
                    key={index}
                    className="border border-gray-300 p-2 mb-2 rounded"
                  >
                    <p className="font-bold">{avail.day}</p>
                    <p className="text-gray-600">From: {avail.startTime}</p>
                    <p className="text-gray-600">To: {avail.endTime}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">No schedule available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
