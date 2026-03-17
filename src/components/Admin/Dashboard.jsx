import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Plus, Users, Shield, UserCheck, AlertCircle, Clock, User } from 'lucide-react';
import AddAdminModal from './AddAdminModal';

const Dashboard = () => {
  // const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminRole, setAdminRole] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [stats, setStats] = useState({
    totalAdmins: 0,
    superAdmins: 0,
    regularAdmins: 0,
    activeAdmins: 0,
    recentLoginAttempts: 0,
    failedAttempts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check user role from localStorage on component mount
    const adminDataString = localStorage.getItem('adminData');
    if (adminDataString) {
      try {
        const adminData = JSON.parse(adminDataString);
        setAdminRole(adminData.role);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
    fetchAdmins();
    if (adminRole === 'super admin') {
      fetchLoginAttempts();
    }
  }, [adminRole]);

  const fetchAdmins = async () => {
    try {
     const response = await fetch('https://api.sewacareservices.com/admin/get_admins.php');
    //  const response = await fetch('http://localhost/SewaHome/Backend/admin/get_admins.php');
      const result = await response.json();
      
      if (result.status === 'success') {
        setAdmins(result.admins);
        calculateStats(result.admins);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLoginAttempts = async () => {
    try {
     const response = await fetch('https://api.sewacareservices.com/admin/get_login_attempts.php');
      //const response = await fetch('http://localhost/SewaHome/Backend/admin/get_login_attempts.php');
      
      // First, get the response as text to see what we're dealing with
      const responseText = await response.text();
      
      // Try to parse as JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', responseText);
        throw new Error('Server returned invalid JSON. Response: ' + responseText.substring(0, 200));
      }
      
      if (result.status === 'success') {
        setLoginAttempts(result.attempts);
        updateStatsWithAttempts(result.attempts);
      } else {
        throw new Error(result.message || 'Failed to fetch login attempts');
      }
    } catch (error) {
      console.error('Error fetching login attempts:', error);
    }
  };

  const calculateStats = (adminsList) => {
    const totalAdmins = adminsList.length;
    const superAdmins = adminsList.filter(admin => 
      admin.role === 'super admin'
    ).length;
    const regularAdmins = adminsList.filter(admin => admin.role === 'admin').length;
    const activeAdmins = adminsList.filter(admin => admin.status === 'active').length;

    setStats(prev => ({
      ...prev,
      totalAdmins,
      superAdmins,
      regularAdmins,
      activeAdmins
    }));
  };

  const updateStatsWithAttempts = (attempts) => {
    const recentAttempts = attempts.filter(attempt => {
      const attemptTime = new Date(attempt.attempt_time);
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return attemptTime > yesterday;
    });

    const failedAttempts = attempts.filter(attempt => attempt.is_success === 0).length;

    setStats(prev => ({
      ...prev,
      recentLoginAttempts: recentAttempts.length,
      failedAttempts
    }));
  };

 

  // Format time for display
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // Group attempts by date
  const groupAttemptsByDate = (attempts) => {
    const groups = {};
    attempts.forEach(attempt => {
      const date = new Date(attempt.attempt_time).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(attempt);
    });
    return groups;
  };

  // Check if current user is super admin
  const isSuperAdmin = adminRole === 'super admin';

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </motion.div>
  );

  const LoginTimelineItem = ({ attempt }) => (
    <div className="flex items-start space-x-4 py-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
        <User size={16} className="text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">
            {attempt.email}
          </p>
          <p className="text-sm text-gray-500 ml-2 flex-shrink-0">
            {formatTime(attempt.attempt_time)}
          </p>
        </div>
        <div className="mt-1">
          <p className="text-sm text-gray-600">
            {attempt.name || 'User'} 
          </p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#376082]"></div>
      </div>
    );
  }

  const groupedAttempts = groupAttemptsByDate(loginAttempts);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      {/* <div className="flex justify-between items-center">
        {isSuperAdmin && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#376082] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5D8FB1] transition-colors flex items-center space-x-2"
            onClick={() => setIsAddAdminModalOpen(true)}
          >
            <Plus size={20} />
            <span>New Admin</span>
          </motion.button>
        )}
      </div> */}

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Admins"
          value={stats.totalAdmins}
          color="bg-blue-500"
          subtitle="All admin accounts"
        />
        <StatCard
          icon={Shield}
          title="Super Admins"
          value={stats.superAdmins}
          color="bg-purple-500"
          subtitle="Full access"
        />
        <StatCard
          icon={UserCheck}
          title="Active Admins"
          value={stats.activeAdmins}
          color="bg-green-500"
          subtitle="Currently active"
        />
        {isSuperAdmin && (
          <StatCard
            icon={AlertCircle}
            title="Recent Logins"
            value={stats.recentLoginAttempts}
            color="bg-orange-500"
            subtitle="Last 24 hours"
          />
        )}
      </div>

      {/* Login Timeline for Super Admin */}
      {isSuperAdmin && loginAttempts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Login Activity</h2>
            <div className="text-sm text-gray-600">
              {loginAttempts.length} total logins
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedAttempts).map(([date, attempts]) => (
              <div key={date} className="border-l-2 border-gray-200 pl-6 ml-4">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-[#376082] rounded-full -ml-[21px]"></div>
                  <h3 className="text-lg font-semibold text-gray-900 ml-2">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                </div>
                <div className="space-y-1">
                  {attempts.map((attempt, index) => (
                    <LoginTimelineItem key={index} attempt={attempt} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* No Activity Message */}
      {isSuperAdmin && loginAttempts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center"
        >
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Login Activity</h3>
          <p className="text-gray-600">No login attempts have been recorded yet.</p>
        </motion.div>
      )}

      {/* Add Admin Modal */}
      {/* <AddAdminModal
        isOpen={isAddAdminModalOpen}
        onClose={() => setIsAddAdminModalOpen(false)}
        onAddAdmin={handleAddAdmin}
      /> */}
    </div>
  );
};

export default Dashboard;