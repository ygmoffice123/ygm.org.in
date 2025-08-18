// AdminAbout.jsx
import React from "react";
import EditAdminForm from "./EditAdminForm";
import { useSelector } from "react-redux";
import ChangePasswordForm from "./ChangePasswordForm";

const AdminAbout = () => {
  const { admin } = useSelector((state) => state.admin);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-12 text-yellow-500">
        Admin Profile Settings
      </h1>

      {/* Layout wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Edit Admin Info */}
        <div className=" rounded-2xl shadow-lg p-6 border border-yellow-700">
          <EditAdminForm adminData={admin} adminId={admin?._id} />
        </div>

        {/* Change Password */}
        <div className=" rounded-2xl shadow-lg p-6 border border-yellow-700">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
