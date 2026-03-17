import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Mail, Phone, MapPin, Calendar, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import ApplicationDetailsModal from './ApplicationDetailsModal';

const ApplicationsAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [positions, setPositions] = useState([]);

  const API_BASE = 'https://api.sewacareservices.com/career';
  //const API_BASE = 'http://localhost/SewaHome/Backend/career';

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'reviewed', label: 'Reviewed', color: 'bg-blue-100 text-blue-800' },
    { value: 'accepted', label: 'Accepted', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' }
  ];

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/get_applications.php`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.applications || []);
        setFilteredApplications(data.applications || []);
      } else {
        throw new Error(data.message || 'Failed to fetch applications');
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch positions for filter
  const fetchPositions = async () => {
    try {
      const response = await fetch(`${API_BASE}/get_positions.php?admin=true`);
      const data = await response.json();
      
      if (data.success) {
        setPositions(data.positions || []);
      }
    } catch (err) {
      console.error('Error fetching positions:', err);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchPositions();
  }, []);

  // Filter and search applications
  useEffect(() => {
    let filtered = applications;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Apply position filter
    if (positionFilter !== 'all') {
      filtered = filtered.filter(app => app.position === positionFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.first_name.toLowerCase().includes(term) ||
        app.last_name.toLowerCase().includes(term) ||
        app.email.toLowerCase().includes(term) ||
        app.position.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, positionFilter, sortField, sortDirection]);

  // Handle status update
  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE}/update_application_status.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: applicationId,
          status: newStatus
        })
      });

      const data = await response.json();

      if (data.success) {
        fetchApplications(); // Refresh the list
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
    }
  };

  // Handle view application details
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Get status count
  const getStatusCount = (status) => {
    return applications.filter(app => app.status === status).length;
  };

  // Download resume
  const handleDownloadResume = (resumePath) => {
    const fullPath = `${API_BASE}${resumePath}`;
    window.open(fullPath, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#376082]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
           
            <div className="text-sm text-gray-500" >
              Total: {applications.length} applications
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statusOptions.slice(1).map((status) => (
            <div key={status.value} className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600" >{status.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{getStatusCount(status.value)}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                  {((getStatusCount(status.value) / applications.length) * 100 || 0).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" >
                Search Applications
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or position..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors"
                
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" >
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors"
                
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Position Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" >
                Position
              </label>
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#376082] focus:border-[#376082] transition-colors"
             
              >
                <option value="all">All Positions</option>
                {positions.map(position => (
                  <option key={position.id} value={position.title}>
                    {position.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900" >
              Applications ({filteredApplications.length})
            </h2>
          </div>
          
          {filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg" >
                {applications.length === 0 ? 'No applications found.' : 'No applications match your filters.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('first_name')}
                      
                    >
                      <div className="flex items-center space-x-1">
                        <span>Applicant</span>
                        {sortField === 'first_name' && (
                          sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('position')}
                      
                    >
                      <div className="flex items-center space-x-1">
                        <span>Position</span>
                        {sortField === 'position' && (
                          sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                      Contact
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('experience')}
                      
                    >
                      <div className="flex items-center space-x-1">
                        <span>Experience</span>
                        {sortField === 'experience' && (
                          sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('created_at')}
                     
                    >
                      <div className="flex items-center space-x-1">
                        <span>Applied</span>
                        {sortField === 'created_at' && (
                          sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900" >
                            {application.first_name} {application.last_name}
                          </h3>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900" >
                          {application.position}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail size={14} className="text-gray-400" />
                            <span >{application.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone size={14} className="text-gray-400" />
                            <span >{application.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {application.experience || 'Not specified'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar size={14} className="text-gray-400" />
                          <span >
                            {new Date(application.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={application.status}
                          onChange={(e) => handleStatusUpdate(application.id, e.target.value)}
                          className={`text-xs font-medium px-3 py-1 rounded-full border-0 focus:ring-2 focus:ring-[#376082] transition-colors ${
                            statusOptions.find(s => s.value === application.status)?.color || 'bg-gray-100 text-gray-800'
                          }`}
                          
                        >
                          {statusOptions.slice(1).map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(application)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDownloadResume(application.resume_path)}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download resume"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      <ApplicationDetailsModal
        show={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedApplication(null);
        }}
        application={selectedApplication}
        onStatusUpdate={handleStatusUpdate}
        onDownloadResume={handleDownloadResume}
      />
    </div>
  );
};

export default ApplicationsAdmin;