import React from 'react';
import TopNavigationBar from '../pages/Shared/TopNavigationBar';
import Footer from '../pages/Shared/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header>
        <TopNavigationBar />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto p-4">{children}</div>
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
