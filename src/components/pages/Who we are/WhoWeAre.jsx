import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhoWeAreSection() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: 1,
      title: "EXPERIENCED AND SUPPORTIVE",
      content: "We understand that not one care plan fits all. Daily services can include anything from meal preparation, hygiene, cleaning, and supervision. We will take the time to get to know you and develop an individualized care plan that fits your specific needs.",
      imagePosition: "right",
      image: "/carousel/carousel1.webp"
    },
    {
      id: 2,
      title: "Experienced Home Health Aids",
      content: "Companionship is key to a trusted relationship with our caregivers. We not only strive to help you with everyday tasks but want to develop a caring relationship with you. We provide one-on-one attention and care that cannot compare in other settings.",
      imagePosition: "left",
      image: "/carousel/carousel2.webp"
    },
    {
      id: 3,
      title: "OUR CAREGIVERS",
      content: "An exceptional team of home care professionals with real-world experience, education, skills, and multiple specializations. We assist you and your family with the care and you deserve. Whether you or your loved one needs our service for a few hours a day or 24 hours a day, we are here to make your life easier at home.",
      imagePosition: "right",
      image: "/carousel/carousel3.webp"
    },
    {
      id: 4,
      title: "CAREGIVERS YOU CAN TRUST",
      content: "Feel better in the comfort of your own home. We specialize in care and daily living assistance to an array of individuals. Whether you need daily or weekly assistance due to aging, illness, recovery, or rehabilitation, our care givers will provide an individualized service that you can trust.",
      imagePosition: "left",
      image: "/carousel/carousel4.webp"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 4000); // Change section every 4 seconds

    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden pt-24">
      {/* Regular Header */}
      <div className="bg-white">
        <h1
            className="text-5xl md:text-7xl font-extrabold text-center text-[#376082]"
            style={{ fontFamily: "Chathura" }}
          >
          Who We Are
        </h1>
      </div>

      {/* Animated Sections Container */}
      <div className="relative min-h-screen">
        <AnimatePresence>
          {sections.map((section, index) => (
            <motion.div
              key={`${section.id}-${index}`}
              className="absolute inset-0 flex items-center justify-center px-6"
              initial={{ 
                y: 100, 
                opacity: 0, 
                scale: 0.95,
                filter: "blur(10px)",
                zIndex: 1
              }}
              animate={{
                y: 0,
                opacity: index === activeSection ? 1 : 0,
                scale: index === activeSection ? 1 : 0.9,
                filter: index === activeSection ? "blur(0px)" : "blur(8px)",
                zIndex: index === activeSection ? 10 : 1
              }}
              exit={{ 
                y: -50, 
                opacity: 0, 
                scale: 0.85,
                filter: "blur(15px)",
                zIndex: 1
              }}
              transition={{
                duration: index === activeSection ? 1.2 : 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { 
                  duration: index === activeSection ? 0.6 : 1.2,
                  delay: index === activeSection ? 0.2 : 0
                },
                filter: { 
                  duration: index === activeSection ? 0.6 : 1.2,
                  delay: index === activeSection ? 0.2 : 0
                },
                scale: {
                  duration: index === activeSection ? 0.8 : 1.0
                },
                zIndex: {
                  duration: 0,
                  delay: index === activeSection ? 0 : 0.5
                }
              }}
              style={{
                pointerEvents: index === activeSection ? 'auto' : 'none'
              }}
            >
              {/* Section Content Card */}
              <motion.div 
                className="max-w-7xl w-full"
                style={{ backgroundColor: '#F4F9FD', fontFamily: 'Macha'}}
                animate={{
                  borderRadius: '24px',
                  boxShadow: index === activeSection 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                    : '0 10px 25px -12px rgba(0, 0, 0, 0.1)'
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-8 md:p-12">
                  <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center ${
                    section.imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    
                    {/* Content */}
                    <motion.div 
                      className={`space-y-6 ${
                        section.imagePosition === 'left' ? 'lg:col-start-2' : ''
                      }`}
                      initial={{ x: 20, opacity: 0.7 }}
                      animate={{ 
                        x: 0, 
                        opacity: index === activeSection ? 1 : 0.3
                      }}
                      transition={{ 
                        duration: index === activeSection ? 0.8 : 0.6, 
                        delay: index === activeSection ? 0.3 : 0 
                      }}
                    >
                      <div className="inline-block">
                        <motion.h2 
                          className="text-xl md:text-3xl font-bold text-gray-900 mb-3"
                          initial={{ scale: 0.95 }}
                          animate={{ 
                            scale: index === activeSection ? 1 : 0.95
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {section.title}
                        </motion.h2>
                        <motion.div 
                          className="h-1 bg-blue-500 rounded-full"
                          initial={{ width: 0, opacity: 0.6 }}
                          animate={{ 
                            width: index === activeSection ? '80px' : '0px', 
                            opacity: index === activeSection ? 1 : 0.3
                          }}
                          transition={{ 
                            duration: index === activeSection ? 0.8 : 0.4, 
                            delay: index === activeSection ? 0.4 : 0
                          }}
                        />
                      </div>
                      
                      <motion.p 
                        className="text-md text-gray-700 leading-relaxed"
                        initial={{ y: 10, opacity: 0.6 }}
                        animate={{ 
                          y: 0, 
                          opacity: index === activeSection ? 1 : 0.4
                        }}
                        transition={{ 
                          duration: index === activeSection ? 0.7 : 0.5, 
                          delay: index === activeSection ? 0.5 : 0 
                        }}
                      >
                        {section.content}
                      </motion.p>
                    </motion.div>

                    {/* Image */}
                    <motion.div 
                      className={`relative ${
                        section.imagePosition === 'left' ? 'lg:col-start-1' : ''
                      }`}
                      initial={{ x: -20, scale: 0.9, opacity: 0.8 }}
                      animate={{ 
                        x: 0, 
                        scale: index === activeSection ? 1 : 0.9, 
                        opacity: index === activeSection ? 1 : 0.3
                      }}
                      transition={{ 
                        duration: index === activeSection ? 0.8 : 0.6, 
                        delay: index === activeSection ? 0.1 : 0 
                      }}
                    >
                      <motion.div 
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                        initial={{ rotateY: 5, scale: 0.95 }}
                        animate={{ 
                          rotateY: 0, 
                          scale: index === activeSection ? 1 : 0.95
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="relative">
                          <motion.img 
                            src={section.image}
                            alt={`${section.title} - Healthcare professional providing care`}
                            className="w-full h-64 md:h-96 object-cover"
                            initial={{ scale: 1.05 }}
                            animate={{ 
                              scale: index === activeSection ? 1 : 1.02
                            }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress indicator (not fixed) */}
      <div className="flex justify-center mt-8 mb-16">
        <div className="flex space-x-2">
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 md:w-3 h-3 rounded-full bg-gray-300 cursor-pointer"
              animate={{
                backgroundColor: index === activeSection ? '#3b82f6' : '#d1d5db',
                scale: index === activeSection ? 1.2 : 1
              }}
              onClick={() => setActiveSection(index)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}