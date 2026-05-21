// CTASectionAlt.jsx - Alternative styling
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Clock } from 'lucide-react';

const CTASection = ({ isMobile = false }) => {
  const PHONE_NUMBER = "(978) 677-7012";
  const PHONE_LINK = "tel:+19786777012";

  const handlePhoneCall = () => {
    window.location.href = PHONE_LINK;
  };

  const handleBookConsultation = () => {
    window.location.href = '/consultation';
  };

  return (
    <motion.section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-[#5D8FB1] to-[#4a7a9c] mx-auto p-8 md:p-12 text-center rounded-2xl shadow-2xl">
        

          <motion.h2 
            className="md:text-4xl text-2xl font-bold mb-4 text-white"
            style={{ fontFamily: "Macha" }}
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
          >
            Need Help Finding the Right Care?
          </motion.h2>
          
          <motion.p 
            className="text-blue-100 text-base md:text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Learn more about creating a custom care plan for your loved one.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.2 }}
          >
            {/* Book a Consultation Button */}
            <button
              onClick={handleBookConsultation}
              className="group relative inline-flex items-center gap-2 bg-white text-[#5D8FB1] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden"
              style={{ fontFamily: "Macha" }}
            >
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Book a Consultation
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5D8FB1] group-hover:w-full transition-all duration-300"></span>
            </button>

            {/* Phone Number Button */}
            <button
              onClick={handlePhoneCall}
              className="group relative inline-flex items-center gap-2 bg-[#6CABFF] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#4B88D9] transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden"
              style={{ fontFamily: "Macha" }}
            >
              <Phone className="w-5 h-5 group-hover:animate-pulse" />
              Call Now: {PHONE_NUMBER}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </button>
          </motion.div>

       
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;