import { Outlet } from 'react-router-dom';
import TopNavigationBar from '../pages/Shared/TopNavigationBar';
import ScrollToTopButton from '../pages/Shared/ScrollToTopButton';

const MainLayout = () => {
  return (
    <div>
      <TopNavigationBar />
      <Outlet />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
