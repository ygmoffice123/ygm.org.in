import React from "react";
import { navItems } from "../constants";
import { IoClose } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
const SideNav = ({ setIsSideNavOpen, sideNavRef, activeSection }) => {
  return (
    <div className="sideNav w-[80%] md:w-[50%] flex justify-center pt-20 h-screen bg-black/70 absolute z-50 right-0 top-0 bottom-0 transition-all duration-300">
      {/* Close Icon */}
      <button
        onClick={() => setIsSideNavOpen(false)}
        aria-label="Close navigation menu"
        className="absolute right-5 top-6 z-50"
      >
        <IoClose size={30} />
      </button>

      <ul className="flex flex-col gap-10 font-medium text-xl  text-[#E0E0E0]">
        {navItems.map((item, idx) => (
          <li
            key={item.id}
            ref={(el) => (sideNavRef.current[idx] = el)}
            className={`cursor-pointer transition-colors duration-300 ${
              activeSection === item.id
                ? "text-[#FFD700]"
                : "hover:text-[#FFD700]"
            }`}
          >
            {/* <a href={`#${item.id}`} onClick={() => setIsSideNavOpen(false)}>
              {item.name}
            </a> */}
               {item.type == "link" ? (<a href={`#${item.id}`}>{item.name}</a>) :(<Link to={`${item.id}`}>{item.name} </Link> )}
          </li>
        ))}
              <li className="absolute bottom-10 cursor-pointer   transition-colors duration-300 text-[#FFD700]">
<div className=" flex justify-center items-center gap-3"  onClick={()=>setIsSideNavOpen(false)}><IoMdArrowBack size={30}/> <span>Close Menu</span></div>
          </li>
      </ul>
    </div>
  );
};

export default SideNav;
