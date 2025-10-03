// import React, { useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/all";

// gsap.registerPlugin(ScrollTrigger);

// const steps = [
//   {
//     title: "Client Consultation",
//     desc: "We understand your staffing needs, goals, and expectations.",
//     extra: "Outcome: Clear understanding of project scope and requirements."
//   },
//   {
//     title: "Workforce Planning",
//     desc: "We identify skills, experience, and number of personnel required.",
//     extra: "Outcome: Detailed manpower plan tailored to client needs."
//   },
//   {
//     title: "Selection & Screening",
//     desc: "We shortlist candidates through interviews and background checks.",
//     extra: "Outcome: A pool of qualified, verified candidates."
//   },
//   {
//     title: "Training & Orientation",
//     desc: "We prepare staff to meet operational and quality standards.",
//     extra: "Outcome: Staff ready to deliver high performance from day one."
//   },
//   {
//     title: "Deployment",
//     desc: "We assign trained personnel to your site promptly.",
//     extra: "Outcome: On-time staffing with minimal disruption."
//   },
//   {
//     title: "Monitoring & Support",
//     desc: "We ensure performance quality and address client concerns.",
//     extra: "Outcome: Ongoing quality assurance and problem resolution."
//   },
//   {
//     title: "Feedback & Improvement",
//     desc: "We collect client feedback to enhance our services.",
//     extra: "Outcome: Continuous improvement of manpower solutions."
//   },
// ];

// const HowWeWork = () => {
//   const sectionRef = useRef(null);
//   const stepsRef = useRef([]);

//   useGSAP(() => {

//  const titleSplit = new SplitText(".process-title", { type: "words" });

//     gsap.from(titleSplit.words, {
//       y: 40,
//       opacity: 0,
//       duration: 1.4,
//       ease: "power3.out",
//       stagger: 0.1,
//       scrollTrigger: {
//         trigger: ".process-section",
//         start: "top 70%",
//         end: "top 50%",
//         scrub: true,
//       },
//     });
//   }, []);

//   return (
//     <section ref={sectionRef} className="process-section bg-black py-10 px-6">
//       {/* Heading */}
//       <div className="text-center mb-14">
 
//               <h1 className="process-title text-4xl md:text-5xl font-extrabold text-center text-[#FFD700] drop-shadow-sm"> {/* title color updated */}
//            How We Work
//       </h1>
   
//       </div>

//       {/* Steps Container */}
//       <div className="relative max-w-3xl mx-auto">
//         {/* Vertical Line */}
//         <div className="absolute left-6 top-0 w-0.5 h-[92%] bg-yellow-500"></div>

//         {/* Steps */}
//         {steps.map((step, index) => (
//           <div
//             key={index}
//             ref={(el) => (stepsRef.current[index] = el)}
//             className="relative flex items-start mb-12"
//           >
//             {/* Step Number */}
//             <div className="flex items-center justify-center  w-12 h-12 shrink-0 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold shadow-lg z-10  ">
//               {index + 1}
//             </div>

//             {/* Step Content */}
//             <div className="ml-8">
//               <h3 className="text-lg font-semibold text-white">{step.title}</h3>
//               <p className="text-gray-400 mt-1 text-sm leading-relaxed">
//                 {step.desc}
//               </p>
//               <p className="text-yellow-400 text-xs mt-2 italic">{step.extra}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HowWeWork;



import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Client Consultation",
    desc: "We understand your staffing needs, goals, and expectations.",
    extra: "Outcome: Clear understanding of project scope and requirements."
  },
  {
    title: "Workforce Planning",
    desc: "We identify skills, experience, and number of personnel required.",
    extra: "Outcome: Detailed manpower plan tailored to client needs."
  },
  {
    title: "Selection & Screening",
    desc: "We shortlist candidates through interviews and background checks.",
    extra: "Outcome: A pool of qualified, verified candidates."
  },
  {
    title: "Training & Orientation",
    desc: "We prepare staff to meet operational and quality standards.",
    extra: "Outcome: Staff ready to deliver high performance from day one."
  },
  {
    title: "Deployment",
    desc: "We assign trained personnel to your site promptly.",
    extra: "Outcome: On-time staffing with minimal disruption."
  },
  {
    title: "Monitoring & Support",
    desc: "We ensure performance quality and address client concerns.",
    extra: "Outcome: Ongoing quality assurance and problem resolution."
  },
  {
    title: "Feedback & Improvement",
    desc: "We collect client feedback to enhance our services.",
    extra: "Outcome: Continuous improvement of manpower solutions."
  },
];

const HowWeWork = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  useGSAP(() => {
    const titleSplit = new SplitText(".process-title", { type: "words" });

    gsap.from(titleSplit.words, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".process-section",
        start: "top 70%",
        end: "top 50%",
        scrub: true,
      },
    });
  }, []);

  const toggleStep = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="process-section bg-black py-10 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="process-title text-4xl md:text-5xl font-extrabold text-[#FFD700] drop-shadow-sm">
          How We Work
        </h1>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl shadow-md border border-gray-700 overflow-hidden"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleStep(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-white font-semibold hover:bg-gray-800 transition"
            >
              <span className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold">
                  {index + 1}
                </span>
                {step.title}
              </span>
              <span className="text-yellow-400 text-lg">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Accordion Content */}
            {openIndex === index && (
              <div className="px-5 pb-5 text-sm text-gray-300">
                <p className="leading-relaxed">{step.desc}</p>
                <p className="text-yellow-400 italic mt-2">{step.extra}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;
