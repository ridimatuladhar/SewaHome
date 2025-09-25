import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLoading } from './LoadingContext';

const TypewriterText = ({ text, delay = 0, duration = 2, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (onComplete) {
        onComplete();
      }
    }, delay + (duration * 1000) / text.length);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, duration, onComplete]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

const LoadingScreen = () => {
  const { isLoading, stopLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [showWave, setShowWave] = useState(false);
  const [showTaglines, setShowTaglines] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const lineControls = useAnimation();

 useEffect(() => {
    if (!isLoading) return;

    // Start showing wave after logo appears
    const waveTimer = setTimeout(() => setShowWave(true), 1000);
    
    // Start taglines after wave starts
    const taglinesTimer = setTimeout(() => setShowTaglines(true), 2000);
    
    // Start subtitle after taglines
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 4000);
    
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(stopLoading, 1000); // Use stopLoading from context
          return 100;
        }
        return prev + 1.5;
      });
    }, 80);

    return () => {
      clearTimeout(waveTimer);
      clearTimeout(taglinesTimer);
      clearTimeout(subtitleTimer);
      clearInterval(progressTimer);
    };
  }, [isLoading, stopLoading]);

  useEffect(() => {
    if (showWave) {
      // Animate the line drawing and moving
      lineControls.start({
        pathLength: 1,
        transition: { duration: 2, ease: "easeInOut" }
      });
    }
  }, [showWave, lineControls]);

  const resetAnimation = () => {
    setProgress(0);
    setShowWave(false);
    setShowTaglines(false);
    setShowSubtitle(false);
  };

  useEffect(() => {
    if (!isLoading) {
      resetAnimation();
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Main Content Container */}
      <div className="text-center z-10 relative flex flex-col items-center justify-center min-h-screen w-full px-4">
        
        {/* Logo Section with Animation */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="text-6xl font-bold text-gray-600 mr-1" style={{ fontFamily: 'Arial, sans-serif' }}>
              SE
            </span>
            <span className="text-6xl font-bold text-blue-400" style={{ fontFamily: 'Arial, sans-serif' }}>
              WA
            </span>
          </motion.div>
          <motion.div 
            className="text-2xl text-gray-500 tracking-wider font-light" 
            style={{ fontFamily: 'Arial, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Home Care
          </motion.div>
        </motion.div>

        {/* Taglines with Typewriter Effect */}
        <div className="mb-20 space-y-3">
          {showTaglines && (
            <>
              <div className="text-3xl text-gray-600 font-light tracking-wide h-12" style={{ fontFamily: 'Arial, sans-serif' }}>
                <TypewriterText 
                  text="WHERE COMPASSIONATE CARE MEETS" 
                  duration={1.5}
                />
              </div>
              <div className="text-3xl text-gray-600 font-light tracking-wide h-12" style={{ fontFamily: 'Arial, sans-serif' }}>
                <TypewriterText 
                  text="PROFESSIONAL EXCELLENCE" 
                  delay={1800}
                  duration={1.5}
                />
              </div>
            </>
          )}
        </div>

        {/* Animated Wave with Heart Drawing */}
        <div className="relative w-full max-w-4xl mb-20">
          {showWave && (
            <motion.div 
              className="relative h-24 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* SVG Container for the entire animation */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 800 100" 
                preserveAspectRatio="none"
              >
                {/* Wave Line that draws and moves */}
                <motion.path
                  d="M0,50 Q100,20 200,50 T400,50 T600,50 T800,50"
                  stroke="#93c5fd"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={lineControls}
                  style={{ 
                    filter: 'drop-shadow(0 0 4px rgba(147, 197, 253, 0.6))'
                  }}
                />
                
                {/* Heart path that draws after the line */}
                <motion.path
                  d="M385,35 C385,30 380,25 375,25 C370,25 365,30 365,35 C365,30 360,25 355,25 C350,25 345,30 345,35 C345,45 365,65 365,65 C365,65 385,45 385,35 Z"
                  stroke="#93c5fd"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                />
                
                {/* Filled heart that appears after drawing */}
                <motion.path
                  d="M385,35 C385,30 380,25 375,25 C370,25 365,30 365,35 C365,30 360,25 355,25 C350,25 345,30 345,35 C345,45 365,65 365,65 C365,65 385,45 385,35 Z"
                  fill="#93c5fd"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.5, ease: "easeOut" }}
                />
              </svg>

              {/* Moving light effect */}
              <motion.div 
                className="absolute w-3 h-3 bg-blue-400 rounded-full"
                style={{
                  top: '48px',
                  boxShadow: '0 0 12px #93c5fd, 0 0 24px #93c5fd',
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ 
                  x: 820, 
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ 
                  duration: 4, 
                  delay: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Subtitle with Typewriter Effect */}
        <div className="text-xl text-blue-400 italic font-light mb-16 h-8" style={{ fontFamily: 'Georgia, serif' }}>
          {showSubtitle && (
            <TypewriterText 
              text='"Because your loved ones deserve nothing less"' 
              duration={2.5}
            />
          )}
        </div>

      </div>

      {/* Progress Line at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Progress Text */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
      >
        <div className="text-sm text-gray-500 font-light">
          Loading... {Math.round(progress)}%
        </div>
      </motion.div>
    </div>
  );
};
export default LoadingScreen;