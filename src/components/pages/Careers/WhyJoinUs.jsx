import {
  BookOpenCheck,
  CalendarClock,
  DollarSign,
  GraduationCap,
  HeartPulse,
  PiggyBank,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const WhyJoinUs = () => {
  const [visibleCards, setVisibleCards] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [lastHoveredCard, setLastHoveredCard] = useState(null);

  const cards = [
    {
      icon: <ShieldCheck className="w-15 h-15  mr-2" />,
      id: 1,
      title: "Life, Accidental & Long-Term Disability Insurance",
      style: "rotate-[-12deg]",
      content:
        "Protect your future with life and disability insurance coverage.",
    },
    {
      icon: <HeartPulse className="w-15 h-15  mr-2" />,
      id: 2,
      title: "Health Insurance",
      style: "rotate-[-12deg]",
      content: "Comprehensive coverage for your well-being.",
    },
    {
      id: 3,
      title: "Caregiver-Founded & Operated",
      content:
        "Founded and run by caregivers who understand your challenges firsthand.",
      style: "rotate-[5deg]",
      icon: <Users className="w-15 h-15 mr-2" />,
    },
    {
      id: 4,
      title: "Industry-Leading Wages",
      content: "Earn industry-leading wages for your caregiving services.",
      icon: <DollarSign className="w-15 h-15 mr-2" />,
    },
    {
      id: 5,
      title: "401(k) Retirement Plan",
      content: "Option to enroll and save for your future.",
      style: "rotate-[-12deg]",
      icon: <PiggyBank className="w-15 h-15 mr-2" />,
    },
    {
      id: 6,
      title: "Employee Recognition",
      content: "Be recognized and rewarded for your dedication and hard work.",
      icon: <Star className="w-15 h-15 mr-2" />,
    },
    {
      id: 7,
      title: "Flexible Schedules",
      content: "Create a schedule that fits your lifestyle and commitments.",
      style: "rotate-[2deg]",
      icon: <CalendarClock className="w-15 h-15 mr-2" />,
    },
    {
      id: 8,
      title: "MA Repay Program",
      content:
        "Employees eligible for $3,000-$30,000 in student loan repayment assistance.",
      style: "rotate-[-5deg]",
      icon: <GraduationCap className="w-15 h-15 mr-2" />,
    },
    {
      id: 9,
      title: "Certified Training & Education",
      content:
        "Access Care Academy courses to meet state requirements and advance your career.",
      icon: <BookOpenCheck className="w-15 h-15 mr-2" />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && hoveredCard === null) {
        setCurrentCard((prev) => {
          const startCard = lastHoveredCard !== null ? lastHoveredCard : prev;
          const nextCard = (startCard + 1) % cards.length;
          setVisibleCards(nextCard + 1);
          setLastHoveredCard(null);
          return nextCard;
        });
      }
    }, 2500);

    if (currentCard === 0 && visibleCards === 0) {
      setVisibleCards(1);
      setCurrentCard(0);
    }

    return () => clearInterval(interval);
  }, [
    cards.length,
    isPaused,
    hoveredCard,
    lastHoveredCard,
    currentCard,
    visibleCards,
  ]);

  return (
    <>
      <div className="flex flex-col justify-center ">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row bg-white lg:h-[34rem]">
          {/* Left Section - Title */}
          <div className="flex-1 flex items-center justify-center p-6 md:p-8 lg:p-12 text-center">
            <h1 className="text-5xl  md:text-8xl font-extrabold text-[#376082]"  style={{fontFamily: "Chathura"}}>
              Why Join Us?
            </h1>
          </div>

          {/* Right Section - Animated Cards */}
          <div className="flex-1 mt-15 mb-15 sm:mt-0 sm:mb-0 relative min-h-[20rem] w-40 top-35 lg:top-0 sm:min-h-[25rem] md:min-h-[30rem] lg:min-h-full mx-auto z-[1]">
            <div className=" hidden lg:flex">
              {/* preventing mouse hover affect */}
              <div className="absolute h-100 left-10 z-100 w-127 top-96 "></div>
            </div>
            <div className="relative h-full">
              {cards.map((card, index) => {
                const isActive =
                  hoveredCard !== null
                    ? index === hoveredCard
                    : index === currentCard;
                const isPrevious =
                  index === (currentCard - 1 + cards.length) % cards.length;

                return (
                  <div key={`${card.id}-${index}`}>
                    <div
                      className={`absolute w-[90%] sm:w-[30rem] sm:h-60 rounded-xl transform transition-all duration-1000 ease-out cursor-pointer`}
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) ${
                          isActive
                            ? "translateY(0)"
                            : isPrevious && hoveredCard === null
                            ? "translateY(0)"
                            : "translateY(300px)"
                        }`,
                        opacity: isActive
                          ? 1
                          : isPrevious && hoveredCard === null
                          ? 0
                          : 0,
                        zIndex: isActive
                          ? 1
                          : isPrevious && hoveredCard === null
                          ? 0
                          : -1,
                      }}
                      onMouseEnter={() => {
                        setHoveredCard(index);
                        setCurrentCard(index);
                      }}
                      onMouseLeave={() => {
                        setHoveredCard(null);
                        setLastHoveredCard(index);
                      }}
                    >
                      <div
                        className={`w-full h-full ${
                          card.style || ""
                        } rounded-xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300 bg-white`}
                      >
                        <div
                          className={`h-full flex flex-col justify-center ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                          style={{ fontFamily: "lexend" }}
                        >
                          <div className=" mb-2 sm:mb-4 flex justify-center ">
                            {card.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-center">
                            {card.title}
                          </h3>
                          <p className="text-sm sm:text-base text-[#376082] opacity-90 leading-relaxed text-center">
                            {card.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyJoinUs;
