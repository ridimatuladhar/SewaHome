import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainContent from "./MainContent";

export default function MainHomePage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Care Beyond Compare.";

  const [typedText2, setTypedText2] = useState("");
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const fullText2 = "A LEGACY OF CARE CRAFTED BY HOME CARE EXPERTS.";

  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Function to handle navigation
  const handleNavigation = () => {
    if (isNavigating) return; // Prevent multiple triggers
    
    setIsNavigating(true);
    
    // Stop audio when navigating away
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Optional: Add smooth transition effect
    document.body.style.transition = "opacity 0.3s ease-in-out";
    
    setTimeout(() => {
      navigate("/home");
    }, 100); // Small delay for smooth effect
  };

  // Click handler to navigate to /home
  const handleClick = (e) => {
    // Prevent navigation if clicking on specific interactive elements (if any)
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
      return;
    }
    handleNavigation();
  };

  // Scroll handler to navigate to /home
  const handleScroll = () => {
    handleNavigation();
  };

  // Add event listeners for click and scroll
  useEffect(() => {
    // Add event listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('wheel', handleScroll, { passive: true });
    document.addEventListener('touchmove', handleScroll, { passive: true });

    // Cleanup event listeners
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('wheel', handleScroll);
      document.removeEventListener('touchmove', handleScroll);
    };
  }, [isNavigating]);

  // First text typing animation (without backspace)
  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < fullText.length) {
          setTypedText((prev) => prev + fullText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Reset and restart the animation after a delay
          setTimeout(() => {
            setTypedText("");
            setCurrentIndex(0);
          }, 3000); // Wait 3 seconds before restarting
        }
      },
      100 // Typing speed
    );
    return () => clearTimeout(timer);
  }, [currentIndex, fullText]);

  // Second text typing animation (without backspace)
  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex2 < fullText2.length) {
          setTypedText2((prev) => prev + fullText2[currentIndex2]);
          setCurrentIndex2((prev) => prev + 1);
        } else {
          // Reset and restart the animation after a delay
          setTimeout(() => {
            setTypedText2("");
            setCurrentIndex2(0);
          }, 2000); // Wait 3 seconds before restarting
        }
      },
      80 // Typing speed for second text
    );
    return () => clearTimeout(timer);
  }, [currentIndex2, fullText2]);

  // Audio initialization and cleanup
  useEffect(() => {
    // Initialize audio when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 1; // Set volume to 50%
      audioRef.current.loop = true; // Enable looping
      
      // Attempt to play audio (may require user interaction on some browsers)
      const playAudio = () => {
        audioRef.current.play().catch(error => {
          console.log("Audio autoplay prevented:", error);
        });
      };
      
      // Try to play immediately
      playAudio();
      
      // Also try to play after a short delay (sometimes helps with browser restrictions)
      const audioTimer = setTimeout(playAudio, 500);
      
      return () => {
        clearTimeout(audioTimer);
        // Cleanup audio when component unmounts
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  return (
    <>
      <div 
        className="relative container mx-auto min-h-screen overflow-hidden cursor-pointer"
      >
        {/* Optional: Add a subtle indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/70 text-sm animate-pulse">
          Click anywhere or scroll to continue
        </div>

        {/* logo */}
        <div className="flex justify-center sm:justify-start">
          <img src="/main-logo/logo.png" className="z-100 absolute h-40 sm:h-60 sm:top-10 sm:left-20" alt="Sewa Home Care logo" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 top-50">
          <MainContent typedText={typedText} typedText2={typedText2} />
        </div>
      </div>
      
      {/* Background Video Wrapper */}
      <div className="absolute inset-0 z-0 h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/main-bg/mainbg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/main-audio/SewaHome_audio.mp3" type="audio/mp3" />
        <source src="/main-audio/SewaHome_audio.mp3" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}