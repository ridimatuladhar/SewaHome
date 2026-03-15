import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, UserCheck, UserX, Mail, Calendar, Edit, Ban, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import AddAdminModal from '../AddAdminModal';

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAdminRole, setCurrentAdminRole] = useState(null);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);

  useEffect(() => {
    // Get current admin role
    const adminDataString = localStorage.getItem('adminData');
    if (adminDataString) {
      try {
        const adminData = JSON.parse(adminDataString);
        setCurrentAdminRole(adminData.role);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
    
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (adminData) => {
    try {
      const response = await fetch('https://stf.org.np/Backend/admin/create_admin.php', {
     //const response = await fetch('http://localhost/SewaHome/Backend/admin/create_admin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminData.email,
          password: adminData.password,
          full_name: adminData.full_name,
          role: adminData.role,
          permissions: adminData.permissions
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        const newAdmin = result.admin;
        setAdmins(prev => [...prev, newAdmin]);
        setIsAddAdminModalOpen(false);
        fetchAdmins(); // Refresh the admin list
        return newAdmin;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      throw error;
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch('https://stf.org.np/Backend/admin/get_admins.php');
      //const response = await fetch('http://localhost/SewaHome/Backend/admin/get_admins.php');
      const result = await response.json();
      
      if (result.status === 'success') {
        // Filter out super admins - only show regular admins
        const regularAdmins = result.admins.filter(admin => admin.role !== 'super admin');
        setAdmins(regularAdmins);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUnblock = async (adminId, currentStatus) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus === 'active' ? 'block' : 'unblock'} this admin?`)) {
      return;
    }

    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      
      const response = await fetch('https://stf.org.np/Backend/admin/update_admin_status.php', {
      //const response = await fetch('http://localhost/SewaHome/Backend/admin/update_admin_status.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_id: adminId,
          status: newStatus
        })
      });

      const result = await response.json();

      if (result.status === 'success') {
        // Update local state
        setAdmins(prev => prev.map(admin => 
          admin.id === adminId ? { ...admin, status: newStatus } : admin
        ));
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error updating admin status:', error);
      alert('Failed to update admin status. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if current user is super admin
  const isSuperAdmin = currentAdminRole === 'super admin';

  // Filter admins for stats (only non-super admins)
  const regularAdmins = admins.filter(admin => admin.role !== 'super admin');
  const activeAdmins = regularAdmins.filter(admin => admin.status === 'active');
  const inactiveAdmins = regularAdmins.filter(admin => admin.status === 'inactive');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#376082]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-600">Manage regular admin accounts</p>
        </div>
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
      </div>

      {/* Stats Cards - Only for regular admins */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Regular Admins</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{regularAdmins.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-500">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Admins</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {activeAdmins.length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-500">
              <UserCheck size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive Admins</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {inactiveAdmins.length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-500">
              <UserX size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Admins Table - Only regular admins */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Regular Administrators</h2>
            <div className="text-sm text-gray-500">
              Showing {regularAdmins.length} regular admin(s)
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Admin</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Role</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Created</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Last Updated</th>
                {isSuperAdmin && (
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {regularAdmins.map((admin, index) => (
                <tr 
                  key={admin.id} 
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index === regularAdmins.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#376082] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {admin.full_name ? admin.full_name.charAt(0).toUpperCase() : 'A'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{admin.full_name}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Mail size={14} className="mr-1" />
                          {admin.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Shield size={12} className="mr-1" />
                      {admin.role}
                    </span>
                  </td>
                  
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      admin.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.status === 'active' ? (
                        <CheckCircle size={12} className="mr-1" />
                      ) : (
                        <Ban size={12} className="mr-1" />
                      )}
                      {admin.status}
                    </span>
                  </td>
                  
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      {formatDate(admin.created_at)}
                    </div>
                  </td>
                  
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      {formatDate(admin.updated_at)}
                    </div>
                  </td>
                  
                  {isSuperAdmin && (
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleBlockUnblock(admin.id, admin.status)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            admin.status === 'active'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {admin.status === 'active' ? 'Block' : 'Unblock'}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {regularAdmins.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Regular Admins Found</h3>
            <p className="text-gray-600">There are no regular admin accounts in the system.</p>
          </div>
        )}
      </motion.div>

      <AddAdminModal
        isOpen={isAddAdminModalOpen}
        onClose={() => setIsAddAdminModalOpen(false)}
        onAddAdmin={handleAddAdmin}
      />
    </div>
  );
};

export default AllAdmins;