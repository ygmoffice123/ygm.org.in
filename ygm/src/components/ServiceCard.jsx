import gsap from "gsap";
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router";

const ServiceCard = ({ data }) => {
  const descriptionRef = useRef();
  const containerRef = useRef();
  const tl = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    const div = containerRef.current.querySelector("#description");
    const p = descriptionRef.current;

    // Create timeline ONCE
    tl.current = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

    // Animate height and paragraph together
    tl.current
      .to(div, {
        height: "85%",
        duration: 0.4,
      })
      .fromTo(
        p,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        "<" // start with div height animation
      );
  }, []);

  const handleMouseEnter = () => {
    tl.current.play();
  };

  const handleMouseLeave = () => {
    tl.current.reverse();
  };



  const handleGotoService = ()=>{
    const serviceId = data._id
    console.log(serviceId);
    navigate(`service/${serviceId}`)
  }

  return (
<div
  ref={containerRef}
  className="service-card relative group rounded-lg overflow-hidden shadow-lg aspect-square bg-cover bg-center cursor-pointer transition-transform duration-300 hover:scale-105 border border-[#FFD700]/30 hover:border-[#FFD700]" // 🟡 thin golden border
  style={{
    backgroundImage: `url(${data.image})`,
    backgroundColor: "#000000",
  }}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  id={`service-card-${data.title}`}
>
  {/* Semi-transparent overlay */}
  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>

  {/* Title Bar */}
  <div
    id="description"
    className="overflow-hidden absolute bottom-4 left-1/2 h-[15%] transform -translate-x-1/2 w-[90%] bg-[#1A1A1A]/70 group-hover:bg-[#1A1A1A]/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center shadow-md flex flex-col gap-3 items-center"
  >
    <h3 className="text-lg font-bold text-[#FFD700] drop-shadow-sm">
      {data.title}
    </h3>

    <div
      ref={descriptionRef}
      className="mt-1 text-sm md:text-base text-[#E0E0E0] leading-relaxed font-medium py-1 rounded backdrop-blur-md bg-black/40 drop-shadow-md"
    >
      {data.descriptionShort}
    </div>

    <button
      className="mt-2 px-4 py-2 text-sm font-semibold text-[#000000] bg-gradient-to-r from-[#FFD700] to-[#C5A017] rounded-lg shadow hover:from-[#C5A017] hover:to-[#FFD700] transition-colors duration-300"
    onClick={handleGotoService}
    
    >
      View Service
    </button>
  </div>
</div>

  );
};

export default ServiceCard;
