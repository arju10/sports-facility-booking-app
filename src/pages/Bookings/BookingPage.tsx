import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Facility } from '../../redux/features/facilities/types';

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/facility/${id}`,
        );
        console.log(response);
        setFacility(response.data.data);
      } catch (err) {
        setError('Error fetching facility details');
      }
    };

    fetchFacility();
  }, [id]);

  const checkAvailability = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/facility/check-availability`,
        {
          params: { date: selectedDate, facilityId: id },
        },
      );
      setAvailableSlots(response.data.availableSlots);
    } catch (err) {
      setError('Error checking availability');
    }
  };

  const handleBooking = async () => {
    // Here you'd handle booking logic, including payment integration.
    // This is a placeholder for demonstration.
    try {
      // Assume we send a booking request here.
      console.log('Booking details:', {
        date: selectedDate,
        startTime,
        endTime,
        facilityId: id,
      });
      // Navigate to confirmation or show a success message
      navigate(`/confirmation`);
    } catch (err) {
      setError('Error completing the booking');
    }
  };

  if (error) return <div>{error}</div>;
  if (!facility) return <div>Loading...</div>;

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

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Check Availability</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={checkAvailability}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Check Availability
            </button>

            {availableSlots.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Available Slots</h3>
                <ul>
                  {availableSlots.map((slot, index) => (
                    <li
                      key={index}
                      className="border border-gray-300 p-2 mb-2 rounded"
                    >
                      <p className="font-bold">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <input
                    type="time"
                    placeholder="Start Time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="time"
                    placeholder="End Time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="ml-4 p-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={handleBooking}
                    className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 mt-2">
                No slots available for the selected date.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
