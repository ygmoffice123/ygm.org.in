import React from 'react'
import { clientsData } from '../../data/ClientData'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import ClientCard from '../ClientCard'
import { FaChevronRight, FaChevronLeft } from "react-icons/fa"

const Clients = ({clients}) => {
  // const scrollingData = [...clientsData, ...clientsData]
  const scrollingData = [...clients, ...clients]


  console.log(clients);
  
  let scrollTween

  useGSAP(() => {
    // Infinite scroll left
    scrollTween = gsap.to(".client-scroller", {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    })

    // Animate heading
    const titleSplit = new SplitText(".client-title", { type: "words" })
    gsap.from(titleSplit.words, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".client-container",
        start: "top 70%",
        end: "top 50%",
        scrub: true,
      },
    })
  }, [])

  const handleMouseEnter = () => {
    scrollTween.pause()
  }
  const handleMouseLeave = () => {
    scrollTween.resume()
  }

  const handleMouseEnterRight = () => {
    scrollTween.timeScale(-1) // Reverse
  }
  const handleMouseLeaveRight = () => {
    scrollTween.timeScale(1) // Forward
  }

  return (
    <div className="client-container w-screen py-10 overflow-hidden">
      {/* Heading */}
        <h1 className="client-title text-4xl md:text-5xl font-extrabold text-center text-[#FFD700] mb-10">
          Our Trusted Clients
        </h1>

      {/* Carousel */}
      <div className="relative">
        {/* Right hover zone */}
        <div
          className="absolute bg-black/50 backdrop-blur-[2px] h-full w-[60px] right-0 flex justify-center items-center z-50 top-0 cursor-pointer"
          onMouseEnter={handleMouseEnterRight}
          onMouseLeave={handleMouseLeaveRight}
        >
          <FaChevronRight size={20} />
        </div>

        {/* Client logos */}
        <div
          className="client-scroller flex gap-6 px-6 w-max"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {scrollingData.map((item, index) => (
            <ClientCard item={item} key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Clients
