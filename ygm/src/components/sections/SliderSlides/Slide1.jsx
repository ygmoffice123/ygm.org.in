import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Slide1 = () => {
  const textRef = useRef()
  const slideRef = useRef()
  const imgRef = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: slideRef.current,
        start: "top 80%", // Trigger when slide enters viewport
        end: "top 40%", 
        toggleActions: "play none none reverse",
        // markers: true, // Enable for debugging
      }
    })

    // Fade & scale up whole slide
    tl.from(slideRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power2.out",
    })

    // Text animation
    tl.from(textRef.current.querySelectorAll('*'), {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5") // overlap slightly

    // Image animation
    tl.from(imgRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.8") // overlap more for sync

    return () => tl.kill()
  }, [])

  return (
<div ref={slideRef} className="slide shrink-0 h-screen w-screen relative">
  {/* Background Video */}
  <video
    className="absolute inset-0 w-full h-full  object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source 
    src="https://res.cloudinary.com/ddivcdnu4/video/upload/v1755436484/video1_4_aithpy.mp4" 
    type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-8 lg:p-24 mt-20 md:m-3 h-full">
    {/* Media Section */}
    <div className="flex-0 md:flex-1 max-w-lg lg:max-w-xl">
      <img
        ref={imgRef}
        src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg"
        alt="Who We Are"
        className="w-full rounded-3xl shadow-2xl border-4 border-[#FFD700]"
      />
    </div>

    {/* Text Section */}
    <div ref={textRef} className="flex-1 text-center lg:text-left text-[#E0E0E0] space-y-6">
      <h2 className="text-4xl lg:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
        Who We Are
        <span className="block w-[80%] h-1 bg-[#FFD700] mt-3 mx-auto lg:mx-0 rounded-full"></span>
      </h2>

      <p className="text-lg font-bold lg:text-xl text-[#C0C0C0] leading-relaxed drop-shadow-md">
        <span className="font-bold text-[#FFD700]">Yash Govind Marketing</span> (YGM) is a trusted outsourcing partner delivering <span className="text-[#FFD700]">21+ years of excellence</span> in Housekeeping, Security, and Manpower Supply. We empower businesses with certified, skilled, and reliable teams tailored to their needs.
      </p>

      <a
        href="#about"
        className="inline-block px-8 py-4 text-lg font-semibold bg-[#FFD700] rounded-full shadow hover:shadow-xl hover:bg-[#C5A017] hover:scale-105"
      >
        Learn More About Us
      </a>
    </div>
  </div>
</div>



  )
}

export default Slide1
