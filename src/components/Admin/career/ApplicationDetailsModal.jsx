import React from 'react';
import { X, Mail, Phone, Calendar, FileText, MapPin, Briefcase, Download } from 'lucide-react';

const ApplicationDetailsModal = ({ show, onClose, application, onStatusUpdate, onDownloadResume }) => {
  if (!show || !application) return null;

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'reviewed', label: 'Reviewed', color: 'bg-blue-100 text-blue-800' },
    { value: 'accepted', label: 'Accepted', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' }
  ];

  const getStatusColor = (status) => {
    return statusOptions.find(opt => opt.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#376082]" >
                Application Details
              </h2>
              <p className="text-gray-600" >
                Review application for {application.position}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Applicant Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" >
                  Applicant Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                      Full Name
                    </label>
                    <p className="text-gray-900 font-medium" >
                      {application.first_name} {application.last_name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                      Experience
                    </label>
                    <p className="text-gray-900" >
                      {application.experience || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                      Email
                    </label>
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-400" />
                      <a 
                        href={`mailto:${application.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        
                      >
                        {application.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" >
                      Phone
                    </label>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-400" />
                      <a 
                        href={`tel:${application.phone}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        
                      >
                        {application.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Position Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" >
                  Position Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Briefcase size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700" >Position Applied</p>
                      <p className="text-gray-900 font-medium" >{application.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700" >Applied On</p>
                      <p className="text-gray-900" >
                        {new Date(application.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" >
                  Resume
                </h3>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <FileText size={24} className="text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900" >
                        {application.first_name}'s Resume
                      </p>
                      <p className="text-sm text-gray-500" >
                        Click to download
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDownloadResume(application.resume_path)}
                    className="bg-[#376082] hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Status and Actions */}
            <div className="space-y-6">
              {/* Status Management */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" >
                  Application Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" >
                      Current Status
                    </label>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {statusOptions.find(opt => opt.value === application.status)?.label}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" >
                      Update Status
                    </label>
                    <select
                      value={application.status}
                      onChange={(e) => onStatusUpdate(application.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors"
                     
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" >
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => window.open(`mailto:${application.email}?subject=Regarding your application for ${application.position}`)}
                    className="w-full border-2 border-[#376082]  hover:bg-[#376082] hover:text-white text-[#376082]  py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors font-semibold"
                   
                  >
                    <Mail size={16} />
                    <span>Send Email</span>
                  </button>
                  
                  <button
                    onClick={() => onDownloadResume(application.resume_path)}
                    className="w-full bg-[#376082] hover:bg-blue-800 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                   
                  >
                    <Download size={16} />
                    <span>Download Resume</span>
                  </button>
                </div>
              </div>

             
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors rounded-xl"
              
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;