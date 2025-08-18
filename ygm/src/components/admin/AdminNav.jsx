import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTachometerAlt, FaServicestack, FaUsers, FaDumbbell, FaEnvelope, FaInfoCircle, FaUserTie } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";


const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    // { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Services", path: "/admin/services", icon: <FaServicestack /> },
    { name: "Clients", path: "/admin/clients", icon: <FaUsers /> },
    { name: "Strength", path: "/admin/strength", icon: <FaDumbbell /> },
    { name: "Contact", path: "/admin/contact", icon: <FaEnvelope /> },
    { name: "Feedback", path: "/admin/feedback", icon: <FaEnvelope /> },
    { name: "About", path: "/admin/about", icon: <FaInfoCircle /> },
    { name: "Founder", path: "/admin/founder", icon: <FaUserTie /> },
    { name: "Logout", path: "/admin/admin-logout", icon: <FiLogOut /> },
  ];

  return (
    <div className={`${isOpen ? "fixed z-20" : "flex"}`} >
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-700 rounded"
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation Links */}
        
        <ul className="mt-6 space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-yellow-500 text-black font-semibold"
                      : "hover:bg-gray-700"
                  }`
                }
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
       
      
      </div>
    </div>
  );
}

export default AdminNav