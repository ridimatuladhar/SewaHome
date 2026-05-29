import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../layouts/Navbar';
import FooterButtons from '../footer/FooterButtons';

const NonDiscrimination = () => {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-[#376082] py-12 mt-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-medium mb-4" > Non-Discrimination Policy</h1>
            <p className="text-lg md:text-xl" style={{fontFamily: "Macha"}}>
              Home Care and More LLC DBA Sewa Home Care is committed to equal treatment and access for all.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Policy Statement */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="mb-10">
              <h2 className="md:text-3xl text-2xl font-medium text-[#376082] mb-4">Our Commitment</h2>
              <p className="text-gray-700 mb-6 leading-relaxed" style={{fontFamily: "Macha"}}>
                Home Care and More LLC DBA Sewa Home Care complies with applicable federal civil rights laws and does not discriminate on the basis of race, color, national origin, age, disability, or sex, consistent with the scope of sex discrimination described at 45 CFR § 92.101(a)(2). Sewa Home Care does not exclude individuals or treat them less favorably because of race, color, national origin, age, disability, or sex.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mb-10">
              <h2 className="md:text-3xl text-2xl  font-medium text-[#376082] mb-4" >Our Services</h2>
              <div className="bg-blue-50 p-6 rounded-lg" style={{fontFamily: "Macha"}}>
                <h3 className="text-xl font-semibold text-[#376082] mb-3">For People with Disabilities</h3>
                <p className="text-gray-700 mb-4">
                  We provide reasonable modifications and free, appropriate auxiliary aids and services to communicate effectively, such as:
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                  <li className="mb-2">Qualified sign language interpreters</li>
                  <li>Written information in alternative formats (large print, audio, accessible electronic formats, and others)</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-[#376082] mb-3">For Non-English Speakers</h3>
                <p className="text-gray-700 mb-4">
                 We provide free language assistance services to individuals whose primary language is not English, which may include:
                </p>
                <ul className="list-disc pl-5 text-gray-700">
                  <li className="mb-2">Qualified interpreters</li>
                  <li>Information provided in other languages</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mb-10">
              <h2 className="md:text-3xl text-2xl font-medium text-[#376082] mb-4" >Request Assistance</h2>
              <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-[#376082]" style={{fontFamily: "Macha"}}>
                <p className="text-gray-700 mb-4">
                 If you need reasonable modifications, auxiliary aids, or language assistance services, please contact:
                </p>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <p className="font-semibold text-lg">Suraj Tamrakar</p>
                  <p className="text-gray-700">(774) 287-6819</p>
                  <p className="text-blue-600">suraj@sewahomecare.com</p>
                  <p className="text-blue-600">headoffice@sewahomecare.com</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mb-10">
              <h2 className="md:text-3xl text-2xl font-medium text-[#376082] mb-4">Filing a Grievance</h2>
              <div className="bg-blue-50 p-6 rounded-lg" style={{fontFamily: "Macha"}}>
                <p className="text-gray-700 mb-4">
                  If you believe that Home Care and More LLC DBA Sewa Home Care has failed to provide these services or has discriminated on the basis of race, color, national origin, age, disability, or sex, you may file a grievance with:
                </p>
                <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                  <p className="font-semibold text-lg">Suraj Tamrakar</p>
                  <p className="text-gray-700">(774) 287-6819</p>
                  <p className="text-blue-600">suraj@sewahomecare.com</p>
                  <p className="text-blue-600">headoffice@sewahomecare.com</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <h2 className="md:text-4xl text-3xl font-medium text-[#376082] mb-4">Civil Rights Complaints</h2>
              <div className="bg-gray-100 p-6 rounded-lg" style={{fontFamily: "Macha"}}>
                <p className="text-gray-700 mb-4">
                  You may also file a civil rights complaint with the U.S. Department of Health and Human Services, Office for Civil Rights. Complaints can be submitted electronically through the Office for Civil Rights Complaint Portal, or by mail or phone at:
                </p>
                <div className="bg-white p-4 rounded-md shadow-sm mb-4">
                  <p className="font-semibold">U.S. Department of Health and Human Services</p>
                  <p className="text-gray-700">200 Independence Avenue, SW</p>
                  <p className="text-gray-700">Room 509F, HHH Building</p>
                  <p className="text-gray-700">Washington, D.C. 20201</p>
                  <p className="text-gray-700">1-800-368-1019, 800-537-7697 (TDD)</p>
                </div>
                <p className="text-gray-700">
                 Complaint forms are available through the Office for <a href="https://www.hhs.gov/civil-rights/filing-a-complaint/complaint-process/index.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Civil Rights Complaint Portal</a>.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <FooterButtons />
    </div>
  );
};

export default NonDiscrimination;