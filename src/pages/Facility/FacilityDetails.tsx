import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Facility } from '../../redux/features/facilities/types';

const FacilityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [todayDate, setTodayDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/facility/${id}`,
        );
        const facilityData = response.data.data; // Adjust based on the response structure
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

  const getDayOfWeek = (date: string) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = new Date(date).getDay();
    return daysOfWeek[dayIndex];
  };

  const selectedDayOfWeek = selectedDate ? getDayOfWeek(selectedDate) : '';

  const filteredSchedules = selectedDayOfWeek
    ? facility?.schedule.filter((avail) => avail.day === selectedDayOfWeek)
    : facility?.schedule;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    if (selected < todayDate) {
      setSelectedDate('');
      setError('Please select today or a future date.');
    } else {
      setSelectedDate(selected);
      setError(null);
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
          <div className="mt-4">
            <input
              type="date"
              placeholder="Select date"
              value={selectedDate}
              onChange={handleDateChange}
              className="p-2 border border-gray-300 rounded"
              min={todayDate} // Disable past dates
            />
          </div>

          {/* Render Schedule Information */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Schedule</h2>
            {error ? (
              <p className="text-red-600">{error}</p>
            ) : filteredSchedules && filteredSchedules.length > 0 ? (
              <ul className="mt-2">
                {filteredSchedules.map((avail, index) => (
                  <li
                    key={index}
                    className="border border-gray-300 p-2 mb-2 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{avail.day}</p>
                      <p className="text-gray-600">From: {avail.startTime}</p>
                      <p className="text-gray-600">To: {avail.endTime}</p>
                    </div>
                    <Link
                      to={`/book/${facility._id}?day=${avail.day}`}
                      className={`px-4 py-2 ${selectedDayOfWeek === avail.day ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
                    >
                      {selectedDayOfWeek === avail.day
                        ? 'Book Now'
                        : 'Unavailable'}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mt-2">
                No schedule available for the selected date.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
