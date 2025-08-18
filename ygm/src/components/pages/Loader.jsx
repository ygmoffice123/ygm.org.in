// components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col justify-center gap-10 items-center">
      <img src="/logo.png" alt="" className="w-50"/>
        <span className="loading loading-dots w-[60px] text-[#FFD700]"></span>
    </div>
  );
};

export default Loader;
