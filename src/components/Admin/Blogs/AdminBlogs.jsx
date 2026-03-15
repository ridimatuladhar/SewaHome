import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  CheckCircle,
  XCircle
} from 'lucide-react';
import BlogModal from './BlogModal';

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
    warning: <XCircle className="w-5 h-5 text-yellow-600" />,
    info: <XCircle className="w-5 h-5 text-blue-600" />
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
          <XCircle size={16} />
        </button>
      </div>
    </div>
  );
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
    //  const res = await fetch('http://localhost/SewaHome/Backend/Blog/get_blogs.php?admin=true');
      const res = await fetch('https://sewacareservices.com/Backend/Blog/get_blogs.php?admin=true');
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        showAlert('Failed to fetch blogs', 'error');
      }
    } catch (err) {
      showAlert('Error fetching blogs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
     // const res = await fetch('http://localhost/SewaHome/Backend/Blog/delete_blog.php', {
      const res = await fetch('https://sewacareservices.com/Backend/Blog/delete_blog.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const data = await res.json();

      if (data.success) {
        showAlert('Blog deleted successfully', 'success');
        fetchBlogs();
      } else {
        showAlert(data.message || 'Failed to delete blog', 'error');
      }
    } catch (err) {
      showAlert('Error deleting blog', 'error');
    }
  };

  const togglePublish = async (blog) => {
    try {
       //const res = await fetch('http://localhost/SewaHome/Backend/Blog/update_blog.php', {
      const res = await fetch('https://sewacareservices.com/Backend/Blog/update_blog.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blog,
          is_published: !blog.is_published
        })
      });

      const data = await res.json();

      if (data.success) {
        showAlert(`Blog ${!blog.is_published ? 'published' : 'unpublished'}`, 'success');
        fetchBlogs();
      } else {
        showAlert(data.message || 'Failed to update blog', 'error');
      }
    } catch (err) {
      showAlert('Error updating blog', 'error');
    }
  };

  const toggleFeatured = async (blog) => {
    try {
     // const res = await fetch('http://localhost/SewaHome/Backend/Blog/update_blog.php', {
     const res = await fetch('https://sewacareservices.com/Backend/Blog/update_blog.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blog,
          is_featured: !blog.is_featured
        })
      });

      const data = await res.json();

      if (data.success) {
        showAlert(`Blog ${!blog.is_featured ? 'featured' : 'unfeatured'}`, 'success');
        fetchBlogs();
      } else {
        showAlert(data.message || 'Failed to update blog', 'error');
      }
    } catch (err) {
      showAlert('Error updating blog', 'error');
    }
  };

  const openEditModal = (blog = null) => {
    setEditingBlog(blog);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#376082]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <button
          onClick={() => openEditModal()}
          className="bg-[#376082] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#5D8FB1]"
        >
          <Plus size={20} /> Add New Blog
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blogs by title, category, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
          <div className="text-gray-400 mb-4">
            <Edit size={48} className="mx-auto" />
          </div>
          <p className="text-gray-600 text-lg">No blogs found</p>
          <p className="text-gray-500 text-sm mt-2">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first blog post'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm border-l-4 border-[#376082] overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Blog Image */}
                <div className="md:w-48 h-full bg-gray-100 flex-shrink-0">
                  {blog.featured_image ? (
                    <img
                     // src={`http://localhost/SewaHome/Backend${blog.featured_image}`}
                     src={`https://sewacareservices.com/Backend${blog.featured_image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                {/* Blog Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                          {blog.category}
                        </span>
                        {blog.is_featured && (
                          <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                            <Star size={12} fill="currentColor" />
                            Featured
                          </span>
                        )}
                        {blog.is_published ? (
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                            <Eye size={12} />
                            Published
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                            <EyeOff size={12} />
                            Draft
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {blog.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{blog.read_time}</span>
                        </div>
                      </div>

                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {blog.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFeatured(blog)}
                        className={`p-2 rounded-lg transition-colors ${blog.is_featured
                            ? 'text-yellow-600 hover:bg-yellow-100'
                            : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        title={blog.is_featured ? 'Remove featured' : 'Mark as featured'}
                      >
                        <Star size={20} fill={blog.is_featured ? 'currentColor' : 'none'} />
                      </button>

                      <button
                        onClick={() => togglePublish(blog)}
                        className={`p-2 rounded-lg transition-colors ${blog.is_published
                            ? 'text-green-600 hover:bg-green-100'
                            : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        title={blog.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {blog.is_published ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>

                      <button
                        onClick={() => openEditModal(blog)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={20} />
                      </button>

                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Blog Modal */}
      {showModal && (
        <BlogModal
          blog={editingBlog}
          onClose={() => {
            setShowModal(false);
            setEditingBlog(null);
          }}
          onSave={() => {
            setShowModal(false);
            setEditingBlog(null);
            fetchBlogs();
          }}
        />
      )}
    </div>
  );
};

export default AdminBlogs;