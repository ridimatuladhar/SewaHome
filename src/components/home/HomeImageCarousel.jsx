import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HomeImageCarousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCarouselImages();
  }, []);

   const fetchCarouselImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://sewacareservices.com/Backend/carousel/carousel.php');
     // const res = await fetch('http://localhost/SewaHome/Backend/carousel/carousel.php');
      
      if (!res.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data = await res.json();
      
      if (data.success) {
        setCarouselImages(data.images || []); // Ensure it's always an array
      } else {
        setCarouselImages([]);
      }
    } catch (err) {
      console.error('Error fetching carousel images:', err);
      setError('Failed to load carousel images');
      setCarouselImages([]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (carouselImages.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (carouselImages.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // left swipe
      nextSlide();
    }
    
    if (touchStart - touchEnd < -50) {
      // right swipe
      prevSlide();
    }
  };

  // Auto-play the carousel
  useEffect(() => {
    if (carouselImages.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, carouselImages.length]);

  if (loading) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#376082]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchCarouselImages}
            className="bg-[#376082] text-white px-4 py-2 rounded-lg hover:bg-[#5D8FB1]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

 if (carouselImages.length === 0) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-500">
          <p>No carousel images available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselImages.map((img, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
             src={`https://sewacareservices.com/Backend${img.image_path}`}
             // src={`http://localhost/SewaHome/Backend${img.image_path}`}
              alt={img.alt_text || img.title || `Carousel image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* {img.title && (
              <div className="absolute bottom-5 left-0 right-0 bg-black/40 text-white text-center py-2 text-lg">
                {img.title}
              </div>
            )} */}
          </div>
        ))}
      </div>
      
      {/* Navigation arrows - hidden on mobile, shown on tablets and up */}
      <button 
        onClick={prevSlide}
        className="hidden sm:flex absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1 md:p-2 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="hidden sm:flex absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-1 md:p-2 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
      </button>
      
      {/* Mobile swipe indicators */}
      <div className="sm:hidden absolute inset-x-0 bottom-20 flex justify-center items-center z-20">
        <div className="flex items-center space-x-2 text-white/80 text-sm">
          <ChevronLeft className="w-4 h-4" />
          <span>Swipe to navigate</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
      
      {/* Indicator dots - smaller on mobile */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeImageCarousel;