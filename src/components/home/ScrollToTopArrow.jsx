// components/ScrollToTopArrow.js
import { useState, useEffect } from 'react';

const PHONE_DISPLAY = '(857) 290-4205';
const PHONE_HREF = 'tel:+18572904205';

const ScrollToTopArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-2 right-2 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-2 md:gap-3">
      {/* Call button: always visible */}
      <a
        href={PHONE_HREF}
        className="flex items-center gap-2 bg-[#376082] text-white px-3 py-2 md:px-4 md:py-3 rounded-full shadow-lg hover:bg-[#2a4a66] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#376082] focus:ring-opacity-50 text-sm md:text-base font-semibold whitespace-nowrap"
        aria-label={`Call us at ${PHONE_DISPLAY}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>{PHONE_DISPLAY}</span>
      </a>

      {/* Scroll to top: appears after scrolling */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-[#376082] text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-[#2a4a66] transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#376082] focus:ring-opacity-50"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopArrow;