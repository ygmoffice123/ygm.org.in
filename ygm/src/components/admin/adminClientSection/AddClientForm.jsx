import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector ,useDispatch} from 'react-redux';
import axiosInstance from '../../../utils/axios';
import { toast } from 'react-hot-toast';
import { updateClient } from '../../../utils/redux/slices/clientDataSlice';

const AddClientForm = ({ onAddClient, editData }) => {
  const { data: serviceData } = useSelector((state) => state.services);

  const [clientData, setClientData] = useState({
    name: '',
    description: '',
    logo: '',
    duration: '',
    services: [],
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setClientData({
        name: editData.name || '',
        description: editData.description || '',
        logo: editData.logo || '',
        duration: editData.duration || '',
        services: editData.services?.map((s) => s._id || s) || [],
      });
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
    const { name, value, selectedOptions } = e.target;

    if (name === 'services') {
      const selectedValues = Array.from(selectedOptions, (opt) => opt.value);
      setClientData((prev) => ({ ...prev, services: selectedValues }));
    } else {
      setClientData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientData.services || clientData.services.length === 0) {
      toast.error('Please select at least one related service.');
      return;
    }

    setLoading(true);

    try {
      if (editData) {
      await dispatch(updateClient({ id: editData._id, clientData })).unwrap();
      toast.success('Client updated successfully!');
      handleReset();
      } else {
        await onAddClient(clientData, () =>
          setClientData({
            name: '',
            description: '',
            logo: '',
            duration: '',
            services: [],
          })
        );
        toast.success('Client added successfully!');
      }
    } catch (error) {
      console.error('Error saving client:', error);
      toast.error('Failed to save client');
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setClientData({
      name: '',
      description: '',
      logo: '',
      duration: '',
      services: [],
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="text-white shadow-lg max-w-2xl mx-auto space-y-6">
      {/* Client Name */}
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

      {/* Services Multi-Select */}
      <div className="space-y-1">
        <label className="text-yellow-300 font-medium">Related Services</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {serviceData?.map((service) => (
            <label
              key={service._id}
              className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded-lg border border-yellow-700 cursor-pointer hover:bg-yellow-900/20"
            >
              <input
                type="checkbox"
                value={service._id}
                checked={clientData.services.includes(service._id)}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setClientData((prev) => {
                    if (checked) return { ...prev, services: [...prev.services, value] };
                    return { ...prev, services: prev.services.filter((id) => id !== value) };
                  });
                }}
                className="accent-yellow-500 w-4 h-4"
              />
              <span className="text-white">{service.title}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
          {loading ? (editData ? 'Updating...' : 'Submitting...') : editData ? 'Update' : 'Submit'}
        </button>
        <button type="button" onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddClientForm;
