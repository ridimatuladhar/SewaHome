import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, 
  Eye, EyeOff, MoveUp, MoveDown, CheckCircle, XCircle, AlertCircle, 
  EyeClosed
} from 'lucide-react';

// Base API Configuration - Update these values as needed
const API_CONFIG = {
  BASE_URL: 'https://api.sewacareservices.com',
  //BASE_URL: 'http://localhost/SewaHome/Backend',
  ENDPOINTS: {
    GET_CAROUSEL: '/carousel/get_carousel.php',
    UPLOAD_CAROUSEL: '/carousel/upload_carousel.php',
    UPDATE_CAROUSEL: '/carousel/update_carousel.php',
    DELETE_CAROUSEL: '/carousel/delete_carousel.php',
    TOGGLE_ACTIVE: '/carousel/toggle_active.php',
    REORDER_CAROUSEL: '/carousel/reorder_carousel.php'
  }
};

// Helper function to build API URLs
const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
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
    <div className={`fixed top-4 right-4 z-50 border rounded-lg p-4 max-w-sm ${bgColor[type]} ${textColor[type]} shadow-lg`}>
      <div className="flex items-center gap-3">
        {icon[type]}
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

const AdminCarousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    alt_text: '',
    display_order: 0,
    is_active: 1,
    image_file: null
  });

  // Show alert notification
  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Calculate next available display order
  const getNextAvailableOrder = () => {
    if (images.length === 0) return 1;
    
    const usedOrders = images.map(img => img.display_order);
    const maxOrder = Math.max(...usedOrders);
    
    // Find the first available gap or use maxOrder + 1
    for (let i = 1; i <= maxOrder + 1; i++) {
      if (!usedOrders.includes(i)) {
        return i;
      }
    }
    return maxOrder + 1;
  };

  const fetchImages = async () => {
    try {
      const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_CAROUSEL));
      const data = await res.json();
      if (data.success) {
        setImages(data.images);
      } else {
        showAlert('Failed to fetch images', 'error');
      }
    } catch (err) {
      showAlert('Error fetching images', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        showAlert('Invalid file type. Please upload JPEG, PNG, GIF, or WebP', 'error');
        // Clear the invalid file input
        e.target.value = '';
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        showAlert('File too large. Maximum size is 5MB', 'error');
        // Clear the invalid file input
        e.target.value = '';
        return;
      }

      setFormData(prev => ({ ...prev, image_file: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditMode(false);
    setFormData({
      id: null,
      title: '',
      alt_text: '',
      display_order: getNextAvailableOrder(),
      is_active: 1,
      image_file: null
    });
    setPreviewImage(null);
    setShowModal(true);
  };

  const openEditModal = (image) => {
    setEditMode(true);
    setFormData({
      id: image.id,
      title: image.title || '',
      alt_text: image.alt_text || image.title || '',
      display_order: image.display_order,
      is_active: image.is_active ? 1 : 0,
      image_file: null
    });
    setPreviewImage(`${API_CONFIG.BASE_URL}${image.image_path}`);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!editMode && !formData.image_file) {
      showAlert('Please select an image to upload', 'error');
      return;
    }

    setUploading(true);

    try {
      const formDataToSend = new FormData();

      if (editMode) {
        formDataToSend.append('id', formData.id);
      }

      if (formData.image_file) {
        formDataToSend.append('carousel_image', formData.image_file);
      }

      formDataToSend.append('title', formData.title);
      formDataToSend.append('alt_text', formData.alt_text || formData.title);
      formDataToSend.append('display_order', formData.display_order);
      formDataToSend.append('is_active', formData.is_active);

      const url = editMode
        ? getApiUrl(API_CONFIG.ENDPOINTS.UPDATE_CAROUSEL)
        : getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD_CAROUSEL);

      const res = await fetch(url, {
        method: 'POST',
        body: formDataToSend
      });

      const data = await res.json();

      if (data.success) {
        showAlert(
          editMode ? 'Image updated successfully!' : 'Image uploaded successfully!', 
          'success'
        );
        setShowModal(false);
        fetchImages();
      } else {
        showAlert(data.message || 'Operation failed', 'error');
      }
    } catch (err) {
      showAlert('Error saving image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DELETE_CAROUSEL), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const data = await res.json();

      if (data.success) {
        showAlert('Image deleted successfully!', 'success');
        fetchImages();
      } else {
        showAlert(data.message || 'Failed to delete image', 'error');
      }
    } catch (err) {
      showAlert('Error deleting image', 'error');
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.TOGGLE_ACTIVE), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !currentStatus })
      });

      const data = await res.json();

      if (data.success) {
        showAlert(
          !currentStatus ? 'Image activated!' : 'Image deactivated!', 
          'success'
        );
        fetchImages();
      } else {
        showAlert(data.message || 'Failed to update status', 'error');
      }
    } catch (err) {
      showAlert('Error toggling status', 'error');
    }
  };

  const moveImage = async (id, direction) => {
    try {
      const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.REORDER_CAROUSEL), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, direction })
      });

      const data = await res.json();

      if (data.success) {
        showAlert(`Image moved ${direction}!`, 'success');
        fetchImages();
      } else {
        showAlert(data.message || 'Failed to reorder image', 'error');
      }
    } catch (err) {
      showAlert('Error reordering images', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#376082]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Alert Notification */}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={openAddModal}
          className="bg-[#376082] text-white px-4 py-2 rounded-lg flex gap-2 hover:bg-[#5D8FB1]"
        >
          <Plus size={20} /> Add Image
        </button>
      </div>

      {!loading && images.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">No carousel images yet</p>
          <button
            onClick={openAddModal}
            className="mt-4 bg-[#376082] text-white px-4 py-2 rounded-lg hover:bg-[#5D8FB1]"
          >
            Add your first image
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-[#376082]"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 bg-gray-100 flex-shrink-0">
                  <img
                    src={`${API_CONFIG.BASE_URL}${image.image_path}`}
                    alt={image.alt_text || image.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900">{image.title || 'Untitled'}</h3>
                      <p className="text-sm text-gray-600 mt-1">Alt Text: {image.alt_text || image.title || 'None'}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          Order: {image.display_order}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          image.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {image.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleActive(image.id, image.is_active)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title={image.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {image.is_active ? <Eye size={20} /> : <EyeClosed size={20} />}
                      </button>

                      {index > 0 && (
                        <button
                          onClick={() => moveImage(image.id, 'up')}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Move up"
                        >
                          <MoveUp size={20} />
                        </button>
                      )}

                      {index < images.length - 1 && (
                        <button
                          onClick={() => moveImage(image.id, 'down')}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Move down"
                        >
                          <MoveDown size={20} />
                        </button>
                      )}

                      <button
                        onClick={() => openEditModal(image)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                      >
                        <Edit size={20} />
                      </button>

                      <button
                        onClick={() => handleDelete(image.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#376082]">
                {editMode ? 'Edit Image' : 'Add New Image'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {editMode ? 'Change Image (optional)' : 'Upload Image *'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({ ...prev, image_file: null }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer">
                      <Upload size={48} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Click to upload image</span>
                      <span className="text-xs text-gray-400 mt-1">JPEG, PNG, GIF, WebP (Max 5MB)</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                        // Removed required attribute to fix the focusable error
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., Welcome to Sewa Home Care"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="is_active"
                    value={formData.is_active}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-[#376082] text-white py-2 rounded-lg hover:bg-[#5D8FB1] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      {editMode ? 'Updating...' : 'Uploading...'}
                    </>
                  ) : (
                    <>
                      <Save size={20} /> {editMode ? 'Update Image' : 'Save Image'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCarousel;