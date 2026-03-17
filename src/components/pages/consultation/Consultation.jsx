import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Navbar from '../../layouts/Navbar';
import FooterButtons from '../footer/FooterButtons';
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
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader,
  X
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

  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingServices, setLoadingServices] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  // Fetch services for dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
      const response = await fetch('https://api.sewacareservices.com/consultation/get_services_dropdown.php');
        //const response = await fetch('http://localhost/SewaHome/Backend/consultation/get_services_dropdown.php');

        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }

        const data = await response.json();

        if (data.success) {
          setServices(data.services);
        } else {
          setError('Failed to load services');
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Unable to load services. Please try again.');
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handlePhoneChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      phone: value || ''
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone) {
      setError('Phone number is required');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Please tell us how we can help you');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Show confirmation dialog instead of submitting immediately
    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    setLoading(true);
    setError('');
    setShowConfirmation(false);

    try {
      const response = await fetch('https://api.sewacareservices.com/consultation/submit_consult.php', {
     // const response = await fetch('http://localhost/SewaHome/Backend/consultation/submit_consult.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone // This will be in international format
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setError(data.message || 'Failed to submit consultation request');
      }
    } catch (err) {
      setError('Network error: Unable to submit request. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cancelSubmission = () => {
    setShowConfirmation(false);
  };

  const benefits = [
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
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Benefits Section */}
      <section className="py-16 mt-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
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
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all border border-blue-100 cursor-pointer group"
                >
                  <motion.div
                    className="mb-4 flex justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#376082] mb-3 group-hover:text-[#2a4a6a] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation-form" className="py-16 bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={slideIn}
              className="text-center mb-12"
            >
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-6xl font-bold text-[#376082] mb-4"
                style={{ fontFamily: "Chathura" }}
              >
                Schedule Your Free Consultation
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-gray-700 max-w-2xl mx-auto"
              >
                Fill out the form below to start.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">
                    We've received your information and will contact you soon to schedule your consultation.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmitted(false)}
                    className="bg-[#376082] text-white px-6 py-2 rounded-lg hover:bg-[#5D8FB1] transition-colors"
                  >
                    Submit Another Request
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent transition-all"
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent transition-all"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
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
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                        <PhoneInput
                          international
                          defaultCountry="NP"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="Enter your phone number"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#376082] focus-within:border-transparent transition-all"
                          inputclassname="w-full px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0"
                        />
                      </div>

                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-gray-700 font-semibold mb-2">
                      Service of Interest
                    </label>
                    <div className="relative">
                      <ClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      {loadingServices ? (
                        <div className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center">
                          <Loader className="w-4 h-4 animate-spin mr-2" />
                          <span className="text-gray-500">Loading services...</span>
                        </div>
                      ) : (
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent transition-all appearance-none bg-white"
                        >
                          <option value="">Select a service (optional)</option>
                          {services.map((service, index) => (
                            <option key={index} value={service.title}>{service.title}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
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
                        rows="5"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent transition-all resize-vertical"
                        placeholder="Please describe your situation and how we can assist you..."
                      ></textarea>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Tell us about your specific needs, concerns, or questions.
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#376082] to-[#5D8FB1] text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        Request Free Consultation
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-sm text-gray-500">
                    By submitting this form, you agree to our Privacy Policy and consent to be contacted by SEWA Home Care.
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#376082] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h3
              variants={fadeIn}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              Have Questions?
            </motion.h3>
            <motion.p
              variants={fadeIn}
              className="text-lg mb-6 max-w-2xl mx-auto text-blue-100"
            >
              Feel free to call us directly for immediate assistance.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="tel:9786777012"
                className="bg-white text-[#376082] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (978) 677-7012
              </a>
              <a
                href="mailto:california@sewahomecare.com"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#376082] transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FooterButtons />

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Submission</h3>
              <button
                onClick={cancelSubmission}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to submit your consultation request? We'll contact you at:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-sm">
                  <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {formData.email}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {formData.phone}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cancelSubmission}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmission}
                className="flex-1 px-4 py-2 bg-[#376082] text-white rounded-lg hover:bg-[#5D8FB1] transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Yes, Submit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Consultation;