import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../utils/redux/slices/serviceDataSlice"; 
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import ServiceCard from "../ServiceCard";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Services = () => {
  const titleRef = useRef();
  const serviceCardsRef = useRef();
  const dispatch = useDispatch();
  const { data: services, loading, error } = useSelector((state) => state.services);

  // Fetch services on mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useGSAP(() => {
    // Animate Title
    const titleSplit = new SplitText(titleRef.current, { type: "words" });
    gsap.from(titleSplit.words, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".service-container",
        start: "top 80%",
        end: "top 70%",
        scrub: 0.5,
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div id="service" className="service-container w-full min-h-screen py-10">
      <h1
        ref={titleRef}
        className="text-4xl md:text-5xl font-extrabold text-center text-[#FFD700] mb-10"
      >
        Industries We Serve
      </h1>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div
        ref={serviceCardsRef}
        className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
      >
        {services.map((item) => (
          <ServiceCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Services;
