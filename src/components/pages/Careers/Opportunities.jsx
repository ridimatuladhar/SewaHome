import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import FooterButtons from "../footer/FooterButtons";
import { Briefcase, MapPin, Clock, X, Upload, Send, Loader, DollarSign, Calendar, User, CheckCircle, Check } from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Opportunities = () => {
  const [showModal, setShowModal] = useState(false);
  const [showJobDetailsModal, setShowJobDetailsModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
  });

  const API_BASE = 'https://api.sewacareservices.com';
 // const API_BASE = 'http://localhost/SewaHome/Backend';

  // Fetch job openings from backend
  const fetchJobOpenings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/career/get_positions.php`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Filter only active positions for frontend
        const activePositions = data.positions.filter(position => position.is_active);
        setJobOpenings(activePositions);
      } else {
        throw new Error(data.message || 'Failed to fetch job openings');
      }
    } catch (err) {
      console.error('Error fetching job openings:', err);
      setError(err.message);
      // Fallback to empty array
      setJobOpenings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const handleJobCardClick = (job) => {
    setSelectedJob(job);
    setShowJobDetailsModal(true);
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData(prev => ({
      ...prev,
      position: job.title
    }));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      resume: null,
    });
    setError(null);
  };

  const handleCloseJobDetailsModal = () => {
    setShowJobDetailsModal(false);
    setSelectedJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value || ""
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!validTypes.includes('.' + fileExtension)) {
        setError('Please upload a PDF, DOC, DOCX, or TXT file');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      setError(null); // Clear error if file is valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.resume) {
      setError('Please upload your resume');
      return;
    }

    // Show confirmation modal instead of submitting directly
    setShowConfirmationModal(true);
  };

  const handleConfirmSubmit = async () => {
    setSubmitting(true);
    setError(null);
    setShowConfirmationModal(false);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('firstName', formData.firstName.trim());
      submitData.append('lastName', formData.lastName.trim());
      submitData.append('email', formData.email.trim());
      submitData.append('phone', formData.phone);
      submitData.append('position', formData.position);
      submitData.append('experience', formData.experience);
      submitData.append('resume', formData.resume);

      // Send to backend
      const response = await fetch(`${API_BASE}/career/submit_application.php`, {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (result.success) {
        // Show thank you modal
        setShowThankYouModal(true);
        
        // Refresh job openings to update application counts
        fetchJobOpenings();
        handleCloseModal();
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setError(error.message || 'There was an error submitting your application. Please try again.');
      setShowModal(true); // Reopen application modal to show error
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="bg-[#f8fafc] mt-16 py-16 px-6 text-center">
          <h1
            className="text-5xl md:text-6xl font-extrabold text-[#376082] mb-4"
            style={{ fontFamily: "Chathura" }}
          >
            Current Job Opportunities
          </h1>
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <Loader className="animate-spin h-12 w-12 text-[#376082]" />
              <p className="text-gray-600" style={{ fontFamily: "Macha" }}>Loading job opportunities...</p>
            </div>
          </div>
        </div>
        <FooterButtons />
      </div>
    );
  }

  // Error state
  if (error && jobOpenings.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="bg-[#f8fafc] mt-16 py-16 px-6 text-center">
          <h1
            className="text-5xl md:text-6xl font-extrabold text-[#376082] mb-4"
            style={{ fontFamily: "Chathura" }}
          >
            Current Job Opportunities
          </h1>
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <p className="text-red-600 text-lg mb-4" style={{ fontFamily: "Macha" }}>
                Error loading job opportunities: {error}
              </p>
              <button
                onClick={fetchJobOpenings}
                className="bg-[#376082] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                style={{ fontFamily: "Lexend" }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <FooterButtons />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header Section */}
      <div className="bg-[#f8fafc] mt-16 py-16 px-6 text-center">
        <h1
          className="text-5xl md:text-6xl font-extrabold text-[#376082] mb-4"
          style={{ fontFamily: "Chathura" }}
        >
          Current Job Opportunities
        </h1>
        <p
          className="text-lg md:text-xl text-[#376082] max-w-2xl mx-auto"
          style={{ fontFamily: "Macha" }}
        >
          Join our compassionate home care team and make a meaningful impact in
          your community. Explore the openings below and find your next
          rewarding role.
        </p>
      </div>

      {/* Error Message */}
      {error && jobOpenings.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 mt-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
            <p style={{ fontFamily: "Macha" }}>{error}</p>
          </div>
        </div>
      )}

      {/* Job Listings */}
      <div className="flex-grow container mx-auto px-6 py-12 grid gap-8 max-w-5xl">
        {jobOpenings.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2" style={{ fontFamily: "Macha" }}>
              No Current Openings
            </h3>
            <p className="text-gray-600" style={{ fontFamily: "Macha" }}>
              We don't have any open positions at the moment. Please check back later!
            </p>
          </div>
        ) : (
          jobOpenings.map((job) => (
            <div
              key={job.id}
              onClick={() => handleJobCardClick(job)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <h2
                  className="text-xl md:text-2xl font-bold text-[#376082] group-hover:text-blue-700 transition-colors"
                  style={{ fontFamily: "Macha" }}
                >
                  {job.title}
                </h2>
                {job.salary_range && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full" style={{ fontFamily: "Macha" }}>
                    {job.salary_range}
                  </span>
                )}
              </div>

              <p
                className="text-[#376082] mb-6 leading-relaxed line-clamp-3"
                style={{ fontFamily: "Macha" }}
              >
                {job.description}
              </p>

              <div className="flex flex-wrap gap-6 text-[#376082] mb-6">
                <span className="flex items-center gap-2 text-sm md:text-base">
                  <MapPin className="w-5 h-5" /> {job.location}
                </span>
                <span className="flex items-center gap-2 text-sm md:text-base">
                  <Clock className="w-5 h-5" /> {job.type}
                </span>
                <span className="flex items-center gap-2 text-sm md:text-base">
                  <Briefcase className="w-5 h-5" /> Home Care Department
                </span>
              </div>

              {/* Requirements Preview */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#376082] mb-2" style={{ fontFamily: "Macha" }}>
                    Requirements:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="flex items-center" style={{ fontFamily: "Macha" }}>
                        <span className="w-1.5 h-1.5 bg-[#376082] rounded-full mr-2"></span>
                        {req}
                      </li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="text-gray-500" style={{ fontFamily: "Macha" }}>
                        +{job.requirements.length - 3} more requirements
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div className="flex justify-between items-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplyClick(job);
                  }}
                  className="bg-transparent hover:bg-[#376082] text-[#376082] hover:text-white font-semibold py-2 px-6 rounded-xl border-2 border-[#376082] transition-all duration-300 shadow-md hover:shadow-xl"
                  style={{ fontFamily: "Lexend" }}
                >
                  Apply Now
                </button>
                <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors" style={{ fontFamily: "Macha" }}>
                  Click to view details →
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Job Details Modal */}
      {showJobDetailsModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#376082] mb-2" style={{ fontFamily: "Macha" }}>
                    {selectedJob.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span style={{ fontFamily: "Macha" }}>{selectedJob.location}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span style={{ fontFamily: "Macha" }}>{selectedJob.type}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span style={{ fontFamily: "Macha" }}>Home Care Department</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCloseJobDetailsModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 ml-4"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Salary */}
              {selectedJob.salary_range && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-semibold text-blue-800" style={{ fontFamily: "Macha" }}>
                      {selectedJob.salary_range}
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Job Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-[#376082] mb-4" style={{ fontFamily: "Macha" }}>
                      Job Description
                    </h3>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{ fontFamily: "Macha" }}>
                        {selectedJob.description}
                      </p>
                    </div>
                  </div>

                  {/* Requirements */}
                  {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-[#376082] mb-4" style={{ fontFamily: "Macha" }}>
                        Requirements
                      </h3>
                      <ul className="space-y-3">
                        {selectedJob.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700" style={{ fontFamily: "Macha" }}>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-[#376082] mb-4" style={{ fontFamily: "Macha" }}>
                        Benefits & Perks
                      </h3>
                      <ul className="space-y-3">
                        {selectedJob.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700" style={{ fontFamily: "Macha" }}>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Sidebar - Quick Info & Apply Button */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "Macha" }}>
                      Quick Facts
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600" style={{ fontFamily: "Macha" }}>Location:</span>
                        <span className="font-medium" style={{ fontFamily: "Macha" }}>{selectedJob.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600" style={{ fontFamily: "Macha" }}>Job Type:</span>
                        <span className="font-medium" style={{ fontFamily: "Macha" }}>{selectedJob.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600" style={{ fontFamily: "Macha" }}>Department:</span>
                        <span className="font-medium" style={{ fontFamily: "Macha" }}>Home Care</span>
                      </div>
                      {selectedJob.salary_range && (
                        <div className="flex justify-between">
                          <span className="text-gray-600" style={{ fontFamily: "Macha" }}>Salary:</span>
                          <span className="font-medium text-green-600" style={{ fontFamily: "Macha" }}>{selectedJob.salary_range}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleCloseJobDetailsModal();
                      handleApplyClick(selectedJob);
                    }}
                    className="w-full bg-[#376082] hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    style={{ fontFamily: "Lexend" }}
                  >
                    <Send size={20} />
                    Apply for This Position
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-gray-500" style={{ fontFamily: "Macha" }}>
                      Applications are reviewed within 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#376082]" style={{ fontFamily: "Macha" }}>
                    Apply for Position
                  </h2>
                  <p className="text-gray-600" style={{ fontFamily: "Macha" }}>
                    {selectedJob?.title}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                  disabled={submitting}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Error Message in Modal */}
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                  <p style={{ fontFamily: "Macha" }}>{error}</p>
                </div>
              )}

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Macha" }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Macha" }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Macha" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Macha" }}>
                      Phone Number *
                    </label>
                    <div className="relative">
                      <PhoneInput
                        international
                        defaultCountry="NP"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter your phone number"
                        disabled={submitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-[#376082] focus-within:border-transparent transition-all disabled:opacity-50"
                        inputclassname="w-full px-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Macha" }}>
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                  >
                    <option value="">Select years of experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Macha" }}>
                    Resume *
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                      disabled={submitting}
                    />
                    <label
                      htmlFor="resume-upload"
                      className="bg-[#376082] hover:bg-blue-800 text-white px-6 py-3 rounded-xl cursor-pointer inline-flex items-center space-x-2 transition-colors disabled:opacity-50"
                    >
                      <Upload size={20} />
                      <span>{formData.resume ? 'Change Resume' : 'Upload Resume'}</span>
                    </label>
                    {formData.resume && (
                      <span className="text-sm text-gray-600" style={{ fontFamily: "Macha" }}>
                        {formData.resume.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2" style={{ fontFamily: "Macha" }}>
                    Accepted formats: PDF, DOC, DOCX, TXT. Max file size: 5MB.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={submitting}
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors rounded-xl disabled:opacity-50"
                    style={{ fontFamily: "Lexend" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#376082] hover:bg-blue-800 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2 disabled:cursor-not-allowed"
                    style={{ fontFamily: "Lexend" }}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "Macha" }}>
                  Submit Application?
                </h3>
                <p className="text-gray-600 mb-6" style={{ fontFamily: "Macha" }}>
                  Are you sure you want to submit your application for <strong>{formData.position}</strong>? Please review your information before submitting.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <h4 className="text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: "Macha" }}>Application Summary:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p style={{ fontFamily: "Macha" }}><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                    <p style={{ fontFamily: "Macha" }}><strong>Email:</strong> {formData.email}</p>
                    <p style={{ fontFamily: "Macha" }}><strong>Phone:</strong> {formData.phone}</p>
                    <p style={{ fontFamily: "Macha" }}><strong>Experience:</strong> {formData.experience}</p>
                    <p style={{ fontFamily: "Macha" }}><strong>Resume:</strong> {formData.resume?.name}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmationModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    style={{ fontFamily: "Lexend" }}
                    disabled={submitting}
                  >
                    Review Again
                  </button>
                  <button
                    onClick={handleConfirmSubmit}
                    className="flex-1 px-4 py-2 bg-[#376082] hover:bg-blue-800 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: "Lexend" }}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>Yes, Submit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ fontFamily: "Macha" }}>
                  Application Submitted!
                </h3>
                <p className="text-gray-600 mb-2" style={{ fontFamily: "Macha" }}>
                  Thank you for applying to the <strong>{formData.position}</strong> position.
                </p>
                <p className="text-gray-600 mb-6 text-sm" style={{ fontFamily: "Macha" }}>
                  We have received your application and will review it carefully. Our team will get back to you within 2-3 business days.
                </p>

                <div className="bg-green-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-700" style={{ fontFamily: "Macha" }}>
                    <strong>What's next?</strong> Keep an eye on your email for updates regarding your application status.
                  </p>
                </div>

                <button
                  onClick={handleCloseThankYouModal}
                  className="w-full px-4 py-2 bg-[#376082] hover:bg-blue-800 text-white rounded-xl transition-colors"
                  style={{ fontFamily: "Lexend" }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterButtons />
    </div>
  );
};

export default Opportunities;