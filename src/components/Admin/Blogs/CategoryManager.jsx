import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, CheckCircle, XCircle } from 'lucide-react';

const CategoryModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || ''
      });
    } else {
      setFormData({
        name: '',
        description: ''
      });
    }
    setError('');
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name.trim()) {
      setError('Category name is required');
      setLoading(false);
      return;
    }

    try {
      const url = category 
        ? 'https://sewacareservices.com/Backend/Blog/update_category.php'
        : 'https://sewacareservices.com/Backend/Blog/create_category.php';
        // ? 'http://localhost/SewaHome/Backend/Blog/update_category.php'
        // : 'http://localhost/SewaHome/Backend/Blog/create_category.php';

      const submitData = category 
        ? { ...formData, id: category.id }
        : formData;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      const data = await res.json();

      if (data.success) {
        onSave();
      } else {
        setError(data.message || `Failed to ${category ? 'update' : 'create'} category`);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#376081]">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <XCircle size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#376081] text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
            >
              {loading ? 'Saving...' : (category ? 'Update Category' : 'Create Category')}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
    //const res = await fetch('http://localhost/SewaHome/Backend/Blog/get_categories.php');
      const res = await fetch('https://sewacareservices.com/Backend/Blog/get_categories.php');
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.success) {
        setCategories(data.categories || []);
      } else {
        showAlert(data.message || 'Failed to fetch categories', 'error');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      showAlert('Error fetching categories: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const res = await fetch('https://sewacareservices.com/Backend/Blog/delete_category.php', {
     // const res = await fetch('http://localhost/SewaHome/Backend/Blog/delete_category.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const data = await res.json();

      if (data.success) {
        showAlert('Category deleted successfully', 'success');
        fetchCategories();
      } else {
        showAlert(data.message || 'Failed to delete category', 'error');
      }
    } catch (err) {
      showAlert('Error deleting category', 'error');
    }
  };

  const openEditModal = (category = null) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleModalSave = () => {
    setShowModal(false);
    setEditingCategory(null);
    fetchCategories();
    showAlert(`Category ${editingCategory ? 'updated' : 'created'} successfully`, 'success');
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#376082]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {alert && (
        <div className={`fixed top-4 right-4 z-50 border rounded-lg p-4 max-w-sm ${
          alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        } shadow-lg`}>
          <div className="flex items-center gap-3">
            {alert.type === 'success' ? 
              <CheckCircle className="w-5 h-5 text-green-600" /> :
              <XCircle className="w-5 h-5 text-red-600" />
            }
            <p className="text-sm font-medium">{alert.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
        <button
          onClick={() => openEditModal()}
          className="bg-[#376082] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#5D8FB1] transition"
        >
          <Plus size={20} /> Add New Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
          <div className="text-gray-400 mb-4">
            <Plus size={48} className="mx-auto" />
          </div>
          <p className="text-gray-600 text-lg">
            {searchTerm ? 'No categories found' : 'No categories yet'}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first category to get started'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              {category.description && (
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
              )}
              
              <div className="text-xs text-gray-500">
                <span>Slug: {category.slug}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Category Modal */}
      {showModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setShowModal(false);
            setEditingCategory(null);
          }}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default CategoryManager;