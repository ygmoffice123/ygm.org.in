import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate()
  return (
<footer className="relative w-full text-[#E0E0E0] py-12 overflow-hidden bg-[#000000]"> {/* color updated */}
  <div className="w-20 h-1 bg-[#FFD700] rounded-full mx-auto mb-6"></div>

  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-cover"></div>
  
  <div className="relative container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4">
    
    {/* Logo Section */}
    <div className="w-full md:w-1/3 flex justify-center md:justify-start" onDoubleClick={()=>navigate("/admin")}>
     
      <img 
        src="/logo.png" 
        alt="YGM Logo" 
        className="w-30  hover:scale-105 hover:rotate-1"
      />
    </div>

    {/* Links Section */}
    <nav className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4 text-center md:text-left">
      {["Home", "About", "Services", "Clients", "Contact", "Privacy Policy"].map((link, idx) => (
        <a 
          key={idx}
          href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} 
          className="relative group text-[#C0C0C0] hover:text-[#FFD700] transition-colors duration-300 ease-in-out"> {/* color updated */}
          {link}
        </a>
      ))}
    </nav>
  </div>

  {/* Social Media */}
  {/* <div className="relative mt-10 flex justify-center gap-6 text-2xl">
    {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
      <a
        key={idx}
        href="#"
        aria-label={`YGM on ${Icon.displayName?.replace('Fa', '')}`}
        className="group relative text-[#A0A0A0] hover:text-[#FFD700] transition-colors duration-300 ease-in-out"> 
        <Icon className="transition-transform duration-300 group-hover:scale-110" />
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span> 
      </a>
    ))}
  </div> */}

  {/* Divider */}
  <div className="relative w-4/5 mx-auto my-6 border-t border-[#2E2E2E]"></div> {/* color updated */}

  {/* Copyright */}
  <div className="relative text-center text-sm text-[#A0A0A0]">
    © {new Date().getFullYear()} <span className="text-[#FFD700] font-semibold">YGM</span>. All rights reserved. {/* color updated */}
  </div>
</footer>

  );
};

export default Footer;
