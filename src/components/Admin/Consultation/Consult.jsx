import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  MessageSquare,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

// Notification Component
const Notification = ({ message, type, onClose }) => {
  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  };

  const icon = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    info: <AlertCircle className="w-5 h-5 text-blue-600" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-[10000] border rounded-lg p-4 shadow-lg max-w-sm ${bgColor[type]} ${textColor[type]}`}
    >
      <div className="flex items-center gap-3">
        {icon[type]}
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const Consult = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Show alert function
  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 3000);
  };

  useEffect(() => {
    fetchConsultations();
  }, [currentPage, itemsPerPage]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
       const response = await fetch(`https://api.sewacareservices.com/consultation/get_consults.php?page=${currentPage}&limit=${itemsPerPage}`);
      //const response = await fetch(`http://localhost/SewaHome/Backend/consultation/get_consults.php?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await response.json();
      if (data.success) {
        setConsultations(data.consultations);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        showAlert('Failed to fetch consultations', 'error');
      }
    } catch (err) {
      console.error('Error fetching consultations:', err);
      showAlert('Network error while fetching consultations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isWithinDateRange = (dateString, range) => {
    const date = new Date(dateString);
    const now = new Date();
    
    switch (range) {
      case 'today':
        return date.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return date >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return date >= monthAgo;
      default:
        return true;
    }
  };

  const updateStatus = async (id, status) => {
    try {
       const response = await fetch('https://api.sewacareservices.com/consultation/update_consult_status.php', {
      //const response = await fetch('http://localhost/SewaHome/Backend/consultation/update_consult_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      
      const data = await response.json();
      if (data.success) {
        fetchConsultations();
        showAlert(`Status updated to ${status}`, 'success');
      } else {
        showAlert(data.message || 'Failed to update status', 'error');
      }
    } catch (err) {
      showAlert('Error updating status', 'error');
    }
  };

  // Filter consultations based on search and filters
  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = 
      consultation.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.phone.includes(searchTerm) ||
      (consultation.service && consultation.service.toLowerCase().includes(searchTerm.toLowerCase())) ||
      consultation.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || isWithinDateRange(consultation.created_at, dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination functions
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
    setCurrentPage(1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'contacted':
        return <PhoneCall className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#376082]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Alert Display */}
      {alert.show && (
        <Notification 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert({ show: false, message: '', type: '' })}
        />
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Total Consultations: <span className="font-semibold text-[#376082]">{consultations.length}</span>
              </div>
              <div className="text-sm text-gray-500">
                Filtered: <span className="font-semibold text-[#376082]">{filteredConsultations.length}</span>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search consultations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#376082] focus:border-transparent text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#376082] focus:border-transparent text-sm"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                </select>

                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Results Per Page */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              Showing {filteredConsultations.length} of {consultations.length} requests
            </div>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-[#376082]"
            >
              <option value="5">5 per page</option>
              <option value="8">8 per page</option>
              <option value="15">15 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>

          {/* Consultations Table */}
          {filteredConsultations.length === 0 ? (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 text-center py-12 rounded-lg">
              <Filter className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <p className="text-lg font-medium">No consultation requests found</p>
              <p className="text-sm mt-2">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' 
                  ? "Try adjusting your search or filters"
                  : "No consultation requests have been submitted yet"
                }
              </p>
              {(searchTerm || statusFilter !== 'all' || dateFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-[#376082] text-white px-4 py-2 rounded-lg hover:bg-[#5D8FB1] transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredConsultations.map((consultation) => (
                      <motion.tr 
                        key={consultation.id} 
                        className="hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-[#376082] rounded-full flex items-center justify-center">
                                <User size={20} className="text-white" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-semibold text-gray-900">
                                {consultation.first_name} {consultation.last_name}
                              </div>
                              <div className="text-sm text-gray-600 mt-1 lg:hidden">
                                <div className="flex items-center gap-1">
                                  <Mail size={14} />
                                  {consultation.email}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Phone size={14} />
                                  {consultation.phone}
                                </div>
                              </div>
                              {consultation.service && (
                                <div className="text-sm text-gray-700 mt-1 xl:hidden">
                                  <span className="font-medium">Service:</span> {consultation.service}
                                </div>
                              )}
                              <div className="text-xs text-gray-500 mt-1 xl:hidden">
                                {new Date(consultation.created_at).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-700 mt-2 lg:hidden">
                                <div className="font-medium text-gray-700 mb-1">Message:</div>
                                <p className="line-clamp-2">{consultation.message}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="text-sm text-gray-900">{consultation.email}</div>
                          <div className="text-sm text-gray-600">{consultation.phone}</div>
                        </td>
                        <td className="px-6 py-4 hidden xl:table-cell">
                          <div className="text-sm text-gray-900">
                            {consultation.service || 'Not specified'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell">
                          {new Date(consultation.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            consultation.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : consultation.status === 'contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {getStatusIcon(consultation.status)}
                            {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <select 
                              value={consultation.status} 
                              onChange={(e) => updateStatus(consultation.id, e.target.value)}
                              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#376082] focus:border-transparent"
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {getPageNumbers().map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-[#376082] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  Total: {consultations.length} requests
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Consult;