import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  Circle,
  Search,
  Trash2,
  CheckCircle as CheckCircleIcon,
  XCircle,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

// Alert component
const Alert = ({ message, type, onClose }) => {
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
    success: <CheckCircleIcon className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-600" />,
    info: <AlertCircle className="w-5 h-5 text-blue-600" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-[10000] border rounded-lg p-4 max-w-sm ${bgColor[type]} ${textColor[type]} shadow-lg`}
    >
      <div className="flex items-center gap-3">
        {icon[type]}
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);

  // Show alert notification
  const showAlert = (message, type = 'info') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
    }, 4000);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('https://api.sewacareservices.com/contact/get_contact.php');
      //const res = await fetch('http://localhost/SewaHome/Backend/contact/get_contact.php');
      const data = await res.json();
      if (data.success) {
        setContacts(data.contacts);
      } else {
        setError(data.message || 'Failed to fetch contacts');
        showAlert('Failed to fetch contacts', 'error');
      }
    } catch (err) {
      setError('Network error');
      showAlert('Network error while fetching contacts', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if a contact is unread
  const isUnread = (contact) => {
    return contact.is_read === 0 || 
           contact.is_read === "0" || 
           contact.is_read === false ||
           !contact.is_read;
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterStatus === 'all' || 
      (filterStatus === 'read' && !isUnread(contact)) ||
      (filterStatus === 'unread' && isUnread(contact));
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const unreadCount = contacts.filter(contact => isUnread(contact)).length;
  const totalCount = contacts.length;

  const handleMarkAsRead = async (id) => {
    try {
       const res = await fetch('https://api.sewacareservices.com/contact/mark_read.php', {
      //const res = await fetch('http://localhost/SewaHome/Backend/contact/mark_read.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const data = await res.json();

      if (data.success) {
        setContacts(contacts.map(c => 
          c.id === id ? { ...c, is_read: 1 } : c
        ));
        showAlert('Message marked as read', 'success');
      } else {
        showAlert(data.message || 'Failed to mark as read', 'error');
      }
    } catch (err) {
      showAlert('Error marking message as read', 'error');
    }
  };

  const handleMarkAsUnread = async (id) => {
    try {
       const res = await fetch('https://api.sewacareservices.com/contact/mark_unread.php', {
     // const res = await fetch('http://localhost/SewaHome/Backend/contact/mark_unread.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const data = await res.json();

      if (data.success) {
        setContacts(contacts.map(c => 
          c.id === id ? { ...c, is_read: 0 } : c
        ));
        showAlert('Message marked as unread', 'success');
      } else {
        showAlert(data.message || 'Failed to mark as unread', 'error');
      }
    } catch (err) {
      showAlert('Error marking message as unread', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
       const res = await fetch('https://api.sewacareservices.com/contact/delete_contact.php', {
      //const res = await fetch('http://localhost/SewaHome/Backend/contact/delete_contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const data = await res.json();

      if (data.success) {
        setContacts(contacts.filter(c => c.id !== id));
        showAlert('Message deleted successfully', 'success');
      } else {
        showAlert(data.message || 'Failed to delete message', 'error');
      }
    } catch (err) {
      showAlert('Error deleting message', 'error');
    }
  };

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="mr-2" size={20} />
              <p className="font-medium">Error loading contacts</p>
            </div>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Alert Notification */}
      {alert.show && (
        <Alert
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
                Total Messages: <span className="font-semibold text-[#376082]">{totalCount}</span>
              </div>
              {unreadCount > 0 && (
                <div className="text-sm text-gray-500">
                  Unread: <span className="font-semibold text-red-600">{unreadCount}</span>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent"
                />
              </div>
              
              {/* Status Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-[#376082] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('unread')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === 'unread'
                      ? 'bg-[#376082] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilterStatus('read')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === 'read'
                      ? 'bg-[#376082] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Read
                </button>
              </div>
            </div>
          </div>

          {/* Contact Messages Table */}
          {currentContacts.length === 0 ? (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 text-center py-12 rounded-lg">
              <MessageSquare size={48} className="mx-auto text-blue-400 mb-4" />
              <p className="text-lg font-medium">No contact messages found</p>
              <p className="text-sm mt-2">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your filters or search terms' 
                  : 'Contact messages will appear here'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentContacts.map((contact) => (
                      <motion.tr 
                        key={contact.id} 
                        className={`hover:bg-gray-50 transition-colors ${
                          isUnread(contact) ? 'bg-gray-50' : ''
                        }`}
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
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-semibold text-gray-900">{contact.name}</div>
                                {isUnread(contact) && (
                                  <span className="bg-[#376082] text-white text-xs px-2 py-1 rounded-full">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                <div className="flex items-center gap-1">
                                  <Mail size={14} />
                                  {contact.email}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Phone size={14} />
                                  {contact.contact}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 lg:hidden xl:hidden">
                                {new Date(contact.created_at).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-700 mt-2 lg:hidden">
                                <div className="font-medium text-gray-700 mb-1">Message:</div>
                                <p className="line-clamp-2">{contact.message}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="text-sm text-gray-900 line-clamp-2">{contact.message}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden xl:table-cell">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            isUnread(contact)
                              ? ' text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {isUnread(contact) ? (
                              <>
                                <EyeOff size={14} />
                                Unread
                              </>
                            ) : (
                              <>
                                <Eye size={14} />
                                Read
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {isUnread(contact) ? (
                              <button
                                onClick={() => handleMarkAsRead(contact.id)}
                                className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors"
                                title="Mark as read"
                              >
                                <CheckCircle size={16} />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMarkAsUnread(contact.id)}
                                className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                title="Mark as unread"
                              >
                                <EyeOff size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(contact.id)}
                              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
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
          {filteredContacts.length > contactsPerPage && (
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Showing{' '}
                  <span className="font-semibold text-[#376082]">
                    {indexOfFirstContact + 1}-{Math.min(indexOfLastContact, filteredContacts.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-[#376082]">
                    {filteredContacts.length}
                  </span>{' '}
                  messages
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
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

                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {getPageNumbers().map((pageNumber, index) =>
                      pageNumber === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-[#376082] text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
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
              </div>
            </div>
          )}
        </div>
      </div>
    
    </div>
  );
};

export default Contacts;