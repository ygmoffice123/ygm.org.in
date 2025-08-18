import React from 'react';
import { FaBroom, FaShieldAlt, FaUsers, FaTasks, FaLaptopCode } from 'react-icons/fa';

const OurServices = () => {
  const services = [
    {
      title: "Housekeeping Services",
      icon: <FaBroom size={30} />,
      description: "Daily cleaning, deep sanitization, glass facade, carpet & waste management.",
    },
    {
      title: "Security Services",
      icon: <FaShieldAlt size={30} />,
      description: "Trained, disciplined guards (armed/unarmed) ensuring safety & asset protection.",
    },
    {
      title: "Supporting Staff",
      icon: <FaUsers size={30} />,
      description: "Experienced support staff for various sectors with full/part-time flexibility.",
    },
    {
      title: "Multitask Staff",
      icon: <FaTasks size={30} />,
      description: "Skilled & semi-skilled workers adaptable to diverse roles as needed.",
    },
    {
      title: "Computer Operators",
      icon: <FaLaptopCode size={30} />,
      description: "Efficient and verified operators for data entry and office operations.",
    },
        {
      title: "Housekeeping Services",
      icon: <FaBroom size={30} />,
      description: "Daily cleaning, deep sanitization, glass facade, carpet & waste management.",
    },
    {
      title: "Security Services",
      icon: <FaShieldAlt size={30} />,
      description: "Trained, disciplined guards (armed/unarmed) ensuring safety & asset protection.",
    },
    {
      title: "Supporting Staff",
      icon: <FaUsers size={30} />,
      description: "Experienced support staff for various sectors with full/part-time flexibility.",
    },
    {
      title: "Multitask Staff",
      icon: <FaTasks size={30} />,
      description: "Skilled & semi-skilled workers adaptable to diverse roles as needed.",
    },
    {
      title: "Computer Operators",
      icon: <FaLaptopCode size={30} />,
      description: "Efficient and verified operators for data entry and office operations.",
    },
  ];

  return (
    <section className="w-full py-12 px-4  ">

         <h2 className="about-title text-center text-4xl md:text-5xl font-extrabold text-[#FFD700] drop-shadow-sm">
                 Our Services
        </h2>

     <div className="flex overflow-x-auto md:justify-center py-12 gap-6 pb-6 pl-4 scrollbar-thin scrollbar-thumb-[#FFD700]/50">

        {services.map((service, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-72 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white border border-[#FFD700]/30 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-center items-center mb-4 text-[#FFD700]">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-center mb-2 text-[#FFD700]">
              {service.title}
            </h3>
            <p className="text-sm text-center text-gray-300">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
