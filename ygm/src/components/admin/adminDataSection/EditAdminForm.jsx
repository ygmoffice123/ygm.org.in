import React, { useState, useRef } from 'react';
import axiosInstance from '../../../utils/axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaUserEdit, FaEnvelope, FaUserTag, FaSave } from 'react-icons/fa';

const EditAdminForm = ({ adminData, adminId }) => {
  const [formData, setFormData] = useState({
    fullName: adminData?.fullName || '',
    username: adminData?.username || '',
    email: adminData?.email || '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      await axiosInstance.put('/admin/edit-admin', formData);
      setMessage('✅ Admin information updated successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || '❌ Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="max-w-xl mx-auto  px-8 py-10  "
    >
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center flex items-center justify-center gap-3">
        <FaUserEdit className="text-yellow-500" /> Edit Admin
      </h2>

      {message && (
        <p className="text-center mb-4 text-sm text-yellow-300 font-medium">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-yellow-400 mb-1"
          >
            Full Name
          </label>
          <div className="relative">
            <FaUserTag className="absolute top-3 left-3 text-yellow-500" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="pl-10 w-full bg-zinc-900 text-yellow-300 border border-yellow-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-yellow-400 mb-1"
          >
            Username
          </label>
          <div className="relative">
            <FaUserTag className="absolute top-3 left-3 text-yellow-500" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="pl-10 w-full bg-zinc-900 text-yellow-300 border border-yellow-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-yellow-400 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-yellow-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-10 w-full bg-zinc-900 text-yellow-300 border border-yellow-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold text-black transition-all 
          ${
            loading
              ? 'bg-yellow-300 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          <FaSave />
          {loading ? 'Updating...' : 'Update Admin'}
        </button>
      </form>
    </div>
  );
};

export default EditAdminForm;
