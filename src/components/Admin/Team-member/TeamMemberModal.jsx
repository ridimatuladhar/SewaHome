import React, { useState, useEffect } from 'react';
import { X, Image, Upload, Plus, Trash2 } from 'lucide-react';

const TeamMemberModal = ({ show, onClose, member, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    shortDescription: '',
    bio: '',
    experience: [''],
    credentials: ['']
  });
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const formatArrayField = (field) => {
    if (!field) return [''];
    if (Array.isArray(field)) {
      const filtered = field.filter(item => {
        if (typeof item === 'string' && item.trim()) return true;
        if (typeof item === 'object' && (item.title || item.company)) return true;
        return false;
      });
      return filtered.length > 0 ? filtered : [''];
    }
    return [''];
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      phone: '',
      shortDescription: '',
      bio: '',
      experience: [''],
      credentials: ['']
    });
    setImagePreview('');
    setImageBase64('');
  };

  useEffect(() => {
    if (show) {
      if (member) {
        setFormData({
          name: member.name || '',
          role: member.role || '',
          phone: member.phone || '',
          shortDescription: member.shortDescription || '',
          bio: member.bio || '',
          experience: formatArrayField(member.experience),
          credentials: formatArrayField(member.credentials)
        });
        if (member.image) {
         const imageUrl = member.image.startsWith('http')
    ? member.image
    : `https://api.sewacareservices.com${member.image}`;
            //: `http://localhost/SewaHome/Backend/team${member.image}`;
          setImagePreview(imageUrl);
        } else {
          setImagePreview('');
        }
        setImageBase64('');
      } else {
        resetForm();
      }
    }
  }, [show, member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayField = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        onError('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        onError('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setImageBase64(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setImageBase64('');
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.role) {
      onError('Name and role are required');
      return;
    }

    setSubmitting(true);

    try {
      const experienceData = formData.experience
        .filter(exp => {
          if (typeof exp === 'string') {
            try {
              const parsed = JSON.parse(exp);
              return parsed.title && parsed.company;
            } catch {
              return exp.trim() !== '';
            }
          }
          return exp && (exp.title || exp.company);
        })
        .map(exp => {
          if (typeof exp === 'string') {
            try { return JSON.parse(exp); }
            catch { return { title: exp, company: '', duration: '' }; }
          }
          return exp;
        });

      const credentialsData = formData.credentials.filter(cred => cred.trim() !== '');

      const dataToSend = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        phone: formData.phone.trim(),
        shortDescription: formData.shortDescription.trim(),
        bio: formData.bio.trim(),
        experience: experienceData,
        credentials: credentialsData,
        image: imageBase64 || null
      };

      if (member) {
        dataToSend.member_id = member.member_id || member.id;
      }

      const url = member
        ? `https://api.sewacareservices.com/team/update_team_member.php`
        : `https://api.sewacareservices.com/team/add_team_member.php`;
        // ? `http://localhost/SewaHome/Backend/team/update_team_member.php`
        // : `http://localhost/SewaHome/Backend/team/add_team_member.php`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(member ? 'Team member updated successfully' : 'Team member added successfully');
        onClose();
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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {member ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={submitting}
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
              <div className="flex items-center space-x-4">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                      disabled={submitting}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                    <Image size={32} />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    disabled={submitting}
                  />
                  <label
                    htmlFor="image-upload"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer inline-flex items-center space-x-2 transition-colors"
                  >
                    <Upload size={16} />
                    <span>Upload Image</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">JPEG, PNG, GIF, WebP. Max 5MB.</p>
                </div>
              </div>
            </div>

            {/* Name and Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  placeholder="Enter role"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={submitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                placeholder="e.g., +1 9800000000"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                rows={2}
                disabled={submitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                placeholder="Brief description shown in listings"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                disabled={submitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                placeholder="Detailed biography"
              />
            </div>

            {/* Experience */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <button
                  type="button"
                  onClick={() => addArrayField('experience')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50 flex items-center space-x-1"
                  disabled={submitting}
                >
                  <Plus size={16} />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.experience.map((exp, index) => {
                  let experienceData = { title: '', company: '', duration: '' };

                  if (typeof exp === 'string' && exp.trim() !== '') {
                    try {
                      const parsed = JSON.parse(exp);
                      if (parsed && typeof parsed === 'object') {
                        experienceData = { title: parsed.title || '', company: parsed.company || '', duration: parsed.duration || '' };
                      }
                    } catch {
                      experienceData.title = exp;
                    }
                  } else if (typeof exp === 'object') {
                    experienceData = { title: exp.title || '', company: exp.company || '', duration: exp.duration || '' };
                  }

                  return (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-700">Experience #{index + 1}</span>
                        {formData.experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayField('experience', index)}
                            className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50 p-1"
                            disabled={submitting}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Job Title *</label>
                          <input
                            type="text"
                            value={experienceData.title}
                            onChange={(e) => {
                              const newExp = { ...experienceData, title: e.target.value };
                              handleArrayFieldChange('experience', index, JSON.stringify(newExp));
                            }}
                            disabled={submitting}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                            placeholder="e.g., Senior Developer"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Company *</label>
                          <input
                            type="text"
                            value={experienceData.company}
                            onChange={(e) => {
                              const newExp = { ...experienceData, company: e.target.value };
                              handleArrayFieldChange('experience', index, JSON.stringify(newExp));
                            }}
                            disabled={submitting}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                            placeholder="e.g., Google Inc."
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                          <input
                            type="text"
                            value={experienceData.duration}
                            onChange={(e) => {
                              const newExp = { ...experienceData, duration: e.target.value };
                              handleArrayFieldChange('experience', index, JSON.stringify(newExp));
                            }}
                            disabled={submitting}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                            placeholder="e.g., 3 years, 2018-2021"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Credentials */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Credentials</label>
                <button
                  type="button"
                  onClick={() => addArrayField('credentials')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50"
                  disabled={submitting}
                >
                  Add Credential
                </button>
              </div>
              {formData.credentials.map((cred, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={cred}
                    onChange={(e) => handleArrayFieldChange('credentials', index, e.target.value)}
                    disabled={submitting}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                    placeholder="e.g., Certified Professional"
                  />
                  {formData.credentials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('credentials', index)}
                      className="px-3 py-2 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                      disabled={submitting}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-[#376082] hover:bg-blue-800 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{member ? 'Update' : 'Add'} Team Member</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;