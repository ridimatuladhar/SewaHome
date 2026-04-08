import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  X,
  ChevronDown,
  Settings,
  LogOut,
  Shield,
  Contact,
  GalleryHorizontalEnd,
  CircleQuestionMark,
  Handshake,
  Globe,
  HomeIcon,
  ScrollText,
  FolderOpen,
  MessageCircleWarningIcon,
  MessageSquare,
  Newspaper,
  User,
  Users2Icon,
  HandshakeIcon,
  ScrollIcon,
  Briefcase,
  LocateIcon
} from 'lucide-react';


const NavItem = ({ item, level = 0, activeTab, setActiveTab, setSidebarOpen, openDropdowns, toggleDropdown, expandedItems, toggleExpand }) => {
  const isDropdown = item.type === 'dropdown';
  const isExpandable = item.type === 'expandable';
  const isOpen = openDropdowns[item.id] || expandedItems[item.id];
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isActive = activeTab === item.id;

  return (
    <div className="mb-1">
      <button
        onClick={() => {
          if (isDropdown) {
            toggleDropdown(item.id);
          } else if (isExpandable) {
            toggleExpand(item.id);
          } else {
            setActiveTab(item.id);
            if (window.innerWidth < 768) setSidebarOpen(false);
          }
        }}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group ${
          isActive
            ? 'bg-[#4A7FA6] text-white shadow-md' 
            : 'text-gray-200 hover:bg-[#456E8C] hover:text-white'
        } ${level > 0 ? 'pl-8' : ''}`}
      >
        <div className="flex items-center space-x-3 min-w-0">
          <div className={`p-1 rounded-lg ${
            isActive 
              ? 'bg-white/20' 
              : 'bg-transparent group-hover:bg-white/10'
          }`}>
            <item.icon size={18} className="flex-shrink-0" />
          </div>
          <span className="font-medium text-sm text-left truncate">{item.label}</span>
        </div>
        
        {(isDropdown || isExpandable) && hasSubItems && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 ml-2"
          >
            <ChevronDown size={16} />
          </motion.div>
        )}
      </button>

      {/* Sub Items */}
      {(isDropdown || isExpandable) && hasSubItems && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-1 ml-2 space-y-1 border-l-2 border-[#456E8C] pl-3 py-1">
                {item.subItems.map((subItem) => {
                  const isSubItemActive = activeTab === subItem.id;
                  return (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        setActiveTab(subItem.id);
                        if (window.innerWidth < 768) setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                        isSubItemActive
                          ? 'bg-[#4A7FA6] text-white shadow-sm'
                          : 'text-gray-300 hover:bg-[#456E8C] hover:text-white'
                      }`}
                    >
                      <subItem.icon size={16} className="flex-shrink-0" />
                      <span className="truncate">{subItem.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');
  const { full_name = 'Admin User', email = 'admin@carevista.com', role = 'admin' } = adminData;

  const isSuperAdmin = role === 'super admin';

  const getInitial = () => {
    if (full_name && full_name.trim() !== '') {
      return full_name.charAt(0).toUpperCase();
    }
    return 'A';
  };

  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownId]: !prev[dropdownId]
    }));
  };

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const navigationSections = [
    {
      title: "Main content",
      items: [
        { 
          id: 'dashboard', 
          label: 'Dashboard', 
          icon: LayoutDashboard,
          type: 'simple'
        },
        { 
          id: 'home', 
          label: 'Home', 
          icon: HomeIcon,
          type: 'dropdown',
          subItems: [
            { id: 'carousel', label: 'Carousel', icon: GalleryHorizontalEnd },
            { id: 'team-members', label: 'Team Members', icon: Users2Icon },
          ]
        },
        { 
          id: 'about', 
          label: 'About', 
          icon: Globe,
          type: 'dropdown',
          subItems: [        
            { id: 'faqs', label: 'FAQs', icon: CircleQuestionMark }
          ]
        },
        { 
          id: 'services', 
          label: 'Services', 
          icon: Handshake,
          type: 'dropdown',
          subItems: [
            { id: 'add-service', label: 'Services List', icon: HandshakeIcon },
          ]
        },
        { 
          id: 'blog', 
          label: 'Blog', 
          icon: ScrollText,
          type: 'dropdown',
          subItems: [
            { id: 'add-blog', label: 'Blog List', icon: CircleQuestionMark },
            { id: 'blog-categories', label: 'Blog Categories', icon: FolderOpen},
          ]
        },
        { 
          id: 'careers', 
          label: 'Careers', 
          icon: Briefcase,
          type: 'dropdown',
          subItems: [
            { id: 'add-career', label: 'Career List', icon: ScrollIcon },
            { id: 'applications', label: 'Applications', icon: FolderOpen},
          ]
        },
      ]
    },
    {
      title: "User Queries",
      items: [
        { 
          id: 'location', 
          label: 'Locations', 
          icon: LocateIcon,
          type: 'simple'
        },
        { 
          id: 'newsletter', 
          label: 'Newsletter', 
          icon: Newspaper,
          type: 'simple'
        },
        { 
          id: 'testimonials', 
          label: 'Testimonials', 
          icon: MessageSquare,
          type: 'simple'
        },
        { 
          id: 'contact', 
          label: 'Contacts', 
          icon: Contact,
          type: 'simple'
        },
        { 
          id: 'consultation-requests', 
          label: 'Consultations', 
          icon: MessageCircleWarningIcon,
          type: 'simple'
        },
      ]
    }
  ];

  const getSettingsSubItems = () => {
    const baseSubItems = [
      { id: 'change-password', label: 'Change password', icon: Shield }
    ];
    if (isSuperAdmin) {
      baseSubItems.unshift({ id: 'all-admins', label: 'All admins', icon: Shield });
    }
    return baseSubItems;
  };

  const secondaryNavItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      type: 'expandable',
      subItems: getSettingsSubItems()
    },
  ];

  // Shared props passed down to every NavItem
  const navItemProps = {
    activeTab,
    setActiveTab,
    setSidebarOpen,
    openDropdowns,
    toggleDropdown,
    expandedItems,
    toggleExpand,
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('https://api.sewacareservices.com/admin/admin_logout.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      if (data.status === 'success') {
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminData');
        localStorage.removeItem('loginTime');
        window.location.href = '/';
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (err) {
      console.error('Logout Error:', err);
      alert('Logout error occurred.');
    } finally {
      setShowLogoutConfirm(false);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed md:relative z-30 w-64 bg-[#376082] text-white flex-shrink-0 h-full flex flex-col border-r border-[#456E8C]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#456E8C]">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold truncate"
              >
                Sewa Home Care
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-300 text-xs mt-1"
              >
                Senior Care Management
              </motion.p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 hover:bg-[#456E8C] rounded-lg transition-colors flex-shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navigationSections.map((section, index) => (
            <div key={section.title} className={index > 0 ? 'mt-6' : ''}>
              <div className="px-4 mb-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
              <div className="px-2 space-y-1">
                {section.items.map((item) => (
                  <NavItem key={item.id} item={item} {...navItemProps} />
                ))}
              </div>
            </div>
          ))}

          <div className="px-4 my-6">
            <div className="border-t border-[#456E8C]"></div>
          </div>

          <div className="px-2 space-y-1">
            {secondaryNavItems.map((item) => (
              <NavItem key={item.id} item={item} {...navItemProps} />
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[#456E8C] bg-[#2F5470]">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-[#376082]">
            <div className="w-10 h-10 bg-[#4A7FA6] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="font-semibold text-sm">{getInitial()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{full_name}</p>
              <p className="text-xs text-gray-300 truncate mt-0.5">{email}</p>
              <p className="text-xs text-blue-200 capitalize mt-0.5">
                {role.replace('_', ' ')}
              </p>
            </div>
            <button 
              onClick={() => setShowLogoutConfirm(true)} 
              className="p-2 hover:bg-[#456E8C] rounded-lg transition-colors flex-shrink-0 group"
              title="Logout"
            >
              <LogOut size={16} className="group-hover:text-red-200" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Confirm Logout
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to logout from the admin panel?
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;