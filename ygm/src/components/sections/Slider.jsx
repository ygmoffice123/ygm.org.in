import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slidesData } from "../../data/Slider";
import Slide1 from "./SliderSlides/Slide1";
import Slide2 from "./SliderSlides/Slide2";
import Slide3 from "./SliderSlides/Slide3";

gsap.registerPlugin(ScrollTrigger);

const Slider = () => {

  useGSAP(() => {
    const sections = gsap.utils.toArray(".slide");
    const container = document.querySelector(".slider");

    // Horizontal scroll
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${container.offsetWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        markers: false, // ✅ turn off in production
      },
    });

  }, []);

  return (
    <div className="slider flex w-[300vw]">
      <Slide1/>

      <Slide2/>

      <Slide3/>


    </div>




  );
};

export default Slider;
