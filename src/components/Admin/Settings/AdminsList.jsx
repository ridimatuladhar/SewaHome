import React from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Shield, Calendar } from 'lucide-react';

const AdminsList = ({ admins }) => {
  if (admins.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <p className="text-gray-500 text-center">No admins added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Administrators</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {admins.map((admin, index) => (
          <motion.div
            key={admin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{admin.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <Mail className="w-4 h-4" />
                  <span>{admin.email}</span>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 capitalize">{admin.role}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                admin.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {admin.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminsList;