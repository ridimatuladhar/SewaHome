import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeetTheTeam = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  const API_BASE = 'https://api.sewacareservices.com/team';
  // const API_BASE = 'http://localhost/SewaHome/Backend/team';

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/get_team_members.php`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setTeamMembers(data.teamMembers || []);
      } else {
        throw new Error(data.message || 'Failed to fetch team members');
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err.message);
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  useEffect(() => {
    let timeoutId;

    const checkScreenSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 1024);
      }, 150);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isMobile || teamMembers.length === 0) {
      setIsAnimated(true);
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            setIsAnimated(true);
          });
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isMobile, teamMembers.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const cardHoverVariants = {
    hover: { y: -5, transition: { duration: 0.2 } }
  };

  const getCardStyle = useCallback((index) => {
    if (isMobile) {
      return { position: 'relative', cursor: 'pointer', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' };
    }

    const animationStyle = {
      position: 'relative',
      cursor: 'pointer',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    if (index === 1) {
      return { ...animationStyle, transform: 'translateX(0) translateY(0) scale(1)', opacity: 1, zIndex: 30 };
    } else if (index === 0) {
      return {
        ...animationStyle,
        transform: isAnimated ? 'translateX(0) translateY(0) scale(1)' : 'translateX(300px) translateY(0) scale(0.9)',
        opacity: isAnimated ? 1 : 0,
        zIndex: isAnimated ? 20 : 10,
        transitionDelay: '0.3s'
      };
    } else {
      return {
        ...animationStyle,
        transform: isAnimated ? 'translateX(0) translateY(0) scale(1)' : 'translateX(-300px) translateY(0) scale(0.9)',
        opacity: isAnimated ? 1 : 0,
        zIndex: isAnimated ? 20 : 10,
        transitionDelay: '0.3s'
      };
    }
  }, [isAnimated, isMobile]);

  const handleCardClick = useCallback((memberId) => {
    navigate(`/team/${memberId}`);
  }, [navigate]);

  const handleCardHover = useCallback((index, isHovering) => {
    requestAnimationFrame(() => {
      setHoveredCard(isHovering ? index : null);
    });
  }, []);

  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);

  // Handle Talk To Me button — calls phone if available, else navigates to profile
  const handleTalkToMe = useCallback((e, member) => {
    e.stopPropagation(); // Prevent card click from also firing
    if (member.phone) {
      window.location.href = `tel:${member.phone}`;
    } else {
      navigate(`/team/${member.member_id}`);
    }
  }, [navigate]);

const getImageUrl = (imagePath) => {
    if (!imagePath) return '/about/placeholder.png';
    if (imagePath.startsWith('http') || imagePath.startsWith('//')) return imagePath;
    if (imagePath.startsWith('/')) return `https://api.sewacareservices.com${imagePath}`;
    return `${API_BASE}/uploads/${imagePath}`;
};

  if (loading) {
    return (
      <div className="py-16 px-2 mb-16 container mx-auto" id="about-us">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
          style={{ fontFamily: "Chathura" }}
        >
          Meet The Team
        </motion.h1>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <Loader className="animate-spin h-12 w-12 text-[#376082]" />
            <p className="text-gray-600">Loading team members...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && teamMembers.length === 0) {
    return (
      <div className="py-16 px-2 mb-16 container mx-auto" id="about-us">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
          style={{ fontFamily: "Chathura" }}
        >
          Meet The Team
        </motion.h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">Error loading team members: {error}</p>
            <button
              onClick={fetchTeamMembers}
              className="bg-[#376082] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="py-16 px-2 mb-16 container mx-auto" id="about-us">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
          style={{ fontFamily: "Chathura" }}
        >
          Meet The Team
        </motion.h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">No team members found.</p>
            <button
              onClick={fetchTeamMembers}
              className="bg-[#376082] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="py-16 px-2 mb-16 container mx-auto"
      id="about-us"
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
        style={{ fontFamily: "Chathura" }}
      >
        Meet The Team
      </motion.h1>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-6xl mx-auto mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded"
        >
          <div className="text-yellow-700">Warning: {error} (showing cached data)</div>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-10 place-items-center max-w-6xl mx-auto relative"
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.member_id || member.id}
            variants={itemVariants}
            whileHover="hover"
            style={getCardStyle(index)}
            onClick={() => handleCardClick(member.member_id)}
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
            className="cursor-pointer"
          >
            <motion.div
              variants={cardHoverVariants}
              className="flex flex-col items-center text-center bg-[#EBEBEB] relative transition-transform duration-300 ease-in-out"
              style={{
                transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                willChange: 'transform',
              }}
            >
              <div className="relative sm:w-54 sm:h-63 bg-[url('/about/icon.png')] bg-contain bg-no-repeat bg-center rounded-md flex items-center justify-center">
                <div className="w-48 h-63 transform transition-transform duration-300 ease-in-out hover:scale-105">
                  {!loadedImages.has(index) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
                  )}
                  <img
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onLoad={() => handleImageLoad(index)}
                    onError={(e) => { e.target.src = '/about/placeholder.png'; }}
                    style={{
                      opacity: loadedImages.has(index) ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out'
                    }}
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

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleTalkToMe(e, member)}
                className="absolute top-65 bg-[#EBEBEB] mt-1 px-16 py-1 border border-[#1990ff] text-[#1990ff] hover:rounded-tr-[10px] hover:rounded-bl-[10px] text-sm hover:bg-[#1990ff] hover:text-white transition-all duration-300"
                style={{ fontFamily: "Macha" }}
                aria-label={`Talk to ${member.name}${member.phone ? ` at ${member.phone}` : ''}`}
              >
                TALK TO ME
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MeetTheTeam;