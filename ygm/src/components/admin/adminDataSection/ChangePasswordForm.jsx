import React, { useState } from "react";
import axiosInstance from "../../../utils/axios"; 
import { FiLock } from "react-icons/fi";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    // console.log(formData);
    
    try {
      setLoading(true);
      setMessage(null);
      const res = await axiosInstance.put("/admin/edit-password-admin", {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      setMessage({ type: "success", text: res.data.message || "Password updated successfully" });
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      // console.log(error.message);
      
      setMessage({ type: "error", text: error.response?.data?.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center p-6 justify-center bg-black text-gold ">
      <div className="w-full max-w-md  p-6">
        <div className="flex items-center gap-2 mb-6 text-yellow-500">
          <FiLock className="text-2xl" />
          <h2 className="text-xl font-bold">Change Password</h2>
        </div>

        {message && (
          <p
            className={`mb-4 text-sm px-3 py-2 rounded-lg ${
              message.type === "success"
                ? "bg-green-800 text-green-200"
                : "bg-red-800 text-red-200"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-500 text-sm mb-1">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-yellow-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-yellow-500 text-sm mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-yellow-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-yellow-500 text-sm mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-yellow-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold rounded-lg shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
