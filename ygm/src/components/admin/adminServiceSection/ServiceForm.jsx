import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addService, updateService } from "../../../utils/redux/slices/serviceDataSlice";
import { toast } from "react-hot-toast";


const ServiceForm = ({isEdit = false,editData=null}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({})
  useEffect(()=>{
    if(isEdit){
setFormData(editData)
    } 
    else{
        setFormData( {
    title: "",
    descriptionShort: "",
    descriptionLong: "",
    clientNo: 0,
    employeeNo: 0,
    image: "",
  });
    }

  },[editData])



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "clientNo" || name === "employeeNo"
          ? parseInt(value, 10) || 0
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.descriptionShort || !formData.descriptionLong) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
       if(isEdit){
      await dispatch(
    updateService({
      id: editData._id,
      serviceData: formData, // use updated formData, not old editData
    })
  ).unwrap();

  toast.success("Service edited successfully");

       }else{ 
      await dispatch(addService(formData)).unwrap();
      toast.success("Service added successfully");
      setFormData({
        title: "",
        descriptionShort: "",
        descriptionLong: "",
        clientNo: 0,
        employeeNo: 0,
        image: "",
      });
    }
    } catch (error) {
      toast.error(error || "Failed to add service");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-black  p-6 rounded-xl shadow-lg"
    >
   
      {/* Title */}
      <div>
        <label className="block mb-2 font-medium text-[#FFD700]">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-black border border-[#FFD700]/30 text-[#FFD700] placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
          placeholder="Enter service title"
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block mb-2 font-medium text-[#FFD700]">Short Description *</label>
        <textarea
          name="descriptionShort"
          value={formData.descriptionShort}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 rounded-lg bg-black border border-[#FFD700]/30 text-[#FFD700] placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
          placeholder="Enter short description"
        />
      </div>

      {/* Long Description */}
      <div>
        <label className="block mb-2 font-medium text-[#FFD700]">Long Description *</label>
        <textarea
          name="descriptionLong"
          value={formData.descriptionLong}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 rounded-lg bg-black border border-[#FFD700]/30 text-[#FFD700] placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
          placeholder="Enter detailed description"
        />
      </div>

      {/* Client & Employee Numbers */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-[#FFD700]">Client Count</label>
          <input
            type="number"
            name="clientNo"
            value={formData.clientNo}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-[#FFD700]/30 text-[#FFD700] placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-[#FFD700]">Employee Count</label>
          <input
            type="number"
            name="employeeNo"
            value={formData.employeeNo}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-[#FFD700]/30 text-[#FFD700] placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
            placeholder="0"
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block mb-2 font-medium text-[#FFD700]">Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-black border border-[#FFD700]/30 text-[#FFD700] placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
          placeholder="Enter image link"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-[#FFD700] text-black font-semibold hover:bg-yellow-500 transition"
      >
        Add Service
      </button>
    </form>
  );
}

export default ServiceForm