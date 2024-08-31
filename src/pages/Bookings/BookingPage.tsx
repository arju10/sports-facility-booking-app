// src/pages/BookingPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Facility } from '../../redux/features/facilities/types';
import Modal from '../../components/Modal/Modal';

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [facility, setFacility] = useState<Facility | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    day: '',
    startTime: '',
    endTime: '',
  });
  const [filteredSchedule, setFilteredSchedule] = useState<
    { day: string; startTime: string; endTime: string }[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (location.state && location.state.facility) {
      const facilityData = location.state.facility as Facility;
      setFacility(facilityData);
      setFormData((prevData) => ({
        ...prevData,
        name: facilityData.name, // Set the name from facility data
        day: facilityData.schedule[0]?.day || '',
      }));
    }
  }, [location.state]);

  useEffect(() => {
    if (facility && formData.date) {
      const selectedDayOfWeek = getDayOfWeek(formData.date);
      const availableSchedule = facility.schedule.filter(
        (sched) => sched.day === selectedDayOfWeek,
      );

      if (availableSchedule.length > 0) {
        setFilteredSchedule(availableSchedule);
      } else {
        setFilteredSchedule(null);
      }
    }
  }, [facility, formData.date]);

  const getDayOfWeek = (date: string) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = new Date(date).getDay();
    return daysOfWeek[dayIndex];
  };

  const validateTimes = () => {
    if (!filteredSchedule) return true;

    const selectedSchedule = filteredSchedule.find(
      (sched) => sched.day === formData.day,
    );

    if (selectedSchedule) {
      const startTime = new Date(`1970-01-01T${formData.startTime}:00Z`);
      const endTime = new Date(`1970-01-01T${formData.endTime}:00Z`);
      const scheduleStartTime = new Date(
        `1970-01-01T${selectedSchedule.startTime}:00Z`,
      );
      const scheduleEndTime = new Date(
        `1970-01-01T${selectedSchedule.endTime}:00Z`,
      );

      if (
        startTime < scheduleStartTime ||
        endTime > scheduleEndTime ||
        startTime >= endTime
      ) {
        setError(
          'Start time and end time must be within the scheduled hours and end time must be after start time.',
        );
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTimes()) return; // Ensure times are valid before submitting
    try {
      const response = await axios.post(
        'http://localhost:5500/api/bookings',
        formData,
      );
      // Handle success
      console.log('Booking successful:', response.data);
      setIsModalOpen(false);
      navigate('/'); // Redirect after booking
    } catch (error) {
      console.error('Error booking facility:', error);
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {facility && (
          <>
            <h2 className="text-xl font-semibold">Book Facility</h2>

            <div className="mt-4 mb-6">
              <h3 className="text-lg font-semibold">Facility Schedule</h3>
              <ul className="list-disc ml-5 mt-2">
                {facility.schedule.length > 0 ? (
                  facility.schedule.map((sched, index) => (
                    <li key={index} className="mb-1">
                      <strong>{sched.day}</strong>: {sched.startTime} -{' '}
                      {sched.endTime}
                    </li>
                  ))
                ) : (
                  <li>No schedules available</li>
                )}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Facility Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="mt-1 p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded"
                  min={todayDate} // Allow only today or future dates
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="day"
                  className="block text-sm font-medium text-gray-700"
                >
                  Schedule Day
                </label>
                <select
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded"
                  required
                >
                  {filteredSchedule && filteredSchedule.length > 0 ? (
                    filteredSchedule.map((sched, index) => (
                      <option key={index} value={sched.day}>
                        {sched.day}
                      </option>
                    ))
                  ) : (
                    <option value="">Not Available</option>
                  )}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded"
                  min={
                    filteredSchedule && filteredSchedule.length > 0
                      ? filteredSchedule[0].startTime
                      : ''
                  }
                  max={
                    filteredSchedule && filteredSchedule.length > 0
                      ? filteredSchedule[0].endTime
                      : ''
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded"
                  min={
                    filteredSchedule && filteredSchedule.length > 0
                      ? filteredSchedule[0].startTime
                      : ''
                  }
                  max={
                    filteredSchedule && filteredSchedule.length > 0
                      ? filteredSchedule[0].endTime
                      : ''
                  }
                  required
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Pay Amount {0}
              </button>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
};

export default BookingPage;
