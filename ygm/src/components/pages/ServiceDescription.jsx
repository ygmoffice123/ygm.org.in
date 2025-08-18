import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { serviceData } from "../../data/ServiceData";
import { IoPersonOutline } from "react-icons/io5";
import { MdAccountBalance } from "react-icons/md";

const ServiceDescriptionPage = () => {
  const { serviceId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    serviceData.forEach((element) => {
      if (element.workId == serviceId) {
        setData(element);
      }
    });
  }, [serviceId]);

  if (!data) return <h1>loading</h1>;

  return (
    <div className="min-h-screen w-screen bg-[#000000] pt-30">
      <div className="main-container flex flex-col md:flex-row items-center justify-center    mx-auto px-6 md:px-12">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center  mb-7">
          <img
            className="mask mask-squircle w-full"
            src={data.image}
            alt={data.serviceName}
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#FFD700] leading-tight">
            What We Do in {data.serviceName}
          </h1>
          <p className="text-lg leading-relaxed text-[#E0E0E0] ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam eum
            saepe dolorem nam ea quam quasi illo nulla ex pariatur. Dolorem odio
            nihil accusantium quia earum. Accusantium tenetur dolorum quasi
            dolore, odio omnis unde, laudantium, deleniti quia repellat eaque!
            Corrupti nostrum veritatis assumenda, hic iure quis laudantium
            cumque quibusdam perspiciatis blanditiis architecto minima expedita
            obcaecati doloremque ut sunt tempore quae? Debitis eligendi ex
            tempora reprehenderit libero!
          </p>
          <button className="mt-4 px-6 py-3 bg-[#FFD700] text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-400 transition duration-300 w-fit">
            Learn More
          </button>
          {/* <div className="stats shadow">
  <div className="stat">
    <div className="stat-figure text-secondary">
     
    </div>
    <div className="stat-title">Downloads</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
     
    </div>
    <div className="stat-title">New Users</div>
    <div className="stat-value">4,200</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>

</div> */}

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
              <div className="stat-title">Total CLients</div>
              <div className="stat-value">{data.clientNo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDescriptionPage;


