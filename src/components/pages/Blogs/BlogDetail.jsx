import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Tag,
  Heart,
  MessageCircle,
  BookOpen,
  Loader,
  ArrowLeft
} from 'lucide-react';
import NewsletterSection from './NewsLetterSection';
import FooterButtons from '../footer/FooterButtons';
import Navbar from '../../layouts/Navbar';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchBlogDetail();
    }
  }, [slug]);

  useEffect(() => {
    if (blog) {
      fetchRelatedBlogs();
    }
  }, [blog]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      
      const isNumeric = /^\d+$/.test(slug);
      const url = isNumeric 
        ? `https://stf.org.np/Backend/Blog/get_blog_id.php?id=${slug}`
        : `https://stf.org.np/Backend/Blog/get_blog_id.php?slug=${slug}`;
      
        // ? `http://localhost/SewaHome/Backend/Blog/get_blog_id.php?id=${slug}`
        // : `http://localhost/SewaHome/Backend/Blog/get_blog_id.php?slug=${slug}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.blog) {
        setBlog(data.blog);
        setLikes(data.blog.likes || 0);
      } else {
        throw new Error(data.message || 'Blog not found');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
     const response = await fetch('https://stf.org.np/Backend/Blog/get_blogs.php?admin=false');
     // const response = await fetch('http://localhost/SewaHome/Backend/Blog/get_blogs.php?admin=false');
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          const related = data.blogs
            .filter(b => b.id !== blog?.id && b.slug !== blog?.slug)
            .slice(0, 3);
          
          setRelatedBlogs(related);
        }
      }
    } catch (err) {
      console.error('Error fetching related blogs:', err);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBack = () => {
    navigate('/blogs');
  };

  const handleRelatedClick = (post) => {
    navigate(`/blogs/${post.slug || post.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return `https://stf.org.np/Backend${imagePath}`;
   //return `http://localhost/SewaHome/Backend${imagePath}`;
  };

  const getTags = () => {
    if (!blog?.tags) return [];
    if (Array.isArray(blog.tags)) return blog.tags;
    
    if (typeof blog.tags === 'string') {
      try {
        const parsed = JSON.parse(blog.tags);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    
    return [];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-gray-50 mt-12 md:mt-24 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader className="animate-spin h-12 w-12 text-[#376082]" />
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="bg-gray-50 mt-12 md:mt-24 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <p className="text-red-600 text-lg mb-4">
              {error || 'Blog post not found'}
            </p>
            <button 
              onClick={handleBack}
              className="bg-[#376082] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <ArrowLeft size={20} />
              <span>Back to Blogs</span>
            </button>
          </div>
        </div>
      </>
    );
  }

  const tags = getTags();

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 mt-12 md:mt-24">
        {/* Back Button */}
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button 
            onClick={handleBack}
            className="flex items-center space-x-2 text-[#376082] hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Blogs</span>
          </button>
        </div>

        {/* Article Content */}
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-6 pb-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-4">
              {blog.category || "Uncategorized"}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#376082] mb-6 leading-tight" style={{ fontFamily: 'Macha' }}>
              {blog.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              {blog.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{blog.author || 'Admin'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{blog.read_time}</span>
              </div>
            </div>
          </motion.div>

         {/* Featured Image */}
{blog.featured_image && (
  <motion.div variants={itemVariants} className="mb-8">
    <img
      src={getImageUrl(blog.featured_image)}
      alt={blog.title}
      className="w-full h-64 md:h-120 object-contain rounded-xl shadow-lg bg-gray-100"
    />
  </motion.div>
)}

          {/* Content */}
          <motion.div variants={itemVariants} className="prose prose-lg max-w-none mb-12">
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="text-gray-800 leading-relaxed"
              style={{
                lineHeight: '1.8'
              }}
            />
          </motion.div>

          {/* Tags */}
          {tags.length > 0 && (
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Tag size={20} className="text-gray-500" />
                <span className="font-semibold text-gray-700">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <motion.section variants={itemVariants} className="mb-16">
              <div className="flex items-center space-x-3 mb-8">
                <BookOpen className="text-[#376082]" size={24} />
                <h3 className="text-2xl font-bold text-[#376082]">Related Articles</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                    onClick={() => handleRelatedClick(post)}
                  >
                    {post.featured_image && (
                      <div className="relative overflow-hidden">
                        <img
                          src={getImageUrl(post.featured_image)}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
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
                ))}
              </div>
            </motion.section>
          )}

          {/* Newsletter Section */}
          <NewsletterSection />
        </motion.article>
      </div>
      <FooterButtons />
    </>
  );
};

export default BlogDetail;