import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const FAQAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editData, setEditData] = useState({ question: '', answer: '' });
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

 // const API_BASE_URL = 'http://localhost/SewaHome/Backend/About';
 const API_BASE_URL = 'https://sewacareservices.com/Backend/About';
  

  // Show alert function
  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/get_faqs.php`);
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      showAlert('Error loading FAQs: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      showAlert('Please fill in both question and answer fields', 'warning');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/get_faqs.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFaq),
      });

      if (response.ok) {
        const result = await response.json();
        setNewFaq({ question: '', answer: '' });
        showAlert('FAQ created successfully!', 'success');
        fetchFAQs();
      } else {
        const errorData = await response.json();
        console.error('Error creating FAQ:', errorData.message);
        showAlert('Error creating FAQ: ' + (errorData.message || 'Unknown error'), 'error');
      }
    } catch (error) {
      console.error('Error creating FAQ:', error);
      showAlert('Network error: Failed to create FAQ', 'error');
    }
  };

  const handleUpdate = async (id) => {
    if (!editData.question.trim() || !editData.answer.trim()) {
      showAlert('Please fill in both question and answer fields', 'warning');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/get_faqs_id.php/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        setEditingId(null);
        showAlert('FAQ updated successfully!', 'success');
        fetchFAQs();
      } else {
        const errorData = await response.json();
        console.error('Error updating FAQ:', errorData.message);
        showAlert('Error updating FAQ: ' + (errorData.message || 'Unknown error'), 'error');
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
      showAlert('Network error: Failed to update FAQ', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) {
      showAlert('Deletion cancelled', 'info');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/get_faqs_id.php/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showAlert('FAQ deleted successfully!', 'success');
        fetchFAQs();
      } else {
        const errorData = await response.json();
        console.error('Error deleting FAQ:', errorData.message);
        showAlert('Error deleting FAQ: ' + (errorData.message || 'Unknown error'), 'error');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      showAlert('Network error: Failed to delete FAQ', 'error');
    }
  };

  const startEditing = (faq) => {
    setEditingId(faq.id);
    setEditData({ question: faq.question, answer: faq.answer });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({ question: '', answer: '' });
    showAlert('Editing cancelled', 'info');
  };

  // Alert component
  const Alert = ({ message, type, onClose }) => {
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
        className={`fixed top-4 right-4 z-50 border rounded-lg p-4 shadow-lg ${bgColor[type]} ${textColor[type]} max-w-sm`}
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

  if (loading) return <div className="p-8">Loading FAQs...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Alert Display */}
      {alert.show && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert({ show: false, message: '', type: '' })}
        />
      )}

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
         
            <div className="text-sm text-gray-500">
              Total FAQs: <span className="font-semibold">{faqs.length}</span>
            </div>
          </div>
          
          {/* Create New FAQ Form */}
          <form onSubmit={handleCreate} className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
             
              Add New FAQ
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter question..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter answer..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-[#376081] text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Plus size={16} />
                  Add FAQ
                </button>
                
              </div>
            </div>
          </form>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No FAQs found. Add your first FAQ above!</p>
              </div>
            ) : (
              faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {editingId === faq.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Edit2 size={16} />
                        <span className="text-sm font-medium">Editing FAQ</span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Question *
                        </label>
                        <input
                          type="text"
                          value={editData.question}
                          onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Answer *
                        </label>
                        <textarea
                          value={editData.answer}
                          onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(faq.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => startEditing(faq)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Edit FAQ"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                          title="Delete FAQ"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQAdmin;