import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Instagram } from 'lucide-react';

const InstagramAutoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Instagram post images - loaded from public/insta-carousel folder
  const images = [
    {
      id: 1,
      src: "/insta-carousel/sewa1.webp",
      alt: "instagram post"
    },
    {
      id: 2,
      src: "/insta-carousel/sewa2.webp",
      alt: "World Senior Citizen Day celebration"
    },
    {
      id: 3,
      src: "/insta-carousel/sewa3.webp",
      alt: "instagram post"
    },
    {
      id: 4,
      src: "/insta-carousel/sewa4.webp",
      alt: "What Makes us Unique - Geriatric care"
    },
    {
      id: 5,
      src: "/insta-carousel/sewa5.webp",
      alt: "Senior fitness and mobility"
    },
    {
      id: 6,
      src: "/insta-carousel/sewa6.webp",
      alt: "Healthy nutrition for seniors"
    },
    {
      id: 7,
      src: "/insta-carousel/sewa7.webp",
      alt: "Safe home environment"
    },
    {
      id: 8,
      src: "/insta-carousel/sewa8.webp",
      alt: "Caregiver wellness"
    }
  ];

  const autoPlayDuration = 5000; // 5 seconds per slide
  const itemsPerView = 4; // Number of images visible at once
  const maxIndex = Math.max(0, images.length - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, autoPlayDuration);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Get visible images based on current index
  const getVisibleImages = () => {
    return images.slice(currentIndex, currentIndex + itemsPerView);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <h1  className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] "
          style={{ fontFamily: "Chathura" }}>Instagram</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"  style={{ fontFamily: "Macha" }}>
          A window into our world of care. For real moments, client testimonials, and helpful 
          tips, connect with us on Instagram.
        </p>
      </div>

      {/* Main Carousel Container */}
      <div className="relative">
        {/* Control Panel */}
        {/* <div className="flex justify-center items-center mb-8 space-x-4">
          <motion.button
            onClick={prevSlide}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </motion.button>

          <motion.button
            onClick={togglePlayPause}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div> */}

        {/* Instagram Grid */}
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {getVisibleImages().map((image, index) => (
              <motion.div
                key={`${currentIndex}-${image.id}`}
                className="aspect-square overflow-hidden bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.02, z: 10 }}
              >
                <div className="relative h-full overflow-hidden">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-[#376082] scale-125' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        {/* {isPlaying && (
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: autoPlayDuration / 1000,
                  ease: "linear",
                  repeat: Infinity,
                }}
                key={currentIndex}
              />
            </div>
          </div>
        )} */}

        {/* Info Display */}
        {/* <motion.div 
          className="text-center mt-8"
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600">
            Showing posts {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, images.length)} of {images.length}
          </p>
        </motion.div> */}

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://www.instagram.com/sewahomecare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-[#376082] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow Us on Instagram
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default InstagramAutoCarousel;