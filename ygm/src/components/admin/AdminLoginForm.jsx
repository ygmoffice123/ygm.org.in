import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import axiosInstance from "../../utils/axios.js";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../utils/redux/slices/adminSlice.js";

const AdminLoginForm = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setMessage("");

    try {
      const res = await axiosInstance.post(
        "/admin/login-admin",
        formData,
        { withCredentials: true }
      );
      dispatch(loginSuccess(res.data?.data?.admin));
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed.");
      dispatch(loginFailure());
    }
  };

  if (isAuthenticated) return <Navigate to="/admin/clients" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] px-4">
      <div className="w-full max-w-md bg-[#121212]/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-[#FFD700]/40">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#FFD700] drop-shadow-md mb-8">
          Admin Login
        </h2>

        {/* Error / Success Message */}
        {message && (
          <p className="text-center text-red-400 font-medium mb-4 animate-pulse">
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#FFD700] mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/70 border border-[#FFD700]/40 text-[#FFD700] placeholder:text-[#FFD700]/60 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#FFD700] mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/70 border border-[#FFD700]/40 text-[#FFD700] placeholder:text-[#FFD700]/60 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-lg shadow-md transform transition-all duration-300 ${
              loading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-600 to-yellow-400 text-black hover:from-yellow-700 hover:to-yellow-500 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          © {new Date().getFullYear()} Yash Govind Marketing Pvt. Ltd.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginForm;
