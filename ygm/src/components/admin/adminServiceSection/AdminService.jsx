import React, { useEffect, useRef, useState } from "react";
import AdminServiceCard from "./AdminServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, deleteService } from "../../../utils/redux/slices/serviceDataSlice.js";
import { toast, Toaster } from "react-hot-toast";
import AddServiceForm from "./addServiceForm";
import { RiResetLeftLine } from "react-icons/ri";

const AdminService = () => {
  const dispatch = useDispatch();
   const formRef = useRef(null);
  const { data: services, loading, error } = useSelector((state) => state.services);

  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;
    try {
      await dispatch(deleteService(id)).unwrap();
      toast.success("Service deleted successfully");
    } catch (err) {
      toast.error(err || "Failed to delete service");
    }
  };

  // Edit handler (for now just a placeholder)
  const handleEdit = (service) => {
    
    toast(`Edit clicked for: ${service.title}`, { icon: "✏️" });
    setEditData(service)
    setIsEdit(true)
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const handleReset = () => {

    setEditData(null)
    setIsEdit(false)
    
    // Later: Open a modal and pass service data for editing
  };

  return (
    <div className="min-h-screen bg-black text-[#FFD700] px-4 py-12 space-y-16 font-sans">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-2">
          Manage Services
        </h1>
        <p className="text-gray-400 text-sm">
          Add, view, edit, and manage your service offerings.
        </p>
      </div>

      {/* Add Service Form */}
      <div className="w-full mx-auto  bg-black/80 backdrop-blur-md rounded-xl shadow-xl md:p-8">
        <h2 className="text-2xl font-semibold mb-6 border-b border-[#FFD700]/30 pb-2 flex justify-between ">
        <span>Add New Service</span>
                    <button className="btn btn-ghost " onClick={handleReset}><RiResetLeftLine/></button>
        </h2>
        <div ref={formRef}>
        <AddServiceForm  isEdit={isEdit} editData={editData}/>

        </div>
      </div>

      {/* Services List */}
      <div>
        <h2 className="text-3xl font-semibold text-center mb-10">
          🛠 Services Directory
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : services.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service) => (
              <AdminServiceCard
                key={service._id}
                item={service}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No services found.</p>
        )}

        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default AdminService;
