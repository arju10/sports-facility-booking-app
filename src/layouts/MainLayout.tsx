import { Outlet } from 'react-router-dom';
import TopNavigationBar from '../pages/Shared/TopNavigationBar';
import ScrollToTopButton from '../pages/Shared/ScrollToTopButton';
import Copyright from '../pages/Shared/Copyright';
import Footer from '../pages/Shared/Footer';

const MainLayout = () => {
  return (
    <div>
      <TopNavigationBar />
      <Outlet />
      <Footer />
      <Copyright />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
