import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import AboutUs from '../pages/AboutUs/AboutUs';
import ContactUs from '../pages/ContactUs/ContactUs';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import SignUp from '../pages/screens/SignUp/SignUp';
import Login from '../pages/screens/Login/Login';
import FacilitiesList from '../pages/Admin/Facilities/FacilitiesList';

import CreateFacility from '../pages/Admin/Facilities/CreateFacility';
import DeleteFacility from '../pages/Admin/Facilities/DeleteFacility';
import UpdateFacility from '../pages/Admin/Facilities/UpdateFacility';
import FacilityListing from '../pages/Facility/FacilityListing';
import FacilityDetails from '../pages/Facility/FacilityDetails';
import BookingPage from '../pages/Bookings/BookingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/facilities',
        element: <FacilityListing />,
      },
      {
        path: '/facility/details/:id',
        element: <FacilityDetails />,
      },
      {
        path: '/bookingPage',
        element: <BookingPage />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'user-profile',
        element: <Login />,
      },
    ],
  },
  // Admin Routes
  {
    path: '/',
    element: <AdminDashboardLayout />,
    children: [
      // {
      //   index: true,
      //   element: <Home />,
      // },
      {
        path: '/admindashboard',
        element: <Dashboard />,
      },
      // Facility Management
      {
        path: '/admin/facilities',
        element: <FacilitiesList />,
      },
      {
        path: '/facilities/create/:id',
        element: <CreateFacility />,
      },
      {
        path: '/facilities/edit/:id',
        element: <UpdateFacility />,
      },
      {
        path: '/facilities/delete/:id',
        element: <DeleteFacility />,
      },
    ],
  },
]);
