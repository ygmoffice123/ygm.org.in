import React from 'react';
import { Outlet, useNavigate } from 'react-router'; // make sure it's from 'react-router-dom'
import AdminNav from './AdminNav';
import { FaArrowUp } from 'react-icons/fa';
import { TbHomeShare } from "react-icons/tb";
// import AdminNav from './AdminNav';



const AdminLayout = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#000000] flex w-screen">
      <div className=''>
      <AdminNav/>
      </div>
      <main className="max-w-full min-w-[80%] h-screen overflow-y-scroll ">
        <Outlet />


 <div
      onClick={() => navigate("/")}
      className="
        md:w-[50px] md:h-[50px] w-[40px] h-[40px] 
        rounded-full flex justify-center items-center
        bg-white/10 backdrop-blur-xl 
        border border-white/30 shadow-lg
        z-[100] fixed bottom-10 right-10 
        cursor-pointer transition 
        hover:bg-white/20 hover:scale-110
      "
    >
      <TbHomeShare size={22} className="text-white drop-shadow" />
    </div>

      </main>
    </div>
  );
};

export default AdminLayout;
