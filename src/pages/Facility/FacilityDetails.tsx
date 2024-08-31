// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { Facility } from '../../redux/features/facilities/types';

// const FacilityDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [facility, setFacility] = useState<Facility | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [todayDate, setTodayDate] = useState<string>(new Date().toISOString().split('T')[0]);

//   useEffect(() => {
//     const fetchFacility = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5500/api/facility/${id}`);
//         const facilityData = response.data.data;
//         if (facilityData) {
//           setFacility(facilityData);
//         } else {
//           setError('Facility not found');
//         }
//       } catch (err) {
//         setError('Error fetching facility');
//         console.error('Error fetching facility:', err);
//       }
//     };

//     fetchFacility();
//   }, [id]);

//   const handleBookNowClick = () => {
//     // Logic for booking can be implemented here, if needed
//     console.log('Book Now clicked');
//   };

//   if (error) return <div>{error}</div>;
//   if (!facility) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 pt-20">
//       <div className="flex flex-col md:flex-row gap-6">
//         <img
//           src={facility.imageUrl}
//           alt={facility.name}
//           className="w-full md:w-1/2 h-64 object-cover"
//         />
//         <div className="md:w-1/2">
//           <h1 className="text-2xl font-bold">{facility.name}</h1>
//           <p className="text-gray-600">Location: {facility.location}</p>
//           <p className="text-gray-600">
//             Price per Hour: ${facility.pricePerHour}
//           </p>
//           <p className="mt-4">{facility.description}</p>

//           {/* Book Now Button */}
//           <div className="mt-8">
//             <Link
//               to={`/booking/${facility._id}`}
//               onClick={handleBookNowClick}
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Book Now
//             </Link>
//           </div>

//           {/* Render Schedule Information */}
//           <div className="mt-8">
//             <h2 className="text-xl font-semibold">Schedule</h2>
//             {facility.schedule.length > 0 ? (
//               <ul className="mt-2">
//                 {facility.schedule.map((avail, index) => (
//                   <li
//                     key={index}
//                     className="border border-gray-300 p-2 mb-2 rounded flex justify-between items-center"
//                   >
//                     <div>
//                       <p className="font-bold">{avail.day}</p>
//                       <p className="text-gray-600">From: {avail.startTime}</p>
//                       <p className="text-gray-600">To: {avail.endTime}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-600 mt-2">
//                 No schedule available.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FacilityDetails;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Facility } from '../../redux/features/facilities/types';

const FacilityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [todayDate, setTodayDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/facility/${id}`,
        );
        const facilityData = response.data.data;
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

  const handleBookNowClick = () => {
    navigate(`/book/${id}`, { state: { facility } });
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

          {/* Book Now Button */}
          <div className="mt-8">
            <button
              onClick={handleBookNowClick}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Book Now
            </button>
          </div>

          {/* Render Schedule Information */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Schedule</h2>
            {facility.schedule.length > 0 ? (
              <ul className="mt-2">
                {facility.schedule.map((avail, index) => (
                  <li
                    key={index}
                    className="border border-gray-300 p-2 mb-2 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold">{avail.day}</p>
                      <p className="text-gray-600">From: {avail.startTime}</p>
                      <p className="text-gray-600">To: {avail.endTime}</p>
                    </div>
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
