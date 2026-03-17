import React, { useState } from 'react';
import { FaStar, FaSpinner, FaCheckCircle, FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LeaveReview = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ text: 'Please select a valid image file', type: 'error' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ text: 'Image size should be less than 5MB', type: 'error' });
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.comment.trim()) {
      setMessage({ text: 'Please fill in all required fields', type: 'error' });
      return;
    }

    if (formData.comment.trim().length < 10) {
      setMessage({ text: 'Review must be at least 10 characters long', type: 'error' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return;
    }

    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const confirmSubmission = async () => {
    setShowConfirmation(false);
    setSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name.trim());
      submitData.append('email', formData.email.trim());
      submitData.append('comment', formData.comment.trim());
      submitData.append('is_admin', '0'); // Client submission
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      const response = await fetch('https://api.sewacareservices.com/testimonials/add_testimonials.php', {
      //const response = await fetch('http://localhost/SewaHome/Backend/testimonials/add_testimonials.php', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ 
          text: 'Thank you for your review! It will be visible after approval.', 
          type: 'success' 
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          comment: '',
          image: null
        });
        setImagePreview(null);
        
        // Redirect after success
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setMessage({ 
          text: result.message || 'Failed to submit review. Please try again.', 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ 
        text: 'Network error. Please check your connection and try again.', 
        type: 'error' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const cancelSubmission = () => {
    setShowConfirmation(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      comment: '',
      image: null
    });
    setImagePreview(null);
    setMessage({ text: '', type: '' });
    setShowConfirmation(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Message Component
  const MessageAlert = () => {
    if (!message.text) return null;

    const alertStyles = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    return (
      <motion.div
        key={message.text}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg border ${alertStyles[message.type]} mb-6 flex items-start space-x-3`}
      >
        {message.type === 'success' ? (
          <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
        ) : (
          <FaExclamationCircle className="text-red-500 mt-0.5 flex-shrink-0" />
        )}
        <p className="text-sm flex-1">{message.text}</p>
      </motion.div>
    );
  };

  // Confirmation Dialog Component
  const ConfirmationDialog = () => {
    if (!showConfirmation) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
        >
          <div className="text-center">
            <FaExclamationCircle className="mx-auto text-yellow-500 text-4xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirm Submission
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit your review? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelSubmission}
                disabled={submitting}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmission}
                disabled={submitting}
                className="px-4 py-2 bg-[#376082] text-white rounded-lg font-medium hover:bg-[#2a4a6a] transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Yes, Submit'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-[#376082] hover:text-[#2a4a6a] mb-6 transition-colors duration-200"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Experience
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We value your feedback and appreciate you taking the time to share your experience with SEWA Home Care.
            Your review helps us improve our services and assist others in making informed decisions.
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#376082] to-[#4a7ca5] p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Write a Review</h2>
              <p className="text-blue-100 text-lg">Tell us about your experience</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <MessageAlert />

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#376082] focus:border-transparent transition-all duration-200 text-black text-lg"
                    placeholder="Enter your full name"
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#376082] focus:border-transparent transition-all duration-200 text-black text-lg"
                    placeholder="your@email.com"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Review *
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#376082] focus:border-transparent transition-all duration-200 resize-none text-black text-lg"
                  placeholder="Share your detailed experience with our service. What did you like? How can we improve?"
                  required
                  disabled={submitting}
                />
                <p className={`text-sm mt-2 ${
                  formData.comment.length < 10 ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {formData.comment.length}/10 characters (minimum 10 required)
                </p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Upload Photo (Optional)
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-colors disabled:opacity-50"
                    disabled={submitting}
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">Image Preview:</p>
                      <div className="flex items-center gap-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, image: null }));
                            setImagePreview(null);
                          }}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                          disabled={submitting}
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={submitting || formData.comment.trim().length < 10}
                  className="flex items-center justify-center gap-3 bg-[#376082] hover:bg-[#2a4a6a] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Submitting Review...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Submit Your Review
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={submitting}
                  className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 flex-1"
                >
                  Clear Form
                </button>
              </div>
            </form>

            {/* Privacy Note */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <FaExclamationCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Important Information</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• All reviews are subject to approval before being published</li>
                    <li>• We respect your privacy and will never share your email address</li>
                    <li>• Reviews typically appear within 24-48 hours after approval</li>
                    <li>• For any issues with your submission, please contact us directly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog />
    </div>
  );
};

export default LeaveReview;