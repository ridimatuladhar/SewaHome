import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const HomeCare = () => {
  const ref = useRef(null)
  // Lower threshold for mobile to trigger animations sooner
  const isInView = useInView(ref, { once: true, threshold: 0.05 })

  return (
    <div ref={ref} className="bg-[#F0F4F8] py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Compassionate */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-3xl md:text-6xl font-medium text-[#376082] mb-4 md:mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Compassionate Care, Right at Home.
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Sewa Home care helps seniors and individuals with challenges maintain their independence,
            safety, and quality of life in the place they love most.
          </motion.p>
        </motion.div>

        {/* What is home care section */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-5xl md:text-8xl font-extrabold text-[#376082] mb-6 md:mb-8" 
              style={{ fontFamily: "Chathura" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              What is Home Care?
            </motion.h2>
            
            <motion.div 
              className="space-y-4 md:space-y-6 text-gray-700"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <motion.p 
                className="text-lg md:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              >
                Home care is a supportive service that allows individuals to 
                receive personalized assistance with daily activities directly in 
                their own home. It's not about taking away{' '}
                <motion.span 
                  className="text-blue-400 font-medium"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  independence
                </motion.span>; it's 
                about{' '}
                <motion.span 
                  className="text-blue-400 font-medium"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  empowering
                </motion.span> it.
              </motion.p>
              
              <motion.p 
                className="text-lg md:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              >
                Whether recovering from surgery, managing a chronic 
                condition, or simply needing an extra hand to age comfortably 
                and safely, home care provides the{' '}
                <motion.span 
                  className="text-blue-400 font-medium"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  professional
                </motion.span> and{' '}
                <motion.span 
                  className="text-blue-400 font-medium"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                >
                  compassionate
                </motion.span> support families trust.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative order-first lg:order-last mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div 
              className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/carousel/carousel4.png" 
                alt="Healthcare professional assisting an elderly woman."
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HomeCare