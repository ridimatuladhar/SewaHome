import React, { useState, useEffect } from 'react';
import { FaTimes, FaSpinner, FaExclamationCircle, FaTrash, FaEdit, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Base API Configuration - Update these values as needed
const API_CONFIG = {
 BASE_URL: 'https://api.sewacareservices.com',
  //BASE_URL: 'http://localhost/SewaHome/Backend',
  ENDPOINTS: {
    GET_TESTIMONIALS: '/testimonials/get_testimonials.php',
    UPDATE_APPROVAL: '/testimonials/update_approval.php',
    DELETE_TESTIMONIALS: '/testimonials/delete_testimonials.php',
    ADD_TESTIMONIALS: '/testimonials/add_testimonials.php',
    EDIT_TESTIMONIALS: '/testimonials/edit_testimonials.php'
  },
  IMAGE_BASE_URL: 'https://api.sewacareservices.com/testimonials/'
 //IMAGE_BASE_URL: 'http://localhost/SewaHome/Backend/testimonials/'
};

// Helper function to build API URLs
const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Notification Component
const Notification = ({ message, type, onClose }) => {
  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  };

  const icon = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    info: <AlertCircle className="w-5 h-5 text-blue-600" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-[10000] border rounded-lg p-4 shadow-lg max-w-sm ${bgColor[type]} ${textColor[type]}`}
    >
      <div className="flex items-center gap-3">
        {icon[type]}
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Show alert function
  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000);
  };

  useEffect(() => { 
    fetchTestimonials(); 
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_TESTIMONIALS));
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.testimonials);
      } else {
        setError('Failed to fetch testimonials.');
        showAlert('Failed to fetch testimonials.', 'error');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while fetching testimonials.');
      showAlert('Network error: Failed to load testimonials.', 'error');
    }
    setLoading(false);
  };

  const handleApprovalChange = async (id, newValue) => {
    try {
      const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.UPDATE_APPROVAL), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_approved: newValue }),
      });
      const result = await res.json();
      if (result.success) {
        setTestimonials(prev => prev.map(t => (t.id === id ? { ...t, is_approved: newValue } : t)));
        showAlert(`Testimonial ${newValue === '1' ? 'approved' : 'unapproved'} successfully!`, 'success');
      } else {
        showAlert('Failed to update approval status.', 'error');
      }
    } catch (err) { 
      console.error('Update error:', err);
      showAlert('Network error: Failed to update approval status.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      showAlert('Deletion cancelled', 'info');
      return;
    }
    
    try {
      const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DELETE_TESTIMONIALS), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success) {
        setTestimonials(prev => prev.filter(t => t.id !== id));
        showAlert('Testimonial deleted successfully!', 'success');
      } else {
        showAlert(result.message || 'Failed to delete testimonial.', 'error');
      }
    } catch (err) {
      console.error('Delete error:', err);
      showAlert('Error deleting testimonial.', 'error');
    }
  };

  // Add Testimonial Modal Component
  const AddTestimonialModal = () => {
    const [form, setForm] = useState({ name: '', comment: '', imageFile: null, imagePreview: null });
    const [msg, setMsg] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = e => {
      const { name, value, files } = e.target;
      if (e.target.type === 'file') {
        const file = files[0];
        setForm(prev => ({ ...prev, imageFile: file, imagePreview: file ? URL.createObjectURL(file) : null }));
      } else setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
      e.preventDefault();
      setSubmitting(true);
      setMsg('');
      
      if (!form.name.trim() || !form.comment.trim()) {
        setMsg('Please fill in both name and comment fields');
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('comment', form.comment);
      formData.append('is_admin', '1');
      if (form.imageFile) formData.append('image', form.imageFile);

      try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ADD_TESTIMONIALS), {
          method: 'POST', 
          body: formData
        });
        const result = await response.json();
        if (result.success) {
          fetchTestimonials();
          setShowAddModal(false);
          setForm({ name: '', comment: '', imageFile: null, imagePreview: null });
          showAlert('Testimonial added successfully!', 'success');
        } else {
          setMsg(result.message || 'Submission failed.');
          showAlert(result.message || 'Failed to add testimonial.', 'error');
        }
      } catch (error) {
        setMsg('Network error. Please try again.');
        showAlert('Network error: Failed to add testimonial.', 'error');
        console.error('Submission error:', error);
      } finally { 
        setSubmitting(false); 
      }
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-xl relative">
          <button 
            onClick={() => setShowAddModal(false)} 
            className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-[#376082] flex items-center gap-2">
            <Plus size={24} />
            Add Testimonial
          </h2>
          {msg && <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{msg}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                required 
                placeholder="Enter name" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
              <textarea 
                name="comment" 
                value={form.comment} 
                onChange={handleChange} 
                rows="4" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                required 
                placeholder="Enter testimonial content" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={handleChange} 
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" 
              />
            </div>
            {form.imagePreview && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Preview</label>
                <img src={form.imagePreview} alt="Preview" className="h-32 object-cover rounded-lg" />
              </div>
            )}
            <div className="flex justify-end space-x-3 pt-2">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)} 
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" 
                disabled={submitting}
              >
                <X size={16} />
                Cancel
              </button>
              <button 
                type="submit" 
                className={`flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg transition-colors ${submitting ? 'bg-[#376082]' : 'bg-[#376082] hover:bg-blue-700'}`} 
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add Testimonial
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Edit Testimonial Modal Component
  const EditTestimonialModal = () => {
    const [form, setForm] = useState({ id: '', name: '', comment: '', imageFile: null, imagePreview: null });
    const [msg, setMsg] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
      if (editData) setForm({
        id: editData.id, 
        name: editData.name, 
        comment: editData.comment, 
        imageFile: null,
        imagePreview: editData.image ? `${API_CONFIG.IMAGE_BASE_URL}${editData.image}` : null
      });
    }, [editData]);

    const handleChange = e => {
      const { name, value, files } = e.target;
      if (e.target.type === 'file') {
        const file = files[0];
        setForm(prev => ({ ...prev, imageFile: file, imagePreview: file ? URL.createObjectURL(file) : null }));
      } else setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
      e.preventDefault();
      setMsg('');
      setSubmitting(true);
      
      if (!form.name.trim() || !form.comment.trim()) {
        setMsg('Please fill in both name and comment fields');
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('id', form.id);
      formData.append('name', form.name);
      formData.append('comment', form.comment);
      if (form.imageFile) formData.append('image', form.imageFile);

      try {
        const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.EDIT_TESTIMONIALS), { 
          method: 'POST', 
          body: formData 
        });
        const result = await res.json();
        if (result.success) {
          setShowEditModal(false);
          setEditData(null);
          fetchTestimonials();
          showAlert('Testimonial updated successfully!', 'success');
        } else {
          setMsg(result.message || 'Failed to update testimonial.');
          showAlert(result.message || 'Failed to update testimonial.', 'error');
        }
      } catch (error) { 
        console.error('Edit error:', error);
        showAlert('Network error: Failed to update testimonial.', 'error');
      }
      setSubmitting(false);
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-xl relative">
          <button 
            onClick={() => { setShowEditModal(false); setEditData(null); }} 
            className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-6 text-[#376082] flex items-center gap-2">
            <Edit2 size={24} />
            Edit Testimonial
          </h2>
          {msg && <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{msg}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input 
                type="text" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                required 
                placeholder="Enter your name" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
              <textarea 
                name="comment" 
                value={form.comment} 
                onChange={handleChange} 
                rows="2" 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                required 
                placeholder="Enter your feedback" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={handleChange} 
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" 
              />
            </div>
            {form.imagePreview && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Preview</label>
                <img src={form.imagePreview} alt="Preview" className="h-32 object-cover rounded-lg" />
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button 
                type="submit" 
                className={`flex items-center gap-2 flex-1 py-2 px-4 text-white font-semibold rounded-lg transition-colors ${submitting ? 'bg-green-600' : 'bg-green-600 hover:bg-green-700'}`} 
                disabled={submitting}
              >
                <Save size={16} />
                {submitting ? 'Updating...' : 'Update Testimonial'}
              </button>
              <button 
                type="button"
                onClick={() => { setShowEditModal(false); setEditData(null); }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Alert Display */}
      {alert.show && (
        <Notification 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert({ show: false, message: '', type: '' })}
        />
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Total Testimonials: <span className="font-semibold">{testimonials.length}</span>
              </div>
              <button 
                onClick={() => setShowAddModal(true)} 
                className="flex items-center gap-2 bg-[#376082] hover:bg-[#3a7dc4] text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus size={16} />
                Add Testimonial
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <div className="flex items-center">
                <FaExclamationCircle className="mr-2" />
                <p>{error}</p>
              </div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 text-center py-8">
              No testimonials found.
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Testimonial</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {testimonials.map(t => (
                      <motion.tr 
                        key={t.id} 
                        className="hover:bg-gray-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 lg:hidden">
                              {t.image ? (
                                <img src={API_CONFIG.IMAGE_BASE_URL + t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                              ) : (
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">No Image</span>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                              <div className="text-sm text-gray-600 mt-1 line-clamp-2">{t.comment}</div>
                              <div className="text-xs text-gray-500 mt-1 lg:hidden">{t.created_at}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          {t.image ? (
                            <img src={API_CONFIG.IMAGE_BASE_URL + t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                          ) : (
                            <span className="text-gray-400 text-sm">No Image</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell">
                          {t.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            className={`rounded-lg px-3 py-1 text-sm font-medium border transition-colors ${
                              t.is_approved === '1' || t.is_approved === 1 
                                ? 'text-green-700 bg-green-50 border-green-200' 
                                : 'text-red-700 bg-red-50 border-red-200'
                            }`} 
                            value={t.is_approved === 1 || t.is_approved === '1' ? '1' : '0'} 
                            onChange={e => handleApprovalChange(t.id, e.target.value)}
                          >
                            <option value="1">Approved</option>
                            <option value="0">Pending</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => { setEditData(t); setShowEditModal(true); }} 
                              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors" 
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(t.id)} 
                              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors" 
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {showAddModal && <AddTestimonialModal />}
      {showEditModal && <EditTestimonialModal />}
       {/* Quick Stats Footer */}
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                    Last updated: {new Date().toLocaleString()} • Total Testimonials: {testimonials.length}
                </p>
            </div>
    </div>
  );
};

export default Testimonials;