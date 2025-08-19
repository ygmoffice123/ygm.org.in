import React from 'react';
import Hero from '../sections/Hero';
import Strengths from '../sections/Strengths';
import Contact from '../sections/Contact';
import Services from '../sections/Services';
import Slider3 from '../sections/SliderSlides/Slider3';
import OurClients from '../sections/OurCllients';
import HowWeWork from '../sections/HowWeWork';
import LineChart from '../sections/LineChart';
import { FaArrowUp } from "react-icons/fa";

const Home = () => {
  return (
    <div className='bg-[#000000]'> {/* Overall page background set to black */}

      {/* Hero Section: Top of the page; usually includes main banner or call-to-action */}
      <section id="hero" className="scroll-mt-20">
        <Hero />
      </section>

      {/* About Section: Currently using Slider3 component for content, could be company intro or overview */}
      <section id="about" className="pt-7 scroll-mt-20">
        <Slider3 />
      </section>

      {/* Clients Section: Displays list or carousel of clients */}
      <section id="clients" className="pt-7 scroll-mt-20">
        <OurClients />
        {/* Optionally, you could replace with <Clients clients={clients}/> if passing data as prop */}
      </section>

      {/* Services Section: Showcases services offered by the company */}
      <section id="service" className="pt-7 scroll-mt-20">
        <Services />
      </section>

      {/* How We Work Section: Describes workflow or process steps */}
      <section id="process" className="pt-7 scroll-mt-20">
        <HowWeWork />  
      </section>

      {/* Data Visualization Section: Displays stats, analytics, or performance via a line chart */}
      <section id="process" className="pt-7 scroll-mt-20">
        <LineChart />
      </section>

      {/* Strengths Section: Highlights company’s strengths, values, or unique selling points */}
      <section id="strength" className="pt-7 scroll-mt-20">
        <Strengths />
      </section>

      {/* Contact Section: Contains contact form, email, phone info, or map */}
      <section id="contact" className="pt-7 scroll-mt-20">
        <Contact />
      </section>

 <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="
        md:w-[50px] md:h-[50px] w-[40px] h-[40px] 
        rounded-full flex justify-center items-center
        bg-white/10 backdrop-blur-xl 
        border border-white/30 shadow-lg
        z-[100] fixed bottom-10 right-10 
        cursor-pointer transition 
        hover:bg-white/20 hover:scale-110
      "
    >
      <FaArrowUp size={22} className="text-white drop-shadow" />
    </div>

    </div>
  );
};

export default Home;
