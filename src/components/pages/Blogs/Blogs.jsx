import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Clock, Loader } from 'lucide-react';
import FooterButtons from '../footer/FooterButtons';
import Navbar from '../../layouts/Navbar';
import NewsletterSection from './NewsLetterSection';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [sortBy, setSortBy] = useState('Relevance');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // Backend expects 'admin' parameter - false to show only published blogs
    const response = await fetch('https://api.sewacareservices.com/blog/get_blogs.php?admin=false');
    //  const response = await fetch('http://localhost/SewaHome/Backend/blog/get_blogs.php?admin=false');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        throw new Error(data.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (blog) => {
    // Use slug for SEO-friendly URLs (backend supports both slug and id)
    navigate(`/blogs/${blog.slug || blog.id}`);
  };

  // Get featured post (backend sets is_featured as boolean)
  const featuredPost = blogs.find(blog => blog.is_featured) || blogs[0];

  // Filter remaining blogs excluding the featured one
  const gridBlogs = blogs.filter(blog => blog !== featuredPost);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-gray-50 md:mt-16 mt-8 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader className="animate-spin h-12 w-12 text-[#376082]" />
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="bg-gray-50 md:mt-16 mt-8 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">Error loading blogs</p>
            <button 
              onClick={fetchBlogs}
              className="bg-[#376082] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 md:mt-16 mt-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white py-12"
        >
          <div className="max-w-6xl mx-auto text-center px-6">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold text-center mb-4 text-[#376082]"
              style={{ fontFamily: "Chathura" }}
            >
              Blogs
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Providing exceptional senior care with compassion, expertise, and dedication since our founding.
            </motion.p>
          </div>
        </motion.section>

        {/* Featured Blog Post */}
        {featuredPost && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-6xl mx-auto px-6 py-8 "
            onClick={() => handleBlogClick(featuredPost)}
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="bg-white  max-h-96 rounded-2xl shadow-lg overflow-hidden cursor-pointer "
            >
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-4 mr-2">
                    {featuredPost.category}
                  </div>
                  {featuredPost.is_featured && (
                    <div className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm mb-4">
                      Featured
                    </div>
                  )}
                  <h2 className="text-2xl md:text-3xl font-bold text-[#376082] mb-4" style={{ fontFamily: 'Macha' }}>
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
                    <span>{new Date(featuredPost.created_at).toLocaleDateString()}</span>
                    <span>{featuredPost.read_time}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#376082] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Read Now
                  </motion.button>
                </div>
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.featured_image 
                      ? `https://api.sewacareservices.com${featuredPost.featured_image}`
                     //? `http://localhost/SewaHome/Backend${featuredPost.featured_image}`
                      : "/carousel/carousel2.png"
                    }
                    alt={featuredPost.title}
                    className="w-full h-48 md:h-full object-cover"
                    
                  />
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}


        {/* Blog Grid */}
        {gridBlogs.length > 0 ? (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto px-6 py-8"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridBlogs.map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                  onClick={() => handleBlogClick(post)}
                >
                  <motion.div variants={cardHoverVariants}>
                    <div className="relative overflow-hidden">
                      <img
                        src={post.featured_image 
                          ? `https://api.sewacareservices.com${post.featured_image}`
                         // ? `http://localhost/SewaHome/Backend${post.featured_image}`
                          : "/carousel/carousel2.png"
                        }
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "/carousel/carousel2.png";
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-3">
                        {post.category}
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4 line-clamp-3" style={{ fontFamily: 'Macha' }}>
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm space-x-4">
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        <span className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{post.read_time}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : (
          !loading && blogs.length <= 1 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto px-6 py-12 text-center"
            >
              <div className="bg-white rounded-xl shadow-lg p-12">
                <p className="text-gray-600 text-lg">No blog posts available yet.</p>
                <p className="text-gray-500 mt-2">Check back later for new content.</p>
              </div>
            </motion.section>
          )
        )}

        {/* Newsletter Section */}
        <NewsletterSection />

        <FooterButtons />
      </div>
    </>
  );
};

export default Blogs;