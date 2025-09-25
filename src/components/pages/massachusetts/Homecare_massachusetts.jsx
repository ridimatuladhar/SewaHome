import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../layouts/Navbar';
import FooterButtons from '../../home/FooterButtons';
import { Link } from 'react-router-dom';

const Homecare_massachusetts = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Program data
  const programs = [
    {
      title: "MassHealth (Medicaid)",
      description: "Provides coverage for home care services for eligible individuals.",
      link: "https://www.mass.gov/masshealth",
      linkText: "Learn more at MassHealth"
    },
    {
      title: "Massachusetts Home Care Program",
      description: "Offers case management and in-home support for elders who need help with daily activities.",
      link: "#",
      linkText: "Contact your local Aging Service Access Point (ASAP)"
    },
    {
      title: "Executive Office of Elder Affairs (EOEA)",
      description: "Coordinates services for seniors, including home care and caregiver support.",
      link: "https://www.mass.gov/orgs/executive-office-of-elder-affairs",
      linkText: "Visit EOEA"
    },
    {
      title: "Veteran's Services",
      description: "Provides assistance for veterans in need of home care.",
      link: "https://www.mass.gov/orgs/massachusetts-department-of-veterans-services",
      linkText: "Visit Massachusetts Veterans' Services"
    },
    {
      title: "Massachusetts Rehabilitation Commission (MRC)",
      description: "Supports individuals with disabilities through in-home care services.",
      link: "https://www.mass.gov/orgs/massachusetts-rehabilitation-commission",
      linkText: "Learn more at MRC"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-50 py-12 md:mt-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[#376081] mb-4" style={{ fontFamily: 'Chathura' }}>
              HomeCare Services - Massachusetts
            </h1>
            <p className="text-lg md:text-xl text-gray-600" style={{ fontFamily: 'Macha' }}>
              Sewa Home Care: Your trusted source for home care services and information about state-funded in-home care programs in Massachusetts.
            </p>
            
          </motion.div>
        </div>
      </section>
      
      {/* Intro Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#376081] mb-6" style={{ fontFamily: 'Chathura' }}>
              Comprehensive Home Care Resources
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Find state-funded programs and services to assist you or your loved ones in Massachusetts. Sewa Home Care is here to help guide you through the process.
            </p>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/carousel/carousel1.jpg" 
                alt="Caregiver assisting an elderly person at home" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Programs Section */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold text-[#376081] mb-2 text-center"
              style={{ fontFamily: 'Chathura' }}
            >
              State-Funded In-Home Care Programs
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-lg text-gray-700 mb-10 text-center max-w-3xl mx-auto"
            >
              Massachusetts offers a variety of programs to support individuals who need in-home care. Here are some resources you can explore:
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#376081]  mb-3">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {program.description}
                    </p>
                    <a 
                      href={program.link} 
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {program.linkText}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              variants={fadeIn}
              className="mt-12 bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto"
            >
              <h3 className="text-xl font-semibold text-[#376081]  mb-4 text-center">
                How Sewa Home Care Can Help
              </h3>
              <p className="text-gray-700 text-center">
                Sewa Home Care can help you navigate these resources and understand your eligibility. Our experienced team is ready to assist you in finding the right program for your needs.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
       <motion.section className="py-6 text-white">
               <div className="container bg-[#5D8FB1] mx-auto p-12 text-center rounded-lg">
                 <motion.h2 
                   className="md:text-3xl text-2xl font-light mb-8"
                   style={{ fontFamily: "Macha" }}
                   initial={{ opacity: 0, y: 20}}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5 }}
                 >
                   Learn more about creating a custom care plan for your loved one.
                 </motion.h2>
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.2 }}
                 >
                   <a
                   href='/consultation'
                     className="inline-block bg-white text-[#5D8FB1] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                     style={{ fontFamily: "Macha" }}
                   >
                     Book a Consultation
                   </a>
                 </motion.div>
               </div>
             </motion.section>
      <FooterButtons />
    </div>
  );
};

export default Homecare_massachusetts;