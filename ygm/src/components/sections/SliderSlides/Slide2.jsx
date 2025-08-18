import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useEffect } from 'react';
import { slide2_img, slide2_vid } from '../../../data/imageAndVideos';

function Slide2() {
  const textRef = useRef();
  const videoRef = useRef();
  const buttonRef = useRef();

  useGSAP(() => {
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3
    });
    gsap.from(videoRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.6
    });
    gsap.from(buttonRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.9
    });
  }, []);

  return (
<div className="slide shrink-0 h-screen w-screen relative overflow-hidden">
  {/* Background Image */}
  <img
    src={slide2_img}
    alt="Our Vision"
    className="absolute inset-0  w-full h-screen  object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-8 lg:p-24 mt-10">
    {/* Text Section */}
    <div ref={textRef} className="flex-0 md:flex-1 text-center lg:text-left text-[#E0E0E0] space-y-6">
      <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
        Our Vision
        <span className="block w-[100px] h-1 bg-[#FFD700] mt-3 mx-auto lg:mx-0 rounded-full"></span>
      </h2>

      <p className="text-lg lg:text-xl font-bold text-[#C0C0C0] leading-relaxed drop-shadow-md">
        At <span className="font-semibold text-[#FFD700]">YGM</span>, we envision a future where businesses thrive through <span className="text-[#FFD700] font-semibold">seamless outsourcing solutions</span>, and individuals achieve growth through meaningful employment. Our goal is to build partnerships that deliver lasting impact.
      </p>

      <a
        href="#vision"
        ref={buttonRef}
        className="inline-block px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#FFD700] to-[#C5A017] rounded-full shadow-lg hover:shadow-2xl hover:from-[#C5A017] hover:to-[#FFD700] transform hover:scale-105"
      >
        Discover Our Vision
      </a>
    </div>

    {/* Video Section */}
    <div ref={videoRef} className="flex-1 max-w-lg lg:max-w-xl">
      <video
        className="w-full rounded-3xl shadow-2xl border-4 border-[#FFD700]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={slide2_vid}  type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</div>


  );
}

export default Slide2;
