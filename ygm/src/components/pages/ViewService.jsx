import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import ClientCard from "../ClientCard";
import { IoPersonOutline } from "react-icons/io5";

const ViewService = () => {
  const { data: serviceData } = useSelector((state) => state.services);
  const { serviceId } = useParams();
  const [data, setData] = useState(null);
  const [relatedClients, setRelatedClients] = useState([]);

  useEffect(() => {
    if (!serviceData) return;
    const service = serviceData.find((element) => element._id === serviceId);
    setData(service || null);
  }, [serviceId, serviceData]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsRes = await axiosInstance.get(`/clients/fetch-client-by-service/${serviceId}`);
        setRelatedClients(clientsRes?.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    if (serviceId) fetchClients();
  }, [serviceId]);

  if (!data) return <h1 className="text-center mt-10 text-yellow-500">Loading...</h1>;

  return (
    <div className="min-h-screen w-screen bg-[#000000] pt-30">
      <div className="main-container flex flex-col md:flex-row items-center justify-center mx-auto px-6 md:px-12">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center mb-7">
          <img
            className="mask mask-squircle w-full"
            src={data.image}
            alt={data.title}
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#FFD700] leading-tight">
            What We Do in {data.title}
          </h1>
          <p className="text-lg leading-relaxed text-[#E0E0E0]">
            {data.descriptionLong}
          </p>
          <button className="mt-4 px-6 py-3 bg-[#FFD700] text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-400 transition duration-300 w-fit">
            Learn More
          </button>

          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Employees</div>
              <div className="stat-value">{data.employeeNo}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <IoPersonOutline size={30} />
              </div>
              <div className="stat-title">Total Clients</div>
              <div className="stat-value">{data.clientNo}</div>
            </div>
          </div>
        </div>
      </div>
           <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#FFD700] mb-10 text-center">  Top Clients of {data.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedClients.length > 0 ? (
                relatedClients.map((item, index) => (
                  <ClientCard item={item} key={index} index={index} />
                ))
              ) : (
                <p className="text-center text-gray-400">No clients found.</p>
              )}
            </div>
          </div>
    </div>
  );
};

export default ViewService;
