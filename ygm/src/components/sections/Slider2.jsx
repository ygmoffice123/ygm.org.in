import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import Slide1 from './SliderSlides/Slide1';
import Slide2 from './SliderSlides/Slide2';
import Slide3 from './SliderSlides/Slide3';

const slides = [<Slide1 />, <Slide2 />, <Slide3 />];

const Slider2 = () => {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const isAnimating = useRef(false); // Prevent spam clicks

  const goToSlide = (index) => {
    if (isAnimating.current) return; // Ignore if animating
    isAnimating.current = true;

    setCurrent((index + slides.length) % slides.length);
  };

  const moveLeft = () => goToSlide(current - 1);
  const moveRight = () => goToSlide(current + 1);

  useEffect(() => {
    const animate = gsap.to(sliderRef.current, {
      xPercent: -current * 100,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        isAnimating.current = false;
      }
    });

    return () => animate.kill();
  }, [current]);

  // Auto-scroll every 3s
  useEffect(() => {
    startAutoPlay();

    return () => stopAutoPlay();
  }, [current]);

  const startAutoPlay = () => {
    if (intervalRef.current) return; // Already running
    intervalRef.current = setInterval(() => {
      moveRight();
    }, 3000);
  };

  const stopAutoPlay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden h-screen"
      onMouseEnter={stopAutoPlay} // Pause on hover
      onMouseLeave={startAutoPlay} // Resume on leave
    >
      <div
        ref={sliderRef}
        className="flex h-full"
        style={{ width: `${slides.length * 100}%` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="min-w-full h-full flex-shrink-0"
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-6 transform -translate-y-1/2">
        <button
          onClick={moveLeft}
          className="btn btn-circle bg-gray-800/70 text-white hover:bg-gray-700"
        >
          ❮
        </button>
        <button
          onClick={moveRight}
          className="btn btn-circle bg-gray-800/70 text-white hover:bg-gray-700"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Slider2;
