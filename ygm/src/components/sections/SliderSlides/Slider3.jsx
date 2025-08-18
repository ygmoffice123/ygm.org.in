import React from 'react';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

const Slider3 = () => {
  // GSAP animation for the section title
  useGSAP(() => {
    // Split the title into words for staggered animation
    const titleSplit = new SplitText(".about-title", { type: "words" });

    gsap.from(titleSplit.words, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".about-container", // start animation when container enters viewport
        start: "top 80%",
        end: "top 60%",
        toggleActions: "play none none reverse", // play on enter, reverse on leave
      },
    });

    // Cleanup on unmount
    return () => titleSplit.revert();
  }, []);

  return (
    <div className="w-full about-container">
      
      {/* Section Heading */}
      <div className="text-center py-10">
        <h2 className="about-title text-4xl md:text-5xl font-extrabold text-[#FFD700] drop-shadow-sm">
          About YGM
        </h2>
      </div>

      {/* Carousel Wrapper */}
      <div className="carousel w-full h-full">

        {/** Slide 1 */}
        <div id="slide1" className="carousel-item overflow-hidden relative w-full transition-opacity duration-700 ease-in-out">
          <Slide1 />
          {/* Navigation arrows */}
          <div className="absolute inset-y-1/2 left-5 right-5 flex justify-between items-center transform -translate-y-1/2 z-50">
            <a href="#slide3" className="btn btn-circle bg-black/30 border border-[#FFD700]/60 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors duration-300 backdrop-blur-sm shadow">❮</a>
            <a href="#slide2" className="btn btn-circle bg-black/30 border border-[#FFD700]/60 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors duration-300 backdrop-blur-sm shadow">❯</a>
          </div>
        </div>

        {/** Slide 2 */}
        <div id="slide2" className="carousel-item relative overflow-hidden w-full transition-opacity duration-700 ease-in-out">
          <Slide2 />
          <div className="absolute inset-y-1/2 left-5 right-5 flex justify-between items-center transform -translate-y-1/2 z-50">
            <a href="#slide1" className="btn btn-circle bg-black/30 border border-[#FFD700]/60 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors duration-300 backdrop-blur-sm shadow">❮</a>
            <a href="#slide3" className="btn btn-circle bg-black/30 border border-[#FFD700]/60 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors duration-300 backdrop-blur-sm shadow">❯</a>
          </div>
        </div>

        {/** Slide 3 */}
        <div id="slide3" className="carousel-item relative overflow-hidden w-full transition-opacity duration-700 ease-in-out">
          <Slide3 />
          <div className="absolute inset-y-1/2 left-5 right-5 flex justify-between items-center transform -translate-y-1/2 z-50">
            <a href="#slide2" className="btn btn-circle bg-black/30 border border-[#FFD700]/60 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors duration-300 backdrop-blur-sm shadow">❮</a>
            <a href="#slide1" className="btn btn-circle bg-black/30 border border-[#FFD700]/60 text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors duration-300 backdrop-blur-sm shadow">❯</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Slider3;
