import React, { useState, useEffect, useRef } from 'react';

import { FaPlus, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateContact } from '../../../utils/redux/slices/contacDatatSlice';

const ContactForm = () => {
  const dispatch = useDispatch();

  const { data: contactData, loading: contactLoading, error } = useSelector(
    (state) => state.contact
  );

  const [formData, setFormData] = useState({
    email: '',
    address: '',
    phoneNumbers: [''],
    whatsappNumber: '',
    whatsappText: ''
  });

  const containerRef = useRef();

  useEffect(() => {
    if (contactData) {
      setFormData({
        email: contactData.email || '',
        address: contactData.address || '',
        phoneNumbers: contactData.phoneNumbers || [''],
        whatsappNumber: contactData.whatsappNumber || '',
        whatsappText: contactData.whatsappText || ''
      });
    }
  }, [contactData]);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === 'phoneNumbers' && index !== null) {
      const updatedNumbers = [...formData.phoneNumbers];
      updatedNumbers[index] = value;
      setFormData({ ...formData, phoneNumbers: updatedNumbers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addPhoneNumber = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ''] });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!contactData?._id) {
    toast.error("Contact ID not found");
    return;
  }

  dispatch(updateContact({ id: contactData._id, updatedData: formData }))
    .unwrap()
    .then(() => toast.success("Contact info updated successfully!"))
    .catch((err) => toast.error(err || "Failed to update contact info"));
};


  return (
    <div className="bg-[#000000] mx-auto px-4 py-10" ref={containerRef}>
      <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-10 tracking-wide">
        Manage Contact Information
      </h1>

      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-3xl bg-black border border-yellow-500/30 rounded-xl shadow-xl space-y-6 text-yellow-100"
      >
        <h2 className="text-2xl font-semibold border-b border-yellow-500/30 pb-3">
          Contact Details
        </h2>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1  items-center gap-2">
            <FaEnvelope className="text-yellow-300" /> Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full bg-black border border-yellow-500/30 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1  items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-300" /> Address
          </label>
          <input
            type="text"
            name="address"
            className="w-full bg-black border border-yellow-500/30 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Phone Numbers */}
        <div>
          <label className="block font-medium mb-2  items-center gap-2">
            <FaPhoneAlt className="text-yellow-300" /> Phone Numbers
          </label>
          <div className="space-y-3">
            {formData.phoneNumbers.map((num, index) => (
              <input
                key={index}
                type="text"
                name="phoneNumbers"
                className="w-full bg-black border border-yellow-500/30 p-3 rounded-md"
                value={num}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="mt-2 text-sm flex items-center gap-2 text-yellow-300 hover:underline"
            onClick={addPhoneNumber}
          >
            <FaPlus /> Add another number
          </button>
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block font-medium mb-1  items-center gap-2">
            <FaWhatsapp className="text-yellow-300" /> WhatsApp Number
          </label>
          <input
            type="text"
            name="whatsappNumber"
            className="w-full bg-black border border-yellow-500/30 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={formData.whatsappNumber}
            onChange={handleChange}
          />
        </div>

        {/* WhatsApp Text */}
        <div>
          <label className="block font-medium mb-1">WhatsApp Text</label>
          <textarea
            name="whatsappText"
            rows={3}
            className="w-full bg-black border border-yellow-500/30 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={formData.whatsappText}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition"
          disabled={contactLoading}
        >
          {contactLoading ? "Saving..." : "Save Contact Info"}
        </button>
      </form>
            {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
    </div>
  );
};

export default ContactForm;
