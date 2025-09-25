import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../layouts/Navbar';
import FooterButtons from '../../home/FooterButtons';
import { 
  ClipboardList, 
  UserCheck, 
  Target,
  MapPin,
  Heart,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  User,
  MessageSquare
} from 'lucide-react';

const Consultation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

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

  const services = [
    "Comprehensive Home Care Solutions",
    "Experienced Care Managers Oversight",
    "Complete Geriatric Support",
    "Nursing Visits & Health Monitoring",
    "Transitional Assistance",
    "Mobility and Independence",
    "Technology-Enabled Peace of Mind",
    "Flexible Care Plans"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Benefits Section */}
      <section className="py-16 mt-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-6"
              style={{ fontFamily: "Chathura" }}
            >
              Why Schedule a Consultation?
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto"
            >
              Our consultations are designed to understand your specific situation and provide tailored solutions.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Personalized Assessment",
                  description: "We evaluate individual needs to create a customized care plan.",
                  icon: <ClipboardList className="w-12 h-12 mx-auto text-[#376082]" />
                },
                {
                  title: "Expert Guidance",
                  description: "Get advice from experienced care professionals.",
                  icon: <UserCheck className="w-12 h-12 mx-auto text-[#376082]" />
                },
                {
                  title: "No Obligation",
                  description: "Our consultations are completely free with no commitment required.",
                  icon: <Target className="w-12 h-12 mx-auto text-[#376082]" />
                },
                {
                  title: "Local Resources",
                  description: "Learn about Massachusetts-specific programs and benefits.",
                  icon: <MapPin className="w-12 h-12 mx-auto text-[#376082]" />
                },
                {
                  title: "Care Options",
                  description: "Understand all available services and what might work best.",
                  icon: <Heart className="w-12 h-12 mx-auto text-[#376082]" />
                },
                {
                  title: "Financial Guidance",
                  description: "Get information about payment options and insurance coverage.",
                  icon: <DollarSign className="w-12 h-12 mx-auto text-[#376082]" />
                }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="bg-blue-50 rounded-lg p-6 text-center shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-[#376082] mb-2">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Consultation Form Section */}
      <section id="consultation-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-6xl font-bold text-[#376082] mb-2 text-center"
              style={{ fontFamily: "Chathura" }}
            >
              Schedule Your Free Consultation
            </motion.h2>
            <motion.p 
              variants={fadeIn}
              className="text-lg text-gray-700 mb-10 text-center"
            >
              Fill out the form below and we'll contact you within 24 hours to schedule your consultation.
            </motion.p>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 text-green-800 p-4 rounded-md text-center"
                >
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  <p>We've received your information and will contact you shortly to schedule your consultation.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
                      Service of Interest
                    </label>
                    <div className="relative">
                      <ClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      How Can We Help? *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#376082] text-white font-semibold py-3 px-4 rounded-md shadow-md hover:bg-blue-900 transition-colors flex items-center justify-center"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Request Consultation
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <FooterButtons />
    </div>
  );
};

export default Consultation;