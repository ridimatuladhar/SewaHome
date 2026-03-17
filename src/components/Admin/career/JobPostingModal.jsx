import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const JobPostingModal = ({ show, onClose, position, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    description: '',
    salary_range: '',
    requirements: [''],
    benefits: [''],
    is_active: true
  });
  const [submitting, setSubmitting] = useState(false);

  const API_BASE = 'https://api.sewacareservices.com/career';
  //const API_BASE = 'http://localhost/SewaHome/Backend/career';

  // Job type options
  const jobTypes = [
    'Full-Time',
    'Part-Time',
    'Contract',
    'Temporary',
    'Internship',
    'Remote'
  ];

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      type: '',
      description: '',
      salary_range: '',
      requirements: [''],
      benefits: [''],
      is_active: true
    });
  };

  // Initialize form when modal opens or position changes
  useEffect(() => {
    if (show) {
      if (position) {
        setFormData({
          title: position.title || '',
          location: position.location || '',
          type: position.type || '',
          description: position.description || '',
          salary_range: position.salary_range || '',
          requirements: position.requirements && position.requirements.length > 0 
            ? position.requirements 
            : [''],
          benefits: position.benefits && position.benefits.length > 0 
            ? position.benefits 
            : [''],
          is_active: position.is_active !== undefined ? position.is_active : true
        });
      } else {
        resetForm();
      }
    }
  }, [show, position]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle array field changes (requirements, benefits)
  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // Add new item to array field
  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  // Remove item from array field
  const removeArrayField = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.type || !formData.description) {
      onError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      // Filter out empty strings from arrays
      const requirementsData = formData.requirements.filter(req => req.trim() !== '');
      const benefitsData = formData.benefits.filter(benefit => benefit.trim() !== '');

      const dataToSend = {
        title: formData.title.trim(),
        location: formData.location.trim(),
        type: formData.type,
        description: formData.description.trim(),
        salary_range: formData.salary_range.trim(),
        requirements: requirementsData,
        benefits: benefitsData,
        is_active: formData.is_active
      };

      // Add ID for updates
      if (position) {
        dataToSend.id = position.id;
      }

      const url = position 
        ? `${API_BASE}/update_position.php`
        : `${API_BASE}/add_position.php`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(position ? 'Job position updated successfully' : 'Job position added successfully');
      } else {
        onError(result.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      onError('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#376082]" >
              {position ? 'Edit Job Position' : 'Add Job Position'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              disabled={submitting}
            >
              <X size={24} />
            </button>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" >
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                  placeholder="e.g., Certified Nursing Assistant"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" >
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                  placeholder="e.g., Boston, MA"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" >
                  Job Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  disabled={submitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                >
                  <option value="">Select job type</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" >
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                  placeholder="e.g., $18 - $25 per hour"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" >
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
                disabled={submitting}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                placeholder="Describe the role, responsibilities, and what makes this position unique..."
              />
            </div>

            {/* Requirements */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700" >
                  Requirements
                </label>
                <button
                  type="button"
                  onClick={() => addArrayField('requirements')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50 flex items-center space-x-1"
                  disabled={submitting}
                >
                  <Plus size={16} />
                  <span>Add Requirement</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={requirement}
                      onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                      disabled={submitting}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                      placeholder="e.g., Valid CNA certification"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('requirements', index)}
                        className="px-4 py-3 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                        disabled={submitting}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700" >
                  Benefits
                </label>
                <button
                  type="button"
                  onClick={() => addArrayField('benefits')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50 flex items-center space-x-1"
                  disabled={submitting}
                >
                  <Plus size={16} />
                  <span>Add Benefit</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayFieldChange('benefits', index, e.target.value)}
                      disabled={submitting}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors disabled:opacity-50"
                      placeholder="e.g., Health insurance"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField('benefits', index)}
                        className="px-4 py-3 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                        disabled={submitting}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                disabled={submitting}
                className="w-4 h-4 text-[#376082] border-gray-300 rounded focus:ring-[#376082]"
                id="is_active"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700" >
                Active (to make the post visible on the careers page)
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors rounded-xl disabled:opacity-50"
                
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#376082] hover:bg-blue-800 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2 disabled:cursor-not-allowed"
                
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{position ? 'Update' : 'Add'} Position</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostingModal;