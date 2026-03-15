import FooterButtons from "../footer/FooterButtons";
import Navbar from "../../layouts/Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CheckCircle, AlertCircle, Loader, X, Mail, User, MessageSquare, Phone } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      contact: value || ""
    });

    // Basic validation - check if phone number has at least 8 digits
    const digitsOnly = (value || "").replace(/\D/g, "");
    setPhoneValid(digitsOnly.length >= 8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    const digitsOnly = formData.contact.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      setErrorMessage("Please enter a valid phone number with at least 8 digits");
      setShowError(true);
      return;
    }

    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    setIsSubmitting(true);
    setShowConfirmation(false);
    setShowError(false);

    try {
      const response = await fetch('https://stf.org.np/Backend/contact/save_contact.php', {
      //const response = await fetch('http://localhost/SewaHome/Backend/contact/save_contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          contact: formData.contact // Includes country code
        })
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', contact: '', message: '' });
        // Auto-hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setErrorMessage(result.message || "Failed to send message. Please try again.");
        setShowError(true);
        // Auto-hide error message after 5 seconds
        setTimeout(() => setShowError(false), 5000);
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection and try again.");
      setShowError(true);
      // Auto-hide error message after 5 seconds
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmation(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <motion.div
        className="relative mt-24 pb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.h2
            className="text-6xl md:text-7xl font-bold text-[#3A5674] mb-6"
            style={{ fontFamily: 'Chathura' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </motion.div>

      {/* Success Message - Fixed positioning */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
          >
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start gap-3 shadow-lg">
              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Message Sent Successfully!</p>
                <p className="text-sm">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message - Fixed positioning */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
          >
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3 shadow-lg">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Something Went Wrong</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Confirm Submission</h3>
                <button
                  onClick={cancelSubmit}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Are you sure you want to send your message? We'll contact you at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> {formData.contact}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={cancelSubmit}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="flex-1 px-4 py-2 bg-[#3A5674] text-white rounded-lg hover:bg-[#2f5473] transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Yes, Send Message
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <motion.div
        className="py-16 bg-gradient-to-b from-blue-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left Side - Image & Info */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="relative group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute -inset-4 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
                <img
                  src="/contactimg/contact.png"
                  alt="Contact Us"
                  className="relative rounded-2xl w-full max-w-lg mx-auto shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
                />
              </motion.div>

            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Outfit' }}>
                  Send us a Message
                </h3>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Name Field */}
                <motion.div className="relative" variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A5674] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div className="relative" variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A5674] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </motion.div>

                {/* Contact Field with International Phone Input */}
                <motion.div className="relative" variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                    <div
                      className={`rounded-lg transition-all duration-300 ${!phoneValid && formData.contact
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-white"
                        } focus-within:ring-2 focus-within:ring-[#3A5674] focus-within:border-transparent`}
                    >
                      <PhoneInput
                        international
                        defaultCountry="US"
                        value={formData.contact}
                        onChange={handlePhoneChange}
                        placeholder="Enter your phone number"
                        className="w-full pl-10 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0"
                        inputclassname="w-full px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                  {!phoneValid && formData.contact && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <span>Please enter a valid phone number with at least 8 digits</span>
                    </motion.p>
                  )}
                </motion.div>

                {/* Message Field */}
                <motion.div className="relative" variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A5674] focus:border-transparent transition-all resize-vertical"
                      required
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !phoneValid}
                  className="w-full bg-gradient-to-r from-[#3A5674] to-[#2f5473] text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover={!isSubmitting && phoneValid ? "hover" : {}}
                  whileTap="tap"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-center text-sm text-gray-500">
                  By submitting this form, you agree to our Privacy Policy and consent to be contacted by SEWA Home Care.
                </p>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <FooterButtons />
    </>
  );
};

export default ContactForm;