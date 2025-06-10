import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNavigation from './MobileNavigation';

const Layout = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar should have a fixed width and full height */}
      <div className="md:w-[272px] h-screen bg-gray-800">
        <Sidebar />
      </div>

      <div className=''>
        <MobileNavigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:m-1 md:mb-0 h-screen overflow-auto md:border border-gray-200 rounded-t-3xl">
        <Header />

        <main className="flex-1 px-5 pb-24 md:pb-4 py-4 bg-[#FDFDFD]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;