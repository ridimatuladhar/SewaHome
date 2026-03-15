import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'https://stf.org.np/Backend/testimonials/get_testimonials.php';
  const IMAGE_BASE_URL = 'https://stf.org.np/Backend/testimonials/';
  // const API_URL = 'http://localhost/SewaHome/Backend/testimonials/get_testimonials.php';
  // const IMAGE_BASE_URL = 'http://localhost/SewaHome/Backend/testimonials/';

  const autoPlayDuration = 6000; // 6 seconds per testimonial

  // Fetch testimonials from backend
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (data.success) {
        // Filter only approved testimonials and format them for the frontend
        const formattedTestimonials = data.testimonials
          .filter(testimonial => testimonial.is_approved === 1 || testimonial.is_approved === '1')
          .map(testimonial => ({
            id: testimonial.id,
            name: testimonial.name,
            date: formatDate(testimonial.created_at),
            text: testimonial.comment,
            image: testimonial.image 
              ? `${IMAGE_BASE_URL}${testimonial.image}`
              : '/default/default_dp.png', // Fallback image
          }));
        
        setTestimonials(formattedTestimonials);
      } else {
        setError('Failed to load testimonials');
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Error loading testimonials. Please try again later.');
   
    } finally {
      setLoading(false);
    }
  };

  // Format date from database to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    
    // Add ordinal suffix to day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  
  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayDuration);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, testimonials.length]);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
            style={{ fontFamily: "Chathura" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Testimonials
          </motion.h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && testimonials.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
            style={{ fontFamily: "Chathura" }}
          >
            Testimonials
          </motion.h2>
        </div>
        <div className="text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  // Show empty state
  if (testimonials.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
            style={{ fontFamily: "Chathura" }}
          >
            Testimonials
          </motion.h2>
        </div>
        <div className="text-center text-gray-500">
          No testimonials available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-white">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h2 
          className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
          style={{ fontFamily: "Chathura" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Testimonials
        </motion.h2>
      </div>

      {/* Main Testimonial Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <motion.button
          onClick={prevTestimonial}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          onClick={nextTestimonial}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Testimonial Card */}
        <div className="relative bg-[#ECF5FC] rounded-2xl shadow-2xl mx-4 md:mx-16 lg:mx-24 overflow-hidden" style={{fontFamily:"Macha"}}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="p-8 md:p-12 lg:p-16 text-center relative"
            >
              {/* Quote Icons */}
              <div className="absolute top-4 left-4 md:top-8 md:left-8">
                <Quote className="md:w-12 md:h-12 w-8 h-8 text-blue-200 transform rotate-180" />
              </div>
              <div className="absolute bottom-8 right-8 md:bottom-8 md:right-8">
                <Quote className="md:w-12 md:h-12 w-8 h-8 text-blue-200" />
              </div>

              {/* Testimonial Text */}
              <motion.p 
                className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12 max-w-4xl mx-auto font-light"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                "{testimonials[currentIndex].text}"
              </motion.p>

              {/* Author Info */}
              <motion.div 
                className="flex items-center justify-center space-x-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="relative">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                    onError={(e) => {
                      e.target.src = 'https://i.pravatar.cc/150?img=1';
                    }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400 opacity-20"></div>
                </div>
                <div className="text-left">
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-400 text-xs mt-1">
                    {testimonials[currentIndex].date}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'w-12 h-3 bg-blue-500' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              {currentIndex === index && isPlaying && (
                <motion.div
                  className="absolute inset-0 bg-blue-700 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: autoPlayDuration / 1000,
                    ease: "linear",
                  }}
                  key={`progress-${currentIndex}`}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;