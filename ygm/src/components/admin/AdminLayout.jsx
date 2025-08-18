import React from 'react';
import { Outlet } from 'react-router'; // make sure it's from 'react-router-dom'
import AdminNav from './AdminNav';
// import AdminNav from './AdminNav';



const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#000000] flex w-screen">
      <div className=''>
      <AdminNav/>
      </div>
      <main className="max-w-full min-w-[80%] h-screen overflow-y-scroll ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
