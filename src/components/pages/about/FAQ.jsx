import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What types of services do you provide?",
      answer: "We offer companion care, personal care, dementia support, respite services, transitional care, nursing visits, transportation, geriatric care management, home search entity, non-medical transportation, and assisted living referrals."
    },
    {
      id: 2,
      question: "Do you provide medical or non-medical care?",
      answer: "We specialize in non-medical home care while also offering nursing visits and health monitoring for added professional oversight."
    },
    {
      id: 3,
      question: "Can you help with Alzheimer's and dementia support?",
      answer: "Yes. Our caregivers provide specialized dementia and Alzheimer's care, focusing on safety, patience, and meaningful engagement."
    },
    {
      id: 4,
      question: "What makes SEWA Home Care different?",
      answer: "We are nationally recognized, led by certified care managers and experienced RNs, and known for our personalized, flexible care plans."
    },
    {
      id: 5,
      question: "How do your transportation services work?",
      answer: "We provide non-medical transportation for medical appointments, errands, and social outings, supporting independence and mobility."
    },
    {
      id: 6,
      question: "Do you provide hospital-to-home transitional assistance?",
      answer: "Yes. Our transitional care services help clients recover safely and comfortably after hospital stays."
    },
    {
      id: 7,
      question: "How do families stay informed about their loved one's care?",
      answer: "Through our technology-enabled care portals and direct communication, families receive regular updates and peace of mind."
    },
    {
      id: 8,
      question: "How do I get started with SEWA Home Care?",
      answer: "Just contact us for a consultation. We'll assess your needs, design a personalized care plan, and connect you with the right caregiver."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section 
      className="py-20 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-left mb-12">
             <h2 className="text-5xl md:text-7xl text-[#376082] font-extrabold mb-6"  style={{ fontFamily: "Chathura" }}>Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-[#376082] rounded"></div>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.button
                  className="w-full px-6 py-4 text-left rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 "
                    >
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  </div>
                </motion.button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 border-t border-gray-100">
                        <motion.p 
                          className="text-gray-600 leading-relaxed pt-4"
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQ;