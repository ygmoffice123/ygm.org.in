import React, { useRef } from 'react';
import { IoChatbubblesOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import { useSelector } from 'react-redux';
import gsap from "gsap";

const ContactInfo = () => {
  
  const {data :contactDetails,loading, error} = useSelector(state => state.contact)
  const { address, email, phoneNumbers, whatsappNumber, whatsappText } = contactDetails;

  const sectionRef = useRef();



  useGSAP(() => {
    gsap.from(sectionRef.current.children, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    });
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col gap-3 mt-6">
      {/* Email */}
      <div className="flex items-start gap-4 p-2">
        <div className="p-2 bg-[#2E2E2E] rounded-lg text-[#FFD700]">
          <IoChatbubblesOutline />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#FFD700]">Email Us</h3>
          <p className="text-sm text-[#A0A0A0]">Our team is here to assist you.</p>
          <a
            href={`mailto:${email}`}
            className="text-sm font-semibold text-[#C0C0C0] mt-1 block"
          >
            {email}
          </a>
        </div>
      </div>

      {/* Visit */}
      <div className="flex items-start gap-4 p-2">
        <div className="p-2 bg-[#2E2E2E] rounded-lg text-[#FFD700]">
          <HiOutlineLocationMarker />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#FFD700]">Visit Us</h3>
          <p className="text-sm text-[#A0A0A0]">Drop by our office for a discussion.</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#C0C0C0] mt-1 block"
          >
            {address}
          </a>
        </div>
      </div>

      {/* Call */}
      <div className="flex items-start gap-4 p-2">
        <div className="p-2 bg-[#2E2E2E] rounded-lg text-[#FFD700]">
          <LuPhoneCall />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#FFD700]">Call Us</h3>
          <p className="text-sm text-[#A0A0A0]">We’re available Mon-Sat, 9 AM - 6 PM.</p>
          {phoneNumbers?.map((num, ind) => (
            <a
              key={ind}
              href={`tel:+91${num}`}
              className="text-sm font-semibold text-[#C0C0C0] mt-1 block"
            >
              📞 {num}
            </a>
          ))}
        </div>
      </div>

      {/* WhatsApp */}
      <div className="flex items-start gap-4 p-2">
        <div className="p-2 bg-[#2E2E2E] rounded-lg text-[#FFD700]">
          <FaWhatsapp />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#FFD700]">WhatsApp Us</h3>
          <p className="text-sm text-[#A0A0A0]">Contact with us instantly on WhatsApp.</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`}
            className="block text-sm font-semibold text-[#C0C0C0] mt-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            {whatsappNumber}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
