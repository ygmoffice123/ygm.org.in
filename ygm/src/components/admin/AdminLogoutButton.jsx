import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../utils/redux/slices/adminSlice";
import { FiLogOut } from "react-icons/fi";

const AdminLogoutButton  = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = () => {
    setConfirmOpen(false);
    dispatch(logoutAdmin());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Logout
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You are currently logged in as an <span className="font-semibold">Admin</span>.
          Click below to safely log out of your session.
        </p>

        {/* Logout Button */}
        <button
          onClick={() => setConfirmOpen(true)}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-600 text-white 
                     rounded-xl font-medium hover:bg-red-700 transition disabled:opacity-50 shadow-lg"
        >
          <FiLogOut className="text-lg" />
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* Confirmation Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Are you sure you want to log out?
            </p>

            <div className="mt-5 flex justify-between gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="w-full py-2 rounded-lg border border-gray-300 dark:border-gray-600
                           hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full py-2 rounded-lg bg-red-600 text-white font-medium 
                           hover:bg-red-700 transition disabled:opacity-50"
              >
                {loading ? "Logging out..." : "Yes, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogoutButton;
