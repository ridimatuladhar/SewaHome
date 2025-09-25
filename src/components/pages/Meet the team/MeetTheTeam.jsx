import React, { useEffect, useState, useRef } from 'react';

const MeetTheTeam = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  const teamMembers = [
    {
      id: "debbie-jackson",
      name: "Debbie Jackson",
      role: "Care Manager",
      image: "/about/new2.png",
    },
    {
      id: "mala-lama",
      name: "Mala Lama",
      role: "Owner | Care Director",
      image: "/about/new1.png",
    },
    {
      id: "luise-rodriguez",
      name: "Luise Rodriguez",
      role: "Administrator | TA Coordinator",
      image: "/about/new3.png",
    },
  ];

  // Check screen size and set mobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Intersection Observer - only for larger screens
  useEffect(() => {
    if (isMobile) {
      setIsAnimated(true); // Skip animation on mobile
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [isMobile]);

  const getCardStyle = (index) => {
    const baseStyle = {
      position: 'relative',
      cursor: 'pointer'
    };

    // No animations on mobile/tablet
    if (isMobile) {
      return {
        ...baseStyle,
        transition: 'transform 0.3s ease-in-out', // Only hover transitions
      };
    }

    // Animations only on desktop
    const animationStyle = {
      ...baseStyle,
      transition: 'all 0.8s ease-in-out',
    };

    if (index === 1) {
      return {
        ...animationStyle,
        transform: 'translateX(0) translateY(0) scale(1)',
        zIndex: 30
      };
    } else if (index === 0) {
      return {
        ...animationStyle,
        transform: isAnimated ? 'translateX(0) translateY(0) scale(1)' : 'translateX(300px) translateY(0) scale(0.9)',
        zIndex: isAnimated ? 20 : 10,
        transitionDelay: '0.3s'
      };
    } else {
      return {
        ...animationStyle,
        transform: isAnimated ? 'translateX(0) translateY(0) scale(1)' : 'translateX(-300px) translateY(0) scale(0.9)',
        zIndex: isAnimated ? 20 : 10,
        transitionDelay: '0.3s'
      };
    }
  };

  const handleCardClick = (memberId) => {
    window.location.href = `/team/${memberId}`;
  };

  const handleCardHover = (index, isHovering) => {
    setHoveredCard(isHovering ? index : null);
  };

  return (
    <div ref={sectionRef} className="py-16 px-2 mb-16 container mx-auto" id="about-us">
      <h1
        className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
        style={{ fontFamily: "Chathura" }}
      >
        Meet The Team
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10 place-items-center max-w-6xl mx-auto relative">
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            style={getCardStyle(index)}
            onClick={() => handleCardClick(member.id)}
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
          >
            <div
              className="flex flex-col items-center text-center bg-[#EBEBEB] relative transition-transform duration-300 ease-in-out"
              style={{
                transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <div className="relative sm:w-54 sm:h-63 bg-[url('/about/icon.png')] bg-contain bg-no-repeat bg-center rounded-md flex items-center justify-center">
                <div className="w-48 h-63 transform transition-transform duration-300 ease-in-out hover:scale-105">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute top-50 right-[1px] py-[2px] bg-[#EBEBEB] rounded-l-[22px] pl-4 pr-4">
                <h3 className="text-[10px] font-semibold text-[#1c3c6b] uppercase tracking-wide">
                  {member.name}
                </h3>
                <p className="text-[8px] text-[#1990ff] font-medium uppercase">
                  {member.role}
                </p>
              </div>

              <button 
                className="absolute top-65 bg-[#EBEBEB] mt-1 px-16 py-1 border border-[#1990ff] text-[#1990ff] hover:rounded-tr-[10px] hover:rounded-bl-[10px] text-sm hover:bg-[#1990ff] hover:text-white transition-all duration-300"
                style={{
                  transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
                  fontFamily: "Macha"
                }}
              >
                TALK TO ME
              </button>
            </div>
          </div>
        ))}
      </div>

   
    </div>
  );
};

export default MeetTheTeam;