import React from "react";

const FounderCard = ({ founder }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 ">
      <img
        src={founder.image}
        alt={founder.name}
        className="w-64 h-64 object-cover rounded-full border border-[#d4af37]/30 shadow-md"
      />

      <div>
        <h2 className="text-2xl font-semibold mb-2">{founder.name}</h2>
        <p className="text-sm text-[#d4af37]/70 italic mb-4">
          {founder.position}
        </p>

        <section className="space-y-4 text-base leading-relaxed text-[#f1e9c9]">
          {founder.bio?.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
          {founder.quote && (
            <blockquote className="border-l-4 border-[#d4af37] pl-4 italic text-[#d4af37]/70 mt-6">
              "{founder.quote}"
            </blockquote>
          )}
        </section>
      </div>
    </div>
  );
};

export default FounderCard;
