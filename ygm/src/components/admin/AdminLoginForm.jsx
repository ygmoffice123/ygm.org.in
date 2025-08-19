import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router";
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch(loginStart());
  //   setMessage("");

  //   try {
  //     const res = await axiosInstance.post(
  //       "/admin/login-admin",
  //       formData,
  //       { withCredentials: true }
  //     );
  //     dispatch(loginSuccess(res.data?.data?.admin));
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || "Login failed.");
  //     dispatch(loginFailure());
  //   }
  // };

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

    // ✅ token ko localStorage me save karo (agar backend bhejta hai to)
    if (res.data?.data?.token) {
      localStorage.setItem("accessToken", res.data.data.token);
    }

    // ✅ admin data redux me set karo
    dispatch(loginSuccess(res.data?.data?.admin));
  } catch (error) {
    const errMsg = error.response?.data?.message || "Login failed.";
    setMessage(errMsg);
    dispatch(loginFailure());
  }
};

  if (isAuthenticated) return <Navigate to="/admin/clients" />;

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] px-4">
  <div className="w-full max-w-md bg-[#121212]/80 backdrop-blur-xl p-10 rounded-2xl shadow-[0_8px_30px_rgba(255,215,0,0.15)] border border-[#FFD700]/30">
    {/* Title */}
    <h2 className="text-4xl font-extrabold text-center text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] mb-8 tracking-wide">
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
          className="w-full px-4 py-3 rounded-lg bg-black/70 border border-[#FFD700]/40 text-[#FFD700] placeholder:text-[#FFD700]/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] focus:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300"
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
          className="w-full px-4 py-3 rounded-lg bg-black/70 border border-[#FFD700]/40 text-[#FFD700] placeholder:text-[#FFD700]/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] focus:shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-300"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-lg shadow-lg transform transition-all duration-300 ${
          loading
            ? "bg-gray-700 text-gray-300 cursor-not-allowed"
            : "bg-gradient-to-r from-yellow-500 to-yellow-300 text-black hover:from-yellow-600 hover:to-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.6)] hover:scale-[1.03]"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>

    {/* Website Link */}
    <p className="text-center text-sm mt-6 text-gray-300">
      Go to{" "}
      <b>
        <Link
          to="/"
          className="text-[#FFD700] hover:underline hover:text-yellow-400 transition-colors"
        >
          ygm.org.in
        </Link>
      </b>
    </p>

    {/* Footer */}
    <p className="text-center text-xs text-gray-500 mt-8">
      © {new Date().getFullYear()} Yash Govind Marketing Pvt. Ltd.
    </p>
  </div>
</div>

  );
};

export default AdminLoginForm;
