import React, { useState } from "react";

// Airline data with actual logos
const airlines = [
  { name: "Alignable", src: "partners/Alignable.png" },
  { name: "Axis Care", src: "partners/axis_care.png" },
  { name: "Bill", src: "partners/bill.png" },
  { name: "Care Academy", src: "partners/care_academy.png" },
  { name: "Care", src: "partners/care.png" },
  { name: "Fallon Health", src: "partners/fallon.png" },
  { name: "GR8Nepal", src: "partners/Golden-gr8.png" },
  { name: "Habitat", src: "partners/habitat.png" },
  { name: "Home Care Alliance", src: "partners/home_care_alliance.png" },
  { name: "Middlesex West", src: "partners/middlesex_west.png" },
  { name: "Senior Care Association", src: "partners/senior care association.png" },
];
const InfiniteMarquee = ({ children, speed = 60 }) => {
  return (
    <div className="overflow-hidden">
      <div
        className="flex animate-marquee"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: "calc(200% + 240px)", // Account for content width + spacing
        }}
      >
        <div className="flex items-center flex-shrink-0">{children}</div>
        {/* Duplicate content for seamless loop */}
        <div className="flex items-center flex-shrink-0">{children}</div>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 120px));
          }
        }
        .animate-marquee {
          animation: marquee ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
};

const Banners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white py-12">
        <h2
           className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
          style={{ fontFamily: "Chathura" }}
        >
          Our Partners
        </h2>

        <div className="container mx-auto px-4">
          <div
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer  rounded-lg overflow-hidden  hover:shadow-md transition"
          >
            <InfiniteMarquee speed={25}>
              {airlines.map((airline, idx) => (
                <img
                  key={idx}
                  src={airline.src}
                  alt={airline.name}
                  style={{ width: 120, marginRight: 120 }}
                  className="object-contain"
                />
              ))}
            </InfiniteMarquee>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // Click outside
        >
          <div
            className="bg-white rounded-lg p-10 space-y-15! max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h3 className="text-3xl font-bold text-[#1c3c6b] text-center mb-6">
              Our Partners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-2 items-center">
              {airlines.map((airline, idx) => (
                <img
                  key={idx}
                  src={airline.src}
                  alt={airline.name}
                  title={airline.name}
                  className="max-h-20 object-contain hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recognition section */}
      {/* <div className="container mx-auto space-y-4">
        <p
          className="text-6xl font-bold text-center mt-10 mb-6 text-[#1c3c6b]"
          style={{ fontFamily: "chathura" }}
        >
          Recognition
        </p> */}

        {/* First row */}
        {/* <div className="flex flex-col md:flex-row justify-center flex-wrap  md:space-x-30 border">
          <div
            className="flex-1 flex flex-col items-center md:items-end justify-end text-end p-4 font-bold text-[42px] md:text-[45px] lg:text-[60px]"
            style={{ fontFamily: "chathura" }}
          >
            <p>Highly Recommended By</p>
            <p className="mt-[-20px] md:pr-14 lg:pr-19">Locals on Alignable</p>
          </div>
          <div className="flex-1 flex items-center justify-center md:justify-start p-4">
            <img
              src="/partners/recognition/image4.png"
              alt=""
              className="w-full max-w-[300px] object-contain"
            />
          </div>
        </div> */}

        {/* Second row */}

        {/* <div className="flex flex-col md:flex-row justify-center flex-wrap  ">
          <div className="flex-1 flex items-center justify-center p-4 ">
            <img
              src="/partners/recognition/image4.png"
              alt=""
              className="w-full max-w-[300px] object-contain"
            />
          </div>
          <div className="flex-1 flex items-center justify-center p-4 ">
            <img
              src="/partners/recognition/image2.png"
              alt=""
              className="w-full max-w-[300px] object-contain"
            />
          </div>
          <div className="flex-1 flex items-center justify-center  p-4">
            <img
              src="/partners/recognition/image3.png"
              alt=""
              className="w-full max-w-[300px] object-contain"
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Banners;
