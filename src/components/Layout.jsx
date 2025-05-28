import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* Sidebar should have a fixed width and full height */}
      <div className="md:w-[272px] h-screen bg-gray-800">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col m-1 overflow-auto border border-gray-200 rounded-3xl">
        <Header />

        <main className="flex-1 px-5 py-4 bg-[#FDFDFD]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;