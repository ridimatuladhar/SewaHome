import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, CheckCircle, Clock, Phone, Mail, MapPin,
  Heart, Shield, Users, Activity, FileText, Home, Search, Car,
  Building, User, UserCheck, ArrowRightLeft, LifeBuoy,
  Stethoscope, Brain, HandHeart, Pill, Ambulance, Baby,
  BedDouble, Clipboard, ClipboardList, Dumbbell,
  Ear, Eye, FlaskConical, HandMetal, Headphones,
  Hospital, Leaf, Microscope, Moon, RefreshCw,
  Smile, Syringe, Thermometer, Accessibility, Apple,
  BadgeAlert, Bike, BookOpen, Briefcase, CookingPot,
  HeartPulse, HelpingHand, Landmark, Lightbulb, Map,
  MessageCircle, PersonStanding, Ribbon, ShieldPlus, Sparkles,
  Star, Sun, Truck, Utensils, Wallet, 
} from 'lucide-react';
import Navbar from "../../layouts/Navbar";
import FooterButtons from "../footer/FooterButtons";
import ScrollToTopArrow from "../../home/ScrollToTopArrow";

const BASE_URL = 'https://sewacareservices.com';
//const BASE_URL = 'http://localhost/SewaHome';

// Full icon map — must match AdminServices exactly
const ICON_MAP = {
  Heart, Shield, Users, Activity, FileText, Home, Search, Car,
  Building, User, UserCheck, ArrowRightLeft, LifeBuoy,
  Stethoscope, HeartPulse, Syringe, Pill, Thermometer, Microscope,
  FlaskConical, Ambulance, Hospital, ShieldPlus, BadgeAlert,
  Clipboard, ClipboardList, HandHeart, HelpingHand, Brain,
  Accessibility,  PersonStanding, Baby, Ear, Eye,
  Smile, Ribbon, Apple, Leaf, Sun, Moon, Dumbbell, Bike,
  Utensils, CookingPot, Sparkles, Star, Phone, MessageCircle,
  Headphones, BookOpen, Briefcase, Lightbulb, Landmark, Wallet,
  Map, Truck, Clock, RefreshCw, BedDouble, HandMetal,
};

