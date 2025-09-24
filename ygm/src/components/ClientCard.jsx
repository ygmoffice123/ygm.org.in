import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { GrUpdate } from "react-icons/gr";
import axiosInstance from "../utils/axios";

const ClientCard = ({ item, index, isAdmin, onDelete, onEdit, fetch }) => {
  const [editOrderOpen, setEditOrderOpen] = useState(false);
  const [order, setOrder] = useState(item.order);
  const [orderLoading, setOrderLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (!confirmDelete) return;

    try {
      await onDelete(item._id);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete client");
    }
  };

  const handleEdit = async () => {
    try {
      await onEdit(item);
    } catch (error) {
      console.error("Edit error:", error);
      toast.error("Failed to edit client");
    }
  };

  const handleChangeOrder = async () => {
    setOrderLoading(true);
    try {
      await axiosInstance.put(`/clients/edit-client-order/${item._id}`, {
        newPosition: order,
        prePosition: item.order,
      });

      fetch();
      setEditOrderOpen(false);
      setOrderLoading(false);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="w-full max-w-sm rounded-xl shadow-lg bg-[#1A1A1A] hover:shadow-2xl transition-shadow duration-300 overflow-hidden relative flex flex-col">
      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex gap-2 absolute top-2 right-2">
          <button
            onClick={handleDelete}
            className="p-1 sm:p-2 btn-error btn"
            title="Delete client"
          >
            <FaTrash />
          </button>
          <button
            onClick={handleEdit}
            className="p-1 sm:p-2 btn-primary btn"
            title="Edit client"
          >
            Edit
          </button>

          {editOrderOpen ? (
            <div className="join">
              <div>
                <label className="input validator join-item">
                  <input
                    className="w-16"
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                  />
                </label>
              </div>
              {orderLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <button
                  className="btn btn-neutral join-item"
                  onClick={handleChangeOrder}
                >
                  <GrUpdate size={18} />
                </button>
              )}
            </div>
          ) : (
            <div
              className="badge badge-neutral cursor-pointer"
              onClick={() => setEditOrderOpen((pre) => !pre)}
            >
              {item.order}
            </div>
          )}
        </div>
      )}

      {/* Logo */}
      <div
        className="bg-[#FFD700]/10 flex justify-center items-center 
                   h-[120px] sm:h-[140px] lg:h-[160px] bg-cover bg-center"
        style={{ backgroundImage: `url(${item.logo})` }}
      ></div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2 flex-grow">
        <h2 className="text-lg sm:text-xl font-semibold text-[#FFD700]">
          {item.name}
        </h2>
        <p className="text-xs sm:text-sm text-[#E0E0E0] italic">
          Service: {item.serviceType}
        </p>
        <p className="text-xs sm:text-sm text-[#E0E0E0] italic">
          {item.duration}
        </p>
        <p className="text-xs sm:text-sm text-[#C0C0C0] line-clamp-3">
          {item.description}
        </p>
      </div>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default ClientCard;
