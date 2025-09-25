import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Lorem Ipsu",
      date: "22nd August 2025",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://i.pravatar.cc/150?img=1",
      role: "Family Member"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      date: "15th August 2025",
      text: "The care provided has been exceptional. My mother feels comfortable and safe, and the staff treats her like family. I couldn't ask for better service and dedication from the entire team. They go above and beyond every single day.",
      image: "https://i.pravatar.cc/150?img=2",
      role: "Daughter"
    },
    {
      id: 3,
      name: "Michael Chen",
      date: "10th August 2025",
      text: "Professional, compassionate, and reliable. The caregivers have made such a positive impact on our family's life. My father looks forward to their visits and has shown remarkable improvement in his daily activities and overall mood.",
      image: "https://i.pravatar.cc/150?img=3",
      role: "Son"
    },
    {
      id: 4,
      name: "Emma Wilson",
      date: "5th August 2025",
      text: "Outstanding service that truly makes a difference. The peace of mind knowing our loved one is in such capable hands is invaluable. The attention to detail and genuine care shown by every team member is remarkable.",
      image: "https://i.pravatar.cc/150?img=4",
      role: "Granddaughter"
    },
    {
      id: 5,
      name: "Robert Davis",
      date: "28th July 2025",
      text: "Five stars! The quality of care and the personal touch they bring to every interaction is what sets them apart. Our grandmother has never been happier, and we feel confident she's receiving the best possible care.",
      image: "https://i.pravatar.cc/150?img=5",
      role: "Grandson"
    }
  ];

  const autoPlayDuration = 6000; // 6 seconds per testimonial

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayDuration);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
        {/* Control Buttons */}
        {/* <div className="flex justify-center mb-8">
          <motion.button
            onClick={togglePlayPause}
            className="px-4 py-2 bg-white shadow-md rounded-full text-gray-600 hover:text-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>
        </div> */}

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

        {/* Testimonial Counter */}
        {/* <motion.div 
          className="text-center mt-8"
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-500 text-sm">
            Testimonial {currentIndex + 1} of {testimonials.length}
          </p>
        </motion.div> */}
      </div>

 
     
    </div>
  );
};

export default Testimonials;