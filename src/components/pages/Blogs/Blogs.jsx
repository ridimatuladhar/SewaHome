import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Facebook, Instagram, Youtube, Menu, Link, Clock } from 'lucide-react';
import FooterButtons from '../../home/FooterButtons';
import Navbar from '../../layouts/Navbar';
import NewsletterSection from './NewsLetterSection';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [sortBy, setSortBy] = useState('Relevance');
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    window.location.href = `/blogs/${blogId}`;
  };

  const blogPosts = [
    {
      id: 1,
      category: "Care Experts and Insights",
      title: "A Guide to Paying for Home Care: Breaking down Long-Term Care Insurance, VA Benefits, Medicaid Waivers, and Private Pay.",
      date: "12th May, 2025",
      readTime: "5 min read",
      image: "/carousel/carousel2.png",
      featured: true
    },
    {
      id: 2,
      category: "Care Experts and Insights",
      title: "A Guide to Paying for Home Care: Breaking down Long-Term Care Insurance, VA Benefits, Medicaid Waivers, and Private Pay.",
      date: "12th May, 2025",
      readTime: "5 min read",
      image: "/carousel/carousel3.png"
    },
    {
      id: 3,
      category: "Care Experts and Insights",
      title: "A Guide to Paying for Home Care: Breaking down Long-Term Care Insurance, VA Benefits, Medicaid Waivers, and Private Pay.",
      date: "12th May, 2025",
      readTime: "5 min read",
      image: "/carousel/carousel4.png"
    },
    {
      id: 4,
      category: "Care Experts and Insights",
      title: "A Guide to Paying for Home Care: Breaking down Long-Term Care Insurance, VA Benefits, Medicaid Waivers, and Private Pay.",
      date: "12th May, 2025",
      readTime: "5 min read",
      image: "/carousel/carousel5.jpg"
    }
  ];

  // Get the featured post
  const featuredPost = blogPosts.find(post => post.featured);

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
            className="max-w-6xl mx-auto px-6 py-8"
            onClick={() => handleBlogClick(featuredPost.id)}
          >
            <motion.div
              whileHover="hover"
              variants={cardHoverVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
            >
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-4 mr-2">
                    {featuredPost.category}
                  </div>
                  <div className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm mb-4">
                    Featured
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#376082] mb-4 " style={{ fontFamily: 'Macha' }}>
                    {featuredPost.title}
                  </h2>
                  <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
                    <span>{featuredPost.date}</span>
                    <span>{featuredPost.readTime}</span>
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
                    src={featuredPost.image}
                    alt="Featured blog post"
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Sort By Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-6xl mx-auto px-6 py-4"
        >
          <div className="flex justify-end">
            <div className="relative">
              <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:border-blue-400 transition-colors">
                <span className="text-gray-700">Sort By: {sortBy}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-6 py-8"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => handleBlogClick(post.id)}
              >
                <motion.div variants={cardHoverVariants}>
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-3">
                      {post.category}
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 line-clamp-3" style={{ fontFamily: 'Macha' }}>
                      {post.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <span>{post.date}</span>
                      <span className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <NewsletterSection />

        <FooterButtons />
      </div>
    </>
  );
};

export default Blogs;