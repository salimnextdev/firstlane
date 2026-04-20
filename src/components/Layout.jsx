import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCookie } from '@/utils/cookieUtils';

import Sidebar from './Sidebar';
import Header from './Header';
import MobileNavigation from './MobileNavigation';
import MobileSideBar from './MobileSideBar';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  const pageName = path.split("/")[1]?.replace('-', ' ');
  
  // Redirect to signin, when user is loggedOut
  const token = getCookie('token') || null;
  if (!token) {
      return <Navigate to={`/signin?redirect_url=${path}`} />
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar should have a fixed width and full height */}
      <div className="md:w-[272px] h-screen bg-gray-800">
        <Sidebar />
      </div>

      <div className=''>
        <MobileSideBar isOpen={isOpen} onClose={setIsOpen} />
      </div>

      {pageName !== 'support' &&
        <div className=''>
          <MobileNavigation />
        </div>
      }

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:m-1 md:mb-0 h-screen overflow-auto md:border border-gray-200 rounded-t-3xl">
        <Header isOpen={isOpen} onClose={setIsOpen} />

        <main className="flex-1 px-5 pb-24 md:pb-4 py-4 bg-[var(--cave-bg)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;