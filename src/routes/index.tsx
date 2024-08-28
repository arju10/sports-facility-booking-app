import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import AboutUs from '../pages/AboutUs/AboutUs';
import ContactUs from '../pages/ContactUs/ContactUs';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import SignUp from '../pages/screens/SignUp/SignUp';
import Login from '../pages/screens/Login/Login';
import FacilitiesSlice from '../redux/features/facilities/facilitiesSlice';
import FacilitiesList from '../pages/Admin/Facilities/FacilitiesList';

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
      {
        path: '/facility',
        element: <FacilitiesList />,
      },
    ],
  },
]);
