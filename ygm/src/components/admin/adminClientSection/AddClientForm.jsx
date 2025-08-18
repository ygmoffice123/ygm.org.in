import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../utils/axios';
import {toast} from 'react-hot-toast';

const AddClientForm = ({ onAddClient , editData }) => {
  const { data: serviceData } = useSelector((state) => state.services);

const [clientData, setClientData] = useState({
  name: '',
  description: '',
  logo: '',
  website: '',
  duration: '',
  serviceID: '',
  serviceType: '', 
});

useEffect(() => {
  if (editData) {
    setClientData(editData);
  }
}, [editData]);

  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'serviceID') {
      // 🆕 Auto-update serviceType when serviceID changes
      const selectedService = serviceData?.find((s) => s._id === value);
      setClientData((prev) => ({
        ...prev,
        serviceID: value,
        serviceType: selectedService ? selectedService.title : '',
      }));
    } else {
      setClientData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientData.serviceID) {
      alert('Please select a related service');
      return;
    }
    console.log(clientData);
    

    try {
      if(editData){
        await axiosInstance.put(`/clients/edit-client/${editData._id}`,clientData)

      }else{
        await onAddClient(clientData, () =>
          setClientData({
            name: '',
            description: '',
            logo: '',
            website: '',
            duration: '',
            serviceID: '',
            serviceType: '', // reset too
          })
        );
    }
      toast.success('Client added successfully!');
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Failed to add client');
    }
  };


  
  const handleReset = () => {
       setClientData({
          name: '',
          description: '',
          logo: '',
          website: '',
          duration: '',
          serviceID: '',
          serviceType: '', // reset too
        })
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="text-white shadow-lg  max-w-2xl mx-auto space-y-6"
    >

      {/* Name */}
      <div className="space-y-1">
        <label className="text-yellow-300 font-medium">Client Name</label>
        <input
          type="text"
          name="name"
          value={clientData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-yellow-300 font-medium">Description</label>
        <textarea
          name="description"
          value={clientData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Logo */}
      <div className="space-y-1">
        <label className="text-yellow-300 font-medium">Logo URL</label>
        <input
          type="url"
          name="logo"
          value={clientData.logo}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Website */}
      <div className="space-y-1">
        <label className="text-yellow-300 font-medium">Website (optional)</label>
        <input
          type="url"
          name="website"
          value={clientData.website}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Duration */}
      <div className="space-y-1">
        <label className="text-yellow-300 font-medium">Duration</label>
        <input
          type="text"
          name="duration"
          value={clientData.duration}
          onChange={handleChange}
          placeholder="e.g. 2004 – 2017"
          required
          className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Service */}
      <div className="space-y-1">
        <label className="text-yellow-300 font-medium">Related Service</label>
        <select
          name="serviceID"
          value={clientData.serviceID}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-black border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="">-- Select a service --</option>
          {serviceData?.map((service) => (
            <option key={service._id} value={service._id}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      {/* Hidden Service Type */}
      <input type="hidden" name="serviceType" value={clientData.serviceType} />

     <div className="flex gap-3">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddClientForm;
