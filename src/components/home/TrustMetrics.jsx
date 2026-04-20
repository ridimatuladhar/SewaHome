import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const AnimatedCounter = ({ value, suffix = "", isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Extract numeric value from string (remove commas and + sign)
      const numericValue = parseInt(value.replace(/[+,]/g, ''));
      
      const duration = 2000; // 2 seconds
      const steps = 60; // Number of steps
      const stepValue = numericValue / steps;
      const stepTime = duration / steps;

      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.round(stepValue * currentStep);
        
        if (currentStep >= steps) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(newValue);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  // Format number with commas
  const formattedCount = count.toLocaleString();

  return (
    <span className="text-4xl font-semibold text-[#376082] mb-2">
      {formattedCount}{suffix}
    </span>
  );
};

const TrustMetrics = () => {
  const metrics = [
    {
      value: "8",
      suffix: "+",
      label: "Years of Trust"
    },
    {
      value: "450",
      suffix: "+",
      label: "Families Supported"
    },
    {
      value: "1000",
      suffix: "+",
      label: "Certified Caregivers"
    },
    {
      icon: <Star className="text-yellow-400 w-10 h-10 fill-yellow-400" />,
      value: "5",
      suffix: "",
      label: "Average Google Ratings"
    }
  ];

  // Create a ref for the container to trigger animations
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { 
    once: true,
    margin: "-100px" // Trigger when section is 100px into viewport
  });

  return (
    <div ref={containerRef} className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 text-[#376082] cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isContainerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center">               
                {metric.icon ? (
                  <>
                    <AnimatedCounter 
                      value={metric.value} 
                      suffix={metric.suffix}
                      isVisible={isContainerInView}
                    />
                    <div className="ml-2">
                      {metric.icon}
                    </div>
                  </>
                ) : (
                  <AnimatedCounter 
                    value={metric.value} 
                    suffix={metric.suffix}
                    isVisible={isContainerInView}
                  />
                )}
              </div>
              <p className="text-lg text-black font-medium mt-2">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustMetrics;