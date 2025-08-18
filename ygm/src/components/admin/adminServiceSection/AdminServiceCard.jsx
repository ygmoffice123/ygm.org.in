import React from "react";
import { FaUsers, FaUserTie, FaEdit, FaTrash } from "react-icons/fa";

const AdminServiceCard = ({ item, onDelete, onEdit }) => {
  return (
    <div className="w-72 bg-black border border-[#FFD700]/20 rounded-xl overflow-hidden shadow-lg hover:shadow-[#FFD700]/30 transition">
      {/* Image */}
      <div className="h-44 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-xl font-bold text-[#FFD700] truncate">
          {item.title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-400 text-sm line-clamp-3">
          {item.descriptionShort}
        </p>

        {/* Counts */}
        <div className="flex items-center justify-between text-gray-300 text-sm">
          <div className="flex items-center gap-1">
            <FaUsers className="text-[#FFD700]" /> {item.clientNo || 0} Clients
          </div>
          <div className="flex items-center gap-1">
            <FaUserTie className="text-[#FFD700]" /> {item.employeeNo || 0} Employees
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => onEdit(item)}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminServiceCard;
