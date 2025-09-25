import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Tag,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Link,
    ChevronRight,
    Heart,
    MessageCircle,
    BookOpen,
    Mail,
    Check,
    Send
} from 'lucide-react';
import NewsletterSection from './NewsLetterSection';
import FooterButtons from '../../home/FooterButtons';
import Navbar from '../../layouts/Navbar';

const BlogDetail = ({ blogId = "home-care-guide" }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(24);
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Mock blog data - in real app, fetch based on blogId
    const blogPost = {
        id: "home-care-guide",
        title: "A Guide to Paying for Home Care: Breaking down Long-Term Care Insurance, VA Benefits, Medicaid Waivers, and Private Pay",
        category: "Care Experts and Insights",
        author: "Dr. Sarah Johnson",
        publishDate: "May 12, 2025",
        readTime: "8 min read",
        featuredImage: "/carousel/carousel2.png",
        excerpt: "Understanding the financial aspects of home care can be overwhelming. This comprehensive guide breaks down your options for funding quality care.",
        content: `
      <p>When it comes to securing quality home care for yourself or a loved one, understanding your payment options is crucial. The financial landscape of home care can seem complex, but with the right information, you can make informed decisions that ensure both quality care and financial peace of mind.</p>

      <h2>Understanding Long-Term Care Insurance</h2>
      <p>Long-term care insurance is designed specifically to cover services that help with daily activities when chronic illness, disability, or cognitive impairment makes it difficult to care for yourself. This type of insurance can be a valuable asset in planning for home care needs.</p>

      <h3>What Long-Term Care Insurance Covers</h3>
      <ul>
        <li>Personal care services (bathing, dressing, mobility assistance)</li>
        <li>Homemaker services (meal preparation, light housekeeping)</li>
        <li>Skilled nursing care in the home</li>
        <li>Adult day care services</li>
        <li>Equipment and home modifications</li>
      </ul>

      <p>Most policies have a waiting period (elimination period) before benefits begin, typically ranging from 30 to 365 days. During this time, you'll pay out-of-pocket for care services.</p>

      <h2>VA Benefits for Veterans</h2>
      <p>Veterans and their spouses may be eligible for several VA programs that can help cover the cost of home care. These benefits can significantly reduce the financial burden of long-term care.</p>

      <h3>Aid and Attendance Benefit</h3>
      <p>This enhanced pension benefit is available to wartime veterans and surviving spouses who need assistance with daily activities. The benefit can help pay for home care services, adult day care, or assisted living.</p>

      <h3>VA Home and Community-Based Services</h3>
      <p>These programs provide alternatives to nursing home care, including:</p>
      <ul>
        <li>Adult day health care</li>
        <li>Home-based primary care</li>
        <li>Homemaker and home health aide services</li>
        <li>Respite care for family caregivers</li>
      </ul>

      <h2>Medicaid Waivers: A Pathway to Home Care</h2>
      <p>Medicaid waivers, also known as Home and Community-Based Services (HCBS) waivers, allow states to provide long-term care services in home and community settings rather than institutional care.</p>

      <h3>Eligibility Requirements</h3>
      <p>To qualify for Medicaid waiver services, individuals typically must:</p>
      <ul>
        <li>Meet financial eligibility requirements</li>
        <li>Require a nursing home level of care</li>
        <li>Be able to live safely in the community with services</li>
        <li>Meet any additional state-specific criteria</li>
      </ul>

      <h2>Private Pay Options</h2>
      <p>Many families choose to pay privately for home care services. While this requires more upfront financial planning, it offers maximum flexibility in choosing care providers and services.</p>

      <h3>Creating a Care Budget</h3>
      <p>When planning for private pay home care, consider:</p>
      <ul>
        <li>Current and projected care needs</li>
        <li>Local rates for different types of care services</li>
        <li>Potential for care needs to increase over time</li>
        <li>Family resources and support systems</li>
      </ul>

      <h2>Making the Right Choice for Your Family</h2>
      <p>The best payment option for home care depends on your unique circumstances, including financial resources, care needs, and personal preferences. Many families use a combination of funding sources to create a comprehensive care plan.</p>

      <p>Consider working with a care coordinator or elder law attorney who can help you navigate the various options and create a sustainable funding strategy for your home care needs.</p>

      <h2>Planning Ahead</h2>
      <p>The key to successful home care planning is to start early. Whether you're considering long-term care insurance, exploring VA benefits, or planning for private pay, having a clear understanding of your options will help ensure you receive the quality care you deserve.</p>

      <p>Remember, investing in quality home care is an investment in independence, dignity, and quality of life. With proper planning and the right funding strategy, home care can be both accessible and sustainable for your family.</p>
    `,
        tags: ["Home Care", "Insurance", "VA Benefits", "Medicaid", "Elder Care", "Healthcare Planning"]
    };


    const relatedPosts = [
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
    ];

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setIsSubscribed(true);

            setTimeout(() => {
                setEmail("");
                setIsSubscribed(false);
            }, 3000);
        }, 1500);
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = blogPost.title;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                // You could show a toast notification here
                break;
        }
    };

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
            transition: { duration: 0.5 }
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 mt-12 md:mt-24">

                {/* Article Header */}
                <motion.article
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto px-6"
                >
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-4">
                            {blogPost.category}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-[#376082] mb-6 leading-tight" style={{ fontFamily: 'Macha' }}>
                            {blogPost.title}
                        </h1>

                        <p className="text-xl text-gray-600 mb-8">
                            {blogPost.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
                            <div className="flex items-center space-x-2">
                                <User size={16} />
                                <span>{blogPost.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar size={16} />
                                <span>{blogPost.publishDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock size={16} />
                                <span>{blogPost.readTime}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <img
                            src={blogPost.featuredImage}
                            alt={blogPost.title}
                            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                        />
                    </motion.div>

                    {/* Article Content */}
                    <motion.div variants={itemVariants} className="prose prose-lg max-w-none mb-12">
                        <div
                            dangerouslySetInnerHTML={{ __html: blogPost.content }}
                            className="text-gray-800 leading-relaxed"
                        />
                    </motion.div>

                    {/* Tags */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="flex items-center space-x-2 mb-4">
                            <Tag size={20} className="text-gray-500" />
                            <span className="font-semibold text-gray-700">Tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {blogPost.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Social Actions */}
                    <motion.div variants={itemVariants} className="border-t border-b border-gray-200 py-6 mb-12">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleLike}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                                    <span>{likes}</span>
                                </motion.button>

                                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                                    <MessageCircle size={20} />
                                    <span>12</span>
                                </div>
                            </div>

                          
                        </div>
                    </motion.div>



                    {/* Related Posts */}
                    <motion.section variants={itemVariants} className="mb-16">
                        <div className="flex items-center space-x-3 mb-8">
                            <BookOpen className="text-[#376082]" size={24} />
                            <h3 className="text-2xl font-bold text-[#376082]">Related Articles</h3>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center text-gray-500 text-sm space-x-4">
                                            <span>{post.date}</span>
                                            <span className="flex items-center space-x-1">
                                                <Clock size={14} />
                                                <span>{post.readTime}</span>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Newsletter Section */}
                    <NewsletterSection />
                </motion.article>
            </div>
            <FooterButtons />
        </>
    );
};

export default BlogDetail;