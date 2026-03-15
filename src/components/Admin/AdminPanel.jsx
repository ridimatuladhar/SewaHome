import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Contacts from './Contacts/Contacts';
import AdminServices from './Service/AdminServices';
import AdminCarousel from './Homepage/Carousel';
import FAQAdmin from './AboutUs/FAQAdmin';
import AdminBlogs from './Blogs/AdminBlogs';
import CategoryManager from './Blogs/CategoryManager';
import Consult from './Consultation/Consult';
import Testimonials from './Testimonials/Testimonials';
import Dashboard from './Dashboard';
import NewsLetter from './newsletter/NewsLetter';
import AllAdmins from './Settings/AllAdmins';
import ChangePassword from './Settings/ChangePassword';
import TeamAdmin from './Team-member/TeamAdmin';
import CareerAdmin from './career/CareerAdmin';
import ApplicationsAdmin from './career/ApplicationsAdmin';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  // Handle responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

;


  

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'contact':
        return <Contacts />;

      case 'consultation-requests':
        return <Consult />

      case 'newsletter':
        return <NewsLetter />

      case 'testimonials':
        return <Testimonials />

      case 'add-service':
        return <AdminServices />

      case 'carousel':
        return <AdminCarousel />

      case 'faqs':
        return <FAQAdmin />

      case 'add-blog':
        return <AdminBlogs />

      case 'blog-categories':
        return <CategoryManager />

      case 'team-members':
       return <TeamAdmin />

      case 'add-career':
       return <CareerAdmin />

      case 'applications':
       return <ApplicationsAdmin />

      case 'all-admins':
       return <AllAdmins />

       case 'change-password':
       return <ChangePassword />


      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-sm p-4 lg:p-6 border border-gray-200"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize mb-4">
              {activeTab.replace('-', ' ')} Management
            </h2>
            <p className="text-gray-600">Content for {activeTab.replace('-', ' ')} section will be implemented here.</p>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between p-3 lg:p-4">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <h2 className="text-lg lg:text-xl font-semibold text-[#376082] capitalize truncate">
                {activeTab === 'dashboard' ? 'Senior Care Dashboard' : activeTab.replace('-', ' ')}
              </h2>
            </div>

           
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-3 lg:p-6">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>
      
    </div>
  );
};

export default AdminPanel;