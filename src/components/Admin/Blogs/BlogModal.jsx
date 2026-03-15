import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Upload, Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Heading } from 'lucide-react';

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (editorRef.current) {
      // Only set content on initial mount or when value changes externally
      if (isInitialMount.current || value !== editorRef.current.innerHTML) {
        editorRef.current.innerHTML = value;
      }
    }
    isInitialMount.current = false;
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertHeading = (level) => {
    executeCommand('formatBlock', `h${level}`);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => insertHeading(2)}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Heading 2"
        >
          <Heading size={18} />
        </button>
        <button
          type="button"
          onClick={() => insertHeading(3)}
          className="p-2 hover:bg-gray-200 rounded transition text-sm font-bold"
          title="Heading 3"
        >
          H3
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded transition text-sm font-bold"
          title="Numbered List"
        >
          1-2-3
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button
          type="button"
          onClick={() => executeCommand('justifyLeft')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyCenter')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyRight')}
          className="p-2 hover:bg-gray-200 rounded transition"
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none"
        style={{ lineHeight: '1.6' }}
      />
    </div>
  );
};

const BlogModal = ({ blog, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category_id: '',
    author: 'Admin',
    read_time: '5 min read',
    is_published: false,
    is_featured: false,
    tags: []
  });
  const [categories, setCategories] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Form validation
  const validateForm = () => {
    if (!formData.title.trim()) {
      alert('Title is required');
      return false;
    }
    if (!formData.excerpt.trim()) {
      alert('Short description is required');
      return false;
    }
    if (!formData.category_id) {
      alert('Category is required');
      return false;
    }
    if (!formData.content.trim() || formData.content === '<br>' || formData.content === '<div><br></div>') {
      alert('Content is required');
      return false;
    }
    return true;
  };

  useEffect(() => {
    let isMounted = true;
    
    const initializeData = async () => {
      await fetchCategories(isMounted);
      
      if (blog && isMounted) {
        setFormData({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          content: blog.content || '',
          category_id: blog.category_id || '',
          author: blog.author || 'Admin',
          read_time: blog.read_time || '5 min read',
          is_published: Boolean(blog.is_published),
          is_featured: Boolean(blog.is_featured),
          tags: blog.tags || []
        });
        if (blog.featured_image) {
         const imagePath = `https://stf.org.np/Backend${blog.featured_image}`;
         // const imagePath = `http://localhost/SewaHome/Backend${blog.featured_image}`;
          setImagePreview(imagePath);
          setExistingImage(blog.featured_image);
        }
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [blog]);

  const fetchCategories = async (isMounted = true) => {
    setCategoriesLoading(true);
    try {
     const res = await fetch('https://stf.org.np/Backend/Blog/get_categories.php');
      //const res = await fetch('http://localhost/SewaHome/Backend/Blog/get_categories.php');
      const data = await res.json();
      if (data.success && isMounted) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      if (isMounted) {
        setCategoriesLoading(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File too large. Maximum size is 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
        setImagePreview(reader.result);
        setExistingImage(null); // Clear existing image when new one is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value === '' ? null : parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      category_id: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      // Generate slug from title
      const slug = generateSlug(formData.title);
      
      // Prepare submit data
      const submitData = {
        title: formData.title,
        slug: slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category_id: formData.category_id,
        author: formData.author,
        read_time: formData.read_time,
        is_published: formData.is_published ? 1 : 0,
        is_featured: formData.is_featured ? 1 : 0,
        tags: formData.tags 
      };

      // Handle image properly
      if (featuredImage && featuredImage.startsWith('data:image')) {
        // New base64 image
        submitData.featured_image = featuredImage;
      } else if (existingImage && !featuredImage) {
        // Keep existing image when editing without changing
        submitData.featured_image = existingImage;
      }
      // If featuredImage is null and no existingImage, no image will be set

      const url = blog 
        ? 'https://stf.org.np/Backend/Blog/update_blog.php'
        : 'https://stf.org.np/Backend/Blog/create_blog.php';
        // ? 'http://localhost/SewaHome/Backend/Blog/update_blog.php'
        // : 'http://localhost/SewaHome/Backend/Blog/create_blog.php';

      if (blog) {
        submitData.id = blog.id;
      }

      console.log('Submitting blog data:', { 
        ...submitData, 
        content_length: submitData.content.length,
        has_image: !!(submitData.featured_image),
        tags_string: submitData.tags
      });

      const res = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      // Check if response is OK first
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Parse the response
      const responseText = await res.text();
      console.log('Raw response:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        throw new Error('Invalid response from server');
      }

      console.log('Parsed response:', data);

      if (data.success) {
        alert(`Blog ${blog ? 'updated' : 'created'} successfully`);
        onSave();
      } else {
        alert(data.message || `Failed to ${blog ? 'update' : 'create'} blog`);
      }
    } catch (err) {
      console.error('Error saving blog:', err);
      alert('Error saving blog: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImage(null);
    setImagePreview(null);
    setExistingImage(null);
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" style={{ overflowY: 'auto' }}>
      <div className="bg-white rounded-lg max-w-5xl w-full my-8 max-h-[95vh] flex flex-col">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-lg z-10">
          <h2 className="text-2xl font-bold text-[#376082]">
            {blog ? 'Edit Blog' : 'Create New Blog'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Short description *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Enter a brief description of the blog"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category_id || ''}
                  onChange={handleCategoryChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={categoriesLoading}
                >
                  <option value="">Select a category</option>
                  {categoriesLoading ? (
                    <option disabled>Loading categories...</option>
                  ) : (
                    categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
                {categories.length === 0 && !categoriesLoading && (
                  <p className="text-sm text-gray-500 mt-1">
                    No categories found. Please add categories first.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Admin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Read Time</label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, read_time: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                    className="mr-2 w-4 h-4"
                  />
                  <label htmlFor="is_published" className="text-sm font-medium">
                    Published
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="mr-2 w-4 h-4"
                  />
                  <label htmlFor="is_featured" className="text-sm font-medium">
                    Featured
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer">
                      <Upload size={48} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 font-medium">Click to upload image</span>
                      <span className="text-xs text-gray-400 mt-1">JPEG, PNG, GIF, WebP (Max 5MB)</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) => setFormData(prev => ({ ...prev, content }))}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2 pt-4 border-t sticky bottom-0 bg-white pb-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#376082] text-white py-3 rounded-lg hover:bg-blue-900 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {blog ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {blog ? 'Update Blog' : 'Create Blog'}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;