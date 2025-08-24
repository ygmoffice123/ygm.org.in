import React, { useEffect, useRef, useState } from 'react';
import AddClientForm from './AddClientForm';
import ClientCard from '../../ClientCard';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../utils/axios';
import {  FaUsers  } from "react-icons/fa";

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  const { isAuthenticated, admin } = useSelector(state => state.admin);
  const isAdmin = isAuthenticated && admin?.admin?.role === 'admin';

  const sectionRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
      }
    );
  }, []);

  // Fetch all clients
  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/clients/get-all-client");
      setClients(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Delete client
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/clients/delete-client/${id}`);
      toast.success('Client deleted successfully');
      fetchClients();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete client');
    }
  };

  // Add client
  const handleAddClient = async (clientData, resetForm) => {
    try {
      await axiosInstance.post("/clients/add-client", clientData);
      toast.success('Client added successfully');
      resetForm();
      fetchClients();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add client');
    }
  };
  // Edit client
  const handleEdit = async (editData) => {

      console.log(editData);
      setEditData(editData)
      console.log(editData);
      
  
  }
  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-black text-[#FFD700] px-4 py-12 space-y-16 font-sans"
    >
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl flex justify-center items-center gap-2 md:text-5xl font-extrabold tracking-wide text-[#FFD700] mb-2">
         <FaUsers/> <span>Manage Clients</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Add, view and manage your prestigious client partnerships.
        </p>
      </div>

      {/* Add Client Form Section */}
      <div className="max-w-3xl mx-auto  bg-black/80 backdrop-blur-md rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 border-b border-[#FFD700]/30 pb-2">
           Add New Client
        </h2>
        <AddClientForm onAddClient={handleAddClient} editData={editData}/>
      </div>

      {/* Client Directory Section */}
      <div>
        <h2 className="text-3xl font-semibold text-center mb-10">
          🗂 Client Directory
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : clients.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {clients.map((client, index) => (
              <ClientCard
                key={`${client._id}-${index}`}
                item={client}
                index={index}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No clients found.</p>
        )}

      </div>
    </div>
  );
};

export default AdminClients;
