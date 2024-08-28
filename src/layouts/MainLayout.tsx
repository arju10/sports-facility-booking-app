import { Outlet } from 'react-router-dom';
import TopNavigationBar from '../pages/Shared/TopNavigationBar';
import ScrollToTopButton from '../pages/Shared/ScrollToTopButton';
import Copyright from '../pages/Shared/Copyright';

const MainLayout = () => {
  return (
    <div>
      <TopNavigationBar />
      <Outlet />
      <Copyright />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
