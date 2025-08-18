import React from 'react';
import { Outlet } from 'react-router'; // make sure it's from 'react-router-dom'
import AdminNavbar from './AdminNavBar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#000000] flex w-screen">
      <div className=''>
      <AdminNavbar/>
      </div>
      <main className="w-full h-screen overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
