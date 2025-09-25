import { motion } from "framer-motion";

const TeamSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { 
      scale: 1.05, 
      backgroundColor: "#2a4c6e",
      transition: { duration: 0.2 } 
    },
    tap: { scale: 0.97 },
  };

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-16 bg-gradient-to-br from-blue-50 to-indigo-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl w-full flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Image Section - Left Side */}
        <motion.div
          className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-gradient-to-br from-[#376082] to-[#2a4c6e]"
          variants={imageVariants}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.img
              src="/carousel/carousel2.png"
              alt="Join Our Compassionate Home Care Team"
              className="w-full max-w-md h-auto object-contain rounded-lg shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#376082]/20 to-transparent rounded-lg"></div>
          </div>
        </motion.div>

        {/* Content Section - Right Side */}
        <motion.div
          className="w-full lg:w-3/5 p-8 sm:p-12 flex flex-col justify-center space-y-6 lg:space-y-8"
          variants={contentVariants}
          style={{ fontFamily: "Chathura" }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#376082] leading-tight"
            variants={titleVariants}
          >
            Join Our Compassionate Home Care Team
          </motion.h1>

          <div className="space-y-5 text-gray-700 leading-relaxed">
            <motion.p
              className="text-lg lg:text-xl"
              style={{ fontFamily: "Macha" }}
              variants={paragraphVariants}
            >
              Are you passionate about making a difference in people's lives? Do you
              have a heart for caring for the elderly and disabled? If so, we invite
              you to consider joining our team.
            </motion.p>

            <motion.p
              className="text-lg lg:text-xl"
              style={{ fontFamily: "Macha" }}
              variants={paragraphVariants}
            >
              We offer a supportive work environment, competitive pay, comprehensive training,
              and the opportunity to make a meaningful impact in your community.
            </motion.p>

            <motion.p
              className="text-lg lg:text-xl"
              style={{ fontFamily: "Macha" }}
              variants={paragraphVariants}
            >
              We're looking for dedicated caregivers, nurses, and home health aides
              who are committed to providing exceptional, compassionate care to those
              who need it most.
            </motion.p>
          </div>

          {/* Benefits List */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4"
            variants={paragraphVariants}
          >
            {[
              "Competitive compensation",
              "Flexible scheduling",
              "Comprehensive training",
              "Supportive team environment",
              "Career growth opportunities",
              "Making a real difference"
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="flex items-center text-[#376082]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
              >
                <span className="w-2 h-2 bg-[#376082] rounded-full mr-3"></span>
                <span style={{ fontFamily: "Macha" }} className="text-lg">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div className="pt-4" variants={buttonVariants}>
            <motion.button
              className="bg-[#376082] text-white font-semibold py-4 px-12 rounded-xl border-2 border-[#376082] transition-all duration-300 shadow-lg text-lg w-full sm:w-auto"
              style={{ fontFamily: "Lexend" }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => window.location.href = "/opportunities"}
            >
              Explore Career Opportunities
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TeamSection;