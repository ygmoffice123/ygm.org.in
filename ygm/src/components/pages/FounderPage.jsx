import React, { useEffect, useState } from "react";
import axios from "axios";
import FounderCard from "../FounderCard.jsx"; // Adjust path as needed
import axiosInstance from "../../utils/axios.js";

const FounderPage = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(false);


useEffect(() => {
  const fetchFounders = async () => {
    setLoading(true);
    try {
      const ResData = await axiosInstance.get("/founder/fetch-founder");
      const foundersArray = ResData?.data?.data?.founders || [];
      // console.log(foundersArray); // Optional debug
      setFounders(foundersArray);
    } catch (error) {
      console.error("Error fetching founders:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchFounders();
}, []);


  if (loading) {
    return (
      <div className="bg-black text-[#d4af37] min-h-screen flex items-center justify-center">
        <div className="text-lg animate-pulse">Loading founder details...</div>
      </div>
    );
  }

  if (founders.length === 0) {
    return (
      <div className="bg-black text-red-500 min-h-screen flex items-center justify-center">
        <div className="text-lg">No founders found.</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-[#d4af37] min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center border-b border-[#d4af37]/40 pb-4 mb-12">
          Our Founders
        </h1>

        <div className="space-y-20  px-10">
          {founders.map((founder) => (
            <FounderCard key={founder._id} founder={founder} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FounderPage;
