// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { Facility } from '../../redux/features/facilities/types';

// const FacilityListing: React.FC = () => {
//   const [facilities, setFacilities] = useState<Facility[]>([]);
//   const [search, setSearch] = useState('');
//   const [filterPrice, setFilterPrice] = useState<number | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
//   const [noDataMessage, setNoDataMessage] = useState<string>('');

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         const response = await axios.get('http://localhost:5500/api/facility');
//         const allFacilities = response.data.data.result as Facility[];
//         const availableFacilities = allFacilities.filter(facility => !facility.isDeleted);
//         setFacilities(availableFacilities);
//         setFilteredFacilities(availableFacilities);
//       } catch (err) {
//         console.error('Error fetching facilities:', err);
//       }
//     };
//     fetchFacilities();
//   }, []);

//   useEffect(() => {
//     const filterFacilities = () => {
//       let filtered = facilities;

//       // Search by name or location
//       if (search) {
//         filtered = filtered.filter(facility =>
//           facility.name.toLowerCase().includes(search.toLowerCase())
//         );
//       }

//       // Filter by price
//       if (filterPrice !== null) {
//         filtered = filtered.filter(facility => facility.pricePerHour <= filterPrice);
//       }

//       // Convert selected date to a day of the week (e.g., "Sunday")
//       const getDayOfWeek = (date: string) => {
//         const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
//         const dayIndex = new Date(date).getDay();
//         return daysOfWeek[dayIndex];
//       };

//       const selectedDayOfWeek = selectedDate ? getDayOfWeek(selectedDate) : '';

//       // Filter by selected day
//       if (selectedDayOfWeek) {
//         filtered = filtered.filter(facility =>
//           facility.schedule.some(avail => avail.day === selectedDayOfWeek)
//         );

//         // If no facilities available for selected day, show a message
//         if (filtered.length === 0) {
//           setNoDataMessage('No facilities available for the selected date.');
//         } else {
//           setNoDataMessage('');
//         }
//       } else {
//         setNoDataMessage(''); // Reset message if no date is selected
//       }

//       setFilteredFacilities(filtered);
//     };

//     filterFacilities();
//   }, [search, filterPrice, selectedDate, facilities]);

//   return (
//     <div className="container mx-auto px-4 pt-20">
//       <div className="flex flex-col gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or location"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="number"
//           placeholder="Filter by price"
//           value={filterPrice || ''}
//           onChange={e => setFilterPrice(e.target.value ? Number(e.target.value) : null)}
//           className="p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="date"
//           placeholder="Select date"
//           value={selectedDate}
//           onChange={e => setSelectedDate(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         />
//       </div>

//       {/* No Data Message */}
//       {noDataMessage && (
//         <div className="text-red-500 text-center mb-4">
//           {noDataMessage}
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredFacilities.map(facility => (
//           <div key={facility._id} className="border rounded-lg overflow-hidden shadow-lg">
//             <img src={facility.imageUrl} alt={facility.name} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h3 className="text-xl font-bold">{facility.name}</h3>
//               <p className="text-gray-600">Price per Hour: ${facility.pricePerHour}</p>
//               <Link to={`/facility/details/${facility._id}`} className="text-blue-500 hover:underline">
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FacilityListing;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Facility } from '../../redux/features/facilities/types';

const FacilityListing: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [search, setSearch] = useState('');
  const [filterPrice, setFilterPrice] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
  const [noDataMessage, setNoDataMessage] = useState<string>('');

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/facility');
        const allFacilities = response.data.data.result as Facility[];
        const availableFacilities = allFacilities.filter(
          (facility) => !facility.isDeleted,
        );
        setFacilities(availableFacilities);
        setFilteredFacilities(availableFacilities);
      } catch (err) {
        console.error('Error fetching facilities:', err);
      }
    };
    fetchFacilities();
  }, []);

  useEffect(() => {
    const filterFacilities = () => {
      let filtered = [...facilities]; // Create a copy of the facilities array

      // Search by name or location
      if (search) {
        filtered = filtered.filter(
          (facility) =>
            facility.name.toLowerCase().includes(search.toLowerCase()) ||
            facility.location.toLowerCase().includes(search.toLowerCase()), // Check location
        );
      }

      // Filter by exact price or price range
      if (filterPrice !== null) {
        filtered = filtered.filter(
          (facility) => facility.pricePerHour === filterPrice,
        );
      }

      // Convert selected date to a day of the week (e.g., "Sunday")
      const getDayOfWeek = (date: string) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
      };

      const selectedDayOfWeek = selectedDate ? getDayOfWeek(selectedDate) : '';

      // Filter by selected day
      if (selectedDayOfWeek) {
        filtered = filtered.filter((facility) =>
          facility.schedule.some((avail) => avail.day === selectedDayOfWeek),
        );
      }

      // Update the no data message
      if (filtered.length === 0) {
        setNoDataMessage('No facilities match your criteria.');
      } else {
        setNoDataMessage('');
      }

      setFilteredFacilities(filtered);
    };

    filterFacilities();
  }, [search, filterPrice, selectedDate, facilities]);

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Filter by price"
          value={filterPrice !== null ? filterPrice : ''}
          onChange={(e) =>
            setFilterPrice(e.target.value ? Number(e.target.value) : null)
          }
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          placeholder="Select date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* No Data Message */}
      {noDataMessage && (
        <div className="text-red-500 text-center mb-4">{noDataMessage}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map((facility) => (
          <div
            key={facility._id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={facility.imageUrl}
              alt={facility.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{facility.name}</h3>
              <p className="text-gray-600">
                Price per Hour: ${facility.pricePerHour}
              </p>
              <Link
                to={`/facility/details/${facility._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityListing;
