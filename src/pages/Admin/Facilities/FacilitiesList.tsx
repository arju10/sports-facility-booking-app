import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Facility } from '../../../redux/features/facilities/types';
import { Link } from 'react-router-dom';

const FacilitiesList: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<Set<string>>(
    new Set(),
  );
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/facility');
        console.log('API Response:', response.data);

        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.result)
        ) {
          setFacilities(response.data.data.result);
        } else {
          setError('Unexpected data structure from API.');
        }
      } catch (err) {
        setError('Unexpected Application Error!');
        console.error('Error fetching facilities:', err);
      }
    };

    fetchFacilities();
  }, []);

  const handleCheckboxChange = (facilityId: string) => {
    setSelectedFacilities((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(facilityId)) {
        newSelected.delete(facilityId);
      } else {
        newSelected.add(facilityId);
      }
      return newSelected;
    });
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedFacilities(
        new Set(facilities.map((facility) => facility._id)),
      );
    } else {
      setSelectedFacilities(new Set());
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  // Function to dynamically assign a background color for rows
  const getRowBackgroundColor = (index: number) => {
    const colors = ['bg-gray-50', 'bg-gray-100']; // Alternating colors for rows
    return colors[index % colors.length];
  };

  // Function to dynamically assign a background color for schedules
  const getScheduleBackgroundColor = (index: number) => {
    const colors = [
      'bg-red-100',
      'bg-green-100',
      'bg-yellow-100',
      'bg-red-100',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300 table-pin-rows able-pin-cols">
        <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white ">
          <tr>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              {' '}
              {/* Margin for columns */}
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </label>
            </th>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              Serial No
            </th>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              Name
            </th>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              Description
            </th>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              Price Per Hour
            </th>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              Location
            </th>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              Day
            </th>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              Start Time
            </th>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              End Time
            </th>
            <th className="p-3 text-lg font-semibold border border-gray-300">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {facilities.length === 0 ? (
            <tr>
              <td colSpan={9} className="p-3 text-center">
                No facilities found
              </td>
            </tr>
          ) : (
            facilities.map((facility, facilityIndex) => {
              const hasSchedule =
                Array.isArray(facility.schedule) &&
                facility.schedule.length > 0;
              const isSelected = selectedFacilities.has(facility._id);
              const rowColor = getRowBackgroundColor(facilityIndex);

              return (
                <>
                  {hasSchedule ? (
                    facility.schedule.map((sched, index) => (
                      <tr
                        key={`${facility._id}-${index}`}
                        className={`${rowColor} border-b`}
                      >
                        {index === 0 && (
                          <>
                            <td
                              className="p-3 border border-gray-300"
                              rowSpan={facility.schedule.length}
                            >
                              <label>
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  checked={isSelected}
                                  onChange={() =>
                                    handleCheckboxChange(facility._id)
                                  }
                                />
                              </label>
                            </td>
                            <td
                              className="p-3 border border-gray-300"
                              rowSpan={facility.schedule.length}
                            >
                              {facilityIndex + 1}
                            </td>
                            <td
                              className="p-3 border border-gray-300"
                              rowSpan={facility.schedule.length}
                            >
                              {facility.name}
                            </td>
                            <td
                              className="p-3 border border-gray-300"
                              rowSpan={facility.schedule.length}
                            >
                              {facility.description}
                            </td>
                            <td
                              className="p-3 border border-gray-300"
                              rowSpan={facility.schedule.length}
                            >
                              {facility.pricePerHour}
                            </td>
                            <td
                              className="p-3 border border-gray-300"
                              rowSpan={facility.schedule.length}
                            >
                              {facility.location}
                            </td>
                          </>
                        )}
                        <td
                          className={`p-3 ${getScheduleBackgroundColor(index)} border border-gray-300`}
                        >
                          {sched.day}
                        </td>
                        <td
                          className={`p-3 ${getScheduleBackgroundColor(index)} border border-gray-300`}
                        >
                          {sched.startTime}
                        </td>
                        <td
                          className={`p-3 ${getScheduleBackgroundColor(index)} border border-gray-300`}
                        >
                          {sched.endTime}
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="flex gap-5">
                            <Link to={'/:id'}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-5"
                              >
                                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                                <path
                                  fillRule="evenodd"
                                  d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Link>
                            <Link to={'/:id'}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-5 "
                              >
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                              </svg>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={facility._id} className={`${rowColor} border-b`}>
                      <td className="p-3 border border-gray-300">
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={isSelected}
                            onChange={() => handleCheckboxChange(facility._id)}
                          />
                        </label>
                      </td>
                      <td className="p-3 border border-gray-300">
                        {facilityIndex + 1}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {facility.name}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {facility.description}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {facility.pricePerHour}
                      </td>
                      <td className="p-3 border border-gray-300">
                        {facility.location}
                      </td>
                      <td
                        colSpan={3}
                        className="p-3 text-center border border-gray-300"
                      >
                        No schedule available
                      </td>
                      <td className="p-3 border border-gray-300">
                        <div className="flex gap-5">
                          <Link to={'/:id'}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                              <path
                                fillRule="evenodd"
                                d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Link>
                          <Link to={'/:id'}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5 "
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })
          )}
        </tbody>
        <tfoot>{/* Pagination will go here */}</tfoot>
      </table>
    </div>
  );
};

export default FacilitiesList;
