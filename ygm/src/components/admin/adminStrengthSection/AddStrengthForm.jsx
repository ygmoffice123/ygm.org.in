import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaImage, FaHeading, FaAlignLeft, FaMedal } from 'react-icons/fa';
import axiosInstance from '../../../utils/axios';

const AddStrengthForm = ({onAddStrength}) => {
  const formRef = useRef(null);

  useGSAP(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, []);

  const [strengthData, setStrengthData] = useState({
    img: '',
    title: '',
    description: '',
    badge: '',
  });

  const handleChange = (e) => {
    setStrengthData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await onAddStrength(strengthData);  // await the async add function
    setStrengthData({ img: '', title: '', description: '', badge: '' });
    alert('✅ Strength added successfully!');
  } catch (error) {
    console.error('Error adding strength:', error);
    alert('❌ Failed to add strength');
  }
};

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-black border  border-[#FFD700] text-[#FFD700] rounded-2xl p-6 shadow-xl space-y-5 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
        <FaMedal className="text-[#FFD700]" />
        Add Strength
      </h2>

      {/* Image URL */}
      <div className="flex items-center gap-2">
        <FaImage />
        <input
          type="url"
          name="img"
          placeholder="Image URL"
          value={strengthData.img}
          onChange={handleChange}
          required
          className="w-full bg-black border border-[#FFD700] rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
        />
      </div>

      {/* Title */}
      <div className="flex items-center gap-2">
        <FaHeading />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={strengthData.title}
          onChange={handleChange}
          required
          className="w-full bg-black border border-[#FFD700] rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
        />
      </div>

      {/* Description */}
      <div className="flex items-start gap-2">
        <FaAlignLeft className="mt-2" />
        <textarea
          name="description"
          placeholder="Description"
          value={strengthData.description}
          onChange={handleChange}
          required
          className="w-full bg-black border border-[#FFD700] rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#FFD700] resize-none"
        />
      </div>

      {/* Badge */}
      <div className="flex items-center gap-2">
        <FaMedal />
        <input
          type="text"
          name="badge"
          placeholder="Badge (e.g., Certified)"
          value={strengthData.badge}
          onChange={handleChange}
          required
          className="w-full bg-black border border-[#FFD700] rounded px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#FFD700]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#FFD700] text-black font-semibold py-2 rounded hover:bg-yellow-400 transition-all duration-300"
      >
        ➕ Add Strength
      </button>
    </form>
  );
};

export default AddStrengthForm;