const getIcon = (name) => ICON_MAP[name] ?? Heart;

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service,    setService]    = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [activeTab,  setActiveTab]  = useState('overview');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  useEffect(() => {
    fetchServiceDetail();
  }, [serviceId]);

  const fetchServiceDetail = async () => {
    try {
      const res  = await fetch(`${BASE_URL}/Backend/service/get_service_id.php?service_id=${serviceId}`);
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server returned an unexpected response. Check get_service_id.php for errors.');
      }
      if (data.success) {
        setService(data.service);
      } else {
        setError(data.message || 'Service not found');
      }
    } catch (err) {
      setError(err.message || 'Network error: Unable to fetch service details');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };
  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };
  const slideInVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#376082]"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-medium">Error</p>
          <p className="text-sm mt-1">{error || 'Service not found'}</p>
          <p className="text-xs mt-2 text-red-500">
            service_id: <code className="bg-red-100 px-1 rounded">{serviceId}</code>
          </p>
        </div>
      </div>
    );
  }

  const IconComponent = getIcon(service.icon);

  const heroImageUrl = service.heroImage
    ? (service.heroImage.startsWith('http') ? service.heroImage : `${BASE_URL}${service.heroImage}`)
    : null;

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 overflow-hidden" style={{ fontFamily: "Macha" }}>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#376082] via-[#4A7BB7] to-[#6B9BD2] text-white py-12 md:py-20 md:mt-16 relative">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={slideInVariants}>
                <motion.div className="flex items-center gap-4 mb-6" variants={itemVariants}>
                  <motion.div
                    className="p-3 bg-white/20 rounded-lg backdrop-blur-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent size={40} className="text-white" />
                  </motion.div>
                  <div>
                    <span className="text-white/80 text-sm uppercase tracking-wide" style={{ fontFamily: "Outfit" }}>
                      SEWA Home Care Service
                    </span>
                  </div>
                </motion.div>

                <motion.h1
                  className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6"
                  style={{ fontFamily: "Chathura" }}
                  variants={itemVariants}
                >
                  {service.title}
                </motion.h1>

                <motion.p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed" variants={itemVariants}>
                  {service.hoverInfo}
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                  <motion.a
                    href="/consultation"
                    className="bg-white text-[#376082] px-6 py-3 md:px-8 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base inline-block text-center"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book a Consultation
                  </motion.a>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative mt-8 md:mt-0"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroImageUrl && (
                  <>
                    <motion.img
                      src={heroImageUrl}
                      alt={service.title}
                      className="rounded-2xl shadow-2xl w-full h-64 md:h-80 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section with Tabs */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs Navigation */}
            <motion.div
              className="flex justify-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="bg-white rounded-full p-1 md:p-2 shadow-lg border border-gray-200 flex flex-wrap justify-center">
                {['overview', 'features', 'benefits'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold capitalize transition-all text-sm md:text-base ${
                      activeTab === tab ? 'bg-[#376082] text-white shadow-md' : 'text-gray-600 hover:text-[#376082]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {activeTab === 'overview' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <h2 className="text-3xl md:text-6xl font-extrabold text-[#376082] mb-4 md:mb-6" style={{ fontFamily: "Chathura" }}>
                      Service Overview
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                      {service.detailedDescription}
                    </p>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white p-4 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h3 className="text-3xl md:text-6xl font-extrabold text-[#376082] mb-4 md:mb-6" style={{ fontFamily: "Chathura" }}>
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {service.keyFeatures && service.keyFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 md:p-4 rounded-lg hover:bg-gray-50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'benefits' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <h3 className="text-3xl md:text-6xl font-extrabold text-[#376082] mb-4 md:mb-6" style={{ fontFamily: "Chathura" }}>
                      Why Choose Our Service?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {service.benefits && service.benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 rounded-xl border border-blue-100"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#376082] rounded-lg flex items-center justify-center mb-3 md:mb-4">
                            <CheckCircle size={20} className="text-white" />
                          </div>
                          <h4 className="text-base md:text-lg font-semibold text-[#376082] mb-2">{benefit}</h4>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Sidebar */}
              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div
                  className="bg-gradient-to-br from-[#E8F4FD] to-[#F0F8FF] p-4 md:p-8 rounded-2xl shadow-lg border border-blue-100"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-[#376082] mb-4 md:mb-6">Quick Contact</h3>
                  <div>
                    <motion.div className="flex items-center gap-3 p-2 md:p-3 rounded-lg hover:bg-white/70 transition-colors" whileHover={{ x: 5 }}>
                      <Phone size={18} className="text-[#376082] flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-sm md:text-base">(978) 677-7012</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-3 p-2 md:p-3 rounded-lg hover:bg-white/70 transition-colors" whileHover={{ x: 5 }}>
                      <Mail size={18} className="text-[#376082] flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-sm md:text-base">California@sewahomecare.com</span>
                    </motion.div>
                    <motion.div className="flex items-center gap-3 p-2 md:p-3 rounded-lg hover:bg-white/70 transition-colors" whileHover={{ x: 5 }}>
                      <Mail size={18} className="text-[#376082] flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-sm md:text-base">headoffice@sewahomecare.com</span>
                    </motion.div>
                    <motion.div className="flex items-start gap-3 p-2 md:p-3 rounded-lg hover:bg-white/70 transition-colors" whileHover={{ x: 5 }}>
                      <MapPin size={18} className="text-[#376082] mt-0.5 flex-shrink-0" />
                      <div className="text-gray-700">
                        <div className="font-medium text-sm md:text-base">California & Massachusetts</div>
                        <div className="text-xs md:text-sm text-gray-500">Serving multiple locations</div>
                      </div>
                    </motion.div>
                  </div>
                  <motion.a
                    href="/consultation"
                    className="w-full mt-4 bg-gradient-to-r from-[#376082] to-[#4A7BB7] text-white px-6 py-3 md:px-8 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base inline-block text-center"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Free Consultation
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        {service.process && service.process.length > 0 && (
          <motion.section
            className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className="text-3xl md:text-6xl font-bold text-[#376082] text-center mb-8 md:mb-16"
                style={{ fontFamily: "Chathura" }}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Our Simple Process
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {service.process.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <motion.div
                      className="bg-white p-4 md:p-8 rounded-2xl shadow-xl border border-gray-100 h-full relative overflow-hidden"
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#376082] to-[#6B9BD2]"></div>
                      <motion.div
                        className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-[#376082] to-[#6B9BD2] text-white rounded-full flex items-center justify-center mb-4 md:mb-6 text-lg md:text-xl font-bold shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        {index + 1}
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-bold text-[#376082] mb-2 md:mb-4">{step.step}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{step.description}</p>
                    </motion.div>

                    {index < service.process.length - 1 && (
                      <motion.div
                        className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#376082] to-[#6B9BD2] transform -translate-y-1/2 z-10"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: (index * 0.2) + 0.5 }}
                        viewport={{ once: true, margin: "-50px" }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </div>
      <FooterButtons />
      <ScrollToTopArrow />
    </>
  );
};

export default ServiceDetail;