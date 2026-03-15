import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Home, Users, CheckCircle } from 'lucide-react';
import Navbar from "../../layouts/Navbar";
import FooterButtons from "../footer/FooterButtons";
import FAQ from './FAQ';
import ScrollToTopArrow from '../../home/ScrollToTopArrow';

// 🔑 Detect small screens for responsive animations
const isMobile = window.innerWidth < 768;

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: isMobile ? 20 : 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: isMobile ? 0.4 : 0.6 }
};

const slideLeft = {
  initial: { opacity: 0, x: isMobile ? -20 : -50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: isMobile ? 0.5 : 0.8 }
};

const slideRight = {
  initial: { opacity: 0, x: isMobile ? 20 : 50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: isMobile ? 0.5 : 0.8 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15 } }
};

const About = () => {
  const services = [
    {
      category: "Personal Wellness & Daily Living",
      icon: <Heart className="w-10 h-10 text-[#376082]" />,
      items: [
        "Personal Care & Dressing",
        "Mobility & Exercise Assistance", 
        "Meal Preparation",
        "Medication Reminders"
      ]
    },
    {
      category: "Homemaking & Support",
      icon: <Home className="w-10 h-10 text-[#376082]" />,
      items: [
        "Light Housekeeping",
        "Grocery Shopping & Errands",
        "Transportation"
      ]
    },
    {
      category: "Companionship & Joy",
      icon: <Users className="w-10 h-10 text-[#376082]" />,
      items: [
        "Companionship & Conversation",
        "Social & Community Outings",
        "Hobbies & Favorite Activities"
      ]
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-blue-500 to-[#376082] text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mt-16 mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-4"
            style={{ fontFamily: "Chathura" }}
            {...fadeInUp}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.2 }}
          >
            Providing exceptional senior care with compassion, expertise, and dedication since our founding
          </motion.p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section 
        className="py-20 bg-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#376082]"
              variants={fadeInUp}
            >
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-[#376082] mr-4" />
                <h2 className="text-4xl md:text-5xl text-[#376082] font-extrabold" style={{ fontFamily: "Chathura" }}>Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Macha" }}>
                At Sewa Home Care, our mission is to be a trusted leader in home care services throughout Massachusetts and California providing compassionate, high-quality support that empowers seniors to live independently, safely, and with dignity in the comfort of their own homes.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#376082]"
              variants={fadeInUp}
            >
              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-[#376082] mr-4" />
                <h2 className="text-4xl md:text-5xl text-[#376082] font-extrabold" style={{ fontFamily: "Chathura" }}>Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Macha" }}>
                At Sewa Home Care, we believe aging is a time of strength and wisdom. With compassion and respect, we promote care that fosters independence, dignity, and wellness—helping seniors thrive with confidence and joy in the comfort of home.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Approach to Care */}
      <motion.section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div {...slideLeft} viewport={{ once: true }}>
              <h2 className="text-5xl md:text-7xl text-[#376082] font-extrabold mb-6" style={{ fontFamily: "Chathura" }}>Our Approach to Care</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                From the outset, Seva Home Care has understood that exceptional senior care starts with a profound appreciation of each individual's unique health, cultural, and emotional needs.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                We continuously enhance our offerings to support aging in place with dignity whether through memory support services, comprehensive care, or engagement-based wellness programs that promote physical, emotional, and mental well-being.
              </p>
            </motion.div>
            <motion.div {...slideRight} viewport={{ once: true }} className="relative">
              <img src="/carousel/carousel2.webp" alt="Caregiver assisting senior" className="rounded-xl shadow-2xl w-full" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Specialized Memory Care */}
      <motion.section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div {...slideLeft} viewport={{ once: true }} className="order-2 lg:order-1">
              <img src="/carousel/carousel1.webp" alt="Memory care specialist with senior" className="rounded-xl shadow-2xl w-full" />
            </motion.div>
            <motion.div {...slideRight} viewport={{ once: true }} className="order-1 lg:order-2">
              <h2 className="text-5xl md:text-7xl text-[#376082] font-extrabold mb-6" style={{ fontFamily: "Chathura" }}>Specialized Memory Care</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our specialized approach to cognitive and memory care includes tailored activities designed to promote brain fitness, foster emotional connections, and establish daily structure helping individuals with mild cognitive impairment and early-stage dementia maintain their quality of life at home.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Caregivers */}
      <motion.section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div {...slideLeft} viewport={{ once: true }}>
              <h2 className="text-5xl md:text-7xl text-[#376082] font-extrabold mb-6" style={{ fontFamily: "Chathura" }}>Our Caregivers</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                As an employer, Seva Home Care recognizes the vital link between caregiver satisfaction and client outcomes. We take pride in hiring dedicated professionals and providing competitive benefits and training programs.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team members are not just caregivers; they are trusted companions and advocates who make a meaningful difference in the lives of those we serve.
              </p>
            </motion.div>
            <motion.div {...slideRight} viewport={{ once: true }} className="relative">
              <img src="/carousel/carousel3.webp" alt="Professional caregivers" className="rounded-xl shadow-2xl w-full" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What We Do */}
      <motion.section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl md:text-7xl text-[#376082] font-extrabold text-center mb-16"
            style={{ fontFamily: "Chathura" }}
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
          >
            What we do
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#376082] mb-6" style={{ fontFamily: "Macha" }}>
                  {service.category}
                </h3>
                <ul className="space-y-3">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-lg text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ */}
      <FAQ />

      {/* Call to Action */}
      <motion.section className="py-6 text-white">
        <div className="container bg-[#5D8FB1] mx-auto p-12 text-center rounded-lg">
          <motion.h2 
            className="md:text-3xl text-2xl font-light mb-8"
            style={{ fontFamily: "Macha" }}
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.4 : 0.6 }}
          >
            Learn more about creating a custom care plan for your loved one.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.2 }}
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
         <ScrollToTopArrow />
    </>
  );
};

export default About;
