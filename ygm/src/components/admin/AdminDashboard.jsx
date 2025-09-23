// import React from "react";
// import { FaServicestack, FaUsers, FaInfoCircle, FaEnvelope } from "react-icons/fa";
// import { Navigate } from "react-router";

// const AdminDashboard = () => {

//   return <Navigate to="/admin/clients"/>
// };

// export default AdminDashboard;


import React from "react";
import { useSelector } from "react-redux";
import {
  FaUserShield,
  FaEnvelope,
  FaIdBadge,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  // Redux se admin ki details
  const admin = useSelector((state) => state.admin.admin.admin);
  // console.log(admin);
  

  if (!admin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400">
        Loading admin data...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-lg bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-2xl border border-yellow-600 p-6 text-yellow-400">
        {/* Welcome Header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Welcome, <span className="text-yellow-300">{admin.fullName}</span> 👋
        </h2>

        {/* Details Section */}
        <div className="space-y-4">
          <p className="flex items-center gap-3 text-lg">
            <FaIdBadge className="text-yellow-500" /> 
            <span>
              <b>Username:</b> {admin.username}
            </span>
          </p>
          <p className="flex items-center gap-3 text-lg">
            <FaEnvelope className="text-yellow-500" /> 
            <span>
              <b>Email:</b> {admin.email}
            </span>
          </p>
          <p className="flex items-center gap-3 text-lg">
            <FaUserShield className="text-yellow-500" /> 
            <span>
              <b>Role:</b> {admin.role}
            </span>
          </p>
          <p className="flex items-center gap-3 text-lg">
            <FaCalendarAlt className="text-yellow-500" /> 
            <span>
              <b>Joined:</b>{" "}
              {new Date(admin.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        {/* Bottom Line / Accent */}
        <div className="mt-6 border-t border-yellow-600 pt-4 text-center text-sm text-yellow-300">
          Last Updated: {new Date(admin.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
