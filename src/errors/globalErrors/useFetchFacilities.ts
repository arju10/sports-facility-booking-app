// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Facility } from '../../redux/features/facilities/types';

// const useFetchFacilities = () => {
//   const [facilities, setFacilities] = useState<Facility[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchFacilities = async () => {
//       try {
//         const response = await axios.get('/api/facilities');
//         if (response.data && response.data.data && Array.isArray(response.data.data.result)) {
//           setFacilities(response.data.data.result);
//         } else {
//           setError('Unexpected data structure from API.');
//         }
//       } catch (err) {
//         setError('Unexpected Application Error!');
//         console.error(err);
//       }
//     };

//     fetchFacilities();
//   }, []);

//   return { facilities, error };
// };

// export default useFetchFacilities;
