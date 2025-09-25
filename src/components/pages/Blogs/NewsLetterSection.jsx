import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Check, Send } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 3000);
    }, 1500);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="container bg-[#5D8FB1] mx-auto mb-8 p-8 md:p-12 text-center rounded-lg shadow-lg"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
        >
          <Mail className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:text-3xl text-2xl font-light md:mb-6 mb-4 text-white" 
          style={{ fontFamily: "Macha" }}
        >
          Stay Updated with Our Latest Insights
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Subscribe to our newsletter and be the first to receive expert care tips, 
          industry updates, and our latest blog posts directly to your inbox.
        </motion.p>

        {isSubscribed ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg inline-flex flex-col items-center"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white text-xl font-medium mb-2">Thank You for Subscribing!</h3>
            <p className="text-white/80">We've sent a confirmation email to your inbox.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-md mx-auto"
          >
            <div className="relative flex-grow text-white">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 pr-10 rounded-lg  border border-white focus:ring-2 focus:ring-white/30 focus:outline-none transition-all"
                required
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="bg-white text-[#5D8FB1] px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed min-w-[140px]"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 rounded-full border-2 border-[#5D8FB1] border-t-transparent"
                  />
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Subscribe</span>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
       
      </div>
    </motion.section>
  );
};

export default NewsletterSection;