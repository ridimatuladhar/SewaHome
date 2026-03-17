import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Users,
    Search,
    Download,
    Trash2,
    CheckCircle,
    XCircle,
    Calendar,
    User,
    RefreshCw
} from 'lucide-react';

// Base API Configuration - Update these values as needed
const API_CONFIG = {
    BASE_URL: 'https://api.sewacareservices.com',
    // BASE_URL: 'http://localhost/SewaHome/Backend',
    ENDPOINTS: {
        GET_SUBSCRIBERS: '/newsletter/get_subscribers.php',
        GET_STATS: '/newsletter/get_stats.php',
        DELETE_SUBSCRIBER: '/newsletter/delete_subscriber.php',
        EXPORT_SUBSCRIBERS: '/newsletter/export_subscribers.php'
    }
};

// Helper function to build API URLs
const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

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
        success: <CheckCircle className="w-5 h-5 text-green-600" />,
        error: <XCircle className="w-5 h-5 text-red-600" />,
        warning: <XCircle className="w-5 h-5 text-yellow-600" />,
        info: <XCircle className="w-5 h-5 text-blue-600" />
    };

    return (
        <div className={`fixed top-4 right-4 z-50 border rounded-lg p-4 max-w-sm ${bgColor[type]} ${textColor[type]} shadow-lg`}>
            <div className="flex items-center gap-3">
                {icon[type]}
                <div className="flex-1">
                    <p className="text-sm font-medium">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <XCircle size={16} />
                </button>
            </div>
        </div>
    );
};

const NewsLetter = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [alert, setAlert] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        newThisMonth: 0
    });

    const showAlert = (message, type = 'info') => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 4000);
    };

    useEffect(() => {
        fetchSubscribers();
        fetchStats();
    }, [currentPage, searchTerm]);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `${getApiUrl(API_CONFIG.ENDPOINTS.GET_SUBSCRIBERS)}?page=${currentPage}&limit=10&search=${searchTerm}`
            );
            const data = await res.json();

            if (data.success) {
                setSubscribers(data.subscribers);
                setTotalPages(data.totalPages);
            } else {
                showAlert('Failed to fetch subscribers', 'error');
            }
        } catch (err) {
            showAlert('Error fetching subscribers', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.GET_STATS));
            const data = await res.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    const handleDeleteSubscriber = async (id, email) => {
        if (!window.confirm(`Are you sure you want to delete subscriber: ${email}?`)) return;

        try {
            const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DELETE_SUBSCRIBER), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            const data = await res.json();

            if (data.success) {
                showAlert('Subscriber deleted successfully', 'success');
                fetchSubscribers();
                fetchStats();
            } else {
                showAlert(data.message || 'Failed to delete subscriber', 'error');
            }
        } catch (err) {
            showAlert('Error deleting subscriber', 'error');
        }
    };

    const exportSubscribers = async () => {
        try {
            const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.EXPORT_SUBSCRIBERS));
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            showAlert('Subscribers exported successfully', 'success');
        } catch (err) {
            showAlert('Error exporting subscribers', 'error');
        }
    };

    const refreshData = () => {
        fetchSubscribers();
        fetchStats();
        showAlert('Data refreshed', 'info');
    };

    const filteredSubscribers = subscribers.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && subscribers.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#376082]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <Users className="w-8 h-8 text-blue-500" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                        </div>
                        <Mail className="w-8 h-8 text-green-500" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">New This Month</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.newThisMonth}</p>
                        </div>
                        <User className="w-8 h-8 text-purple-500" />
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="flex-1 w-full md:w-auto">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search subscribers by email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#376082] focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <button
                            onClick={refreshData}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <RefreshCw size={20} />
                            Refresh
                        </button>
                        <button
                            onClick={exportSubscribers}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <Download size={20} />
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subscription Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSubscribers.map((subscriber, index) => (
                                <motion.tr
                                    key={subscriber.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Mail className="w-4 h-4 text-gray-400 mr-3" />
                                            <span className="text-sm font-medium text-gray-900">{subscriber.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${subscriber.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {subscriber.is_active ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Active
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-3 h-3 mr-1" />
                                                    Inactive
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                            {new Date(subscriber.subscription_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(subscriber.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDeleteSubscriber(subscriber.id, subscriber.email)}
                                            className="text-red-600 hover:text-red-900 transition-colors p-2 rounded-lg hover:bg-red-50"
                                            title="Delete subscriber"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td> */}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Loading State */}
                {loading && subscribers.length > 0 && (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#376082]"></div>
                        <span className="ml-2 text-gray-600">Updating...</span>
                    </div>
                )}

                {/* Empty State */}
                {filteredSubscribers.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No subscribers found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {searchTerm
                                ? 'No subscribers match your search criteria. Try adjusting your search terms.'
                                : 'No subscribers have signed up for the newsletter yet. Promote your newsletter to get subscribers.'
                            }
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-700">
                                Page {currentPage} of {totalPages} • {stats.total} total subscribers
                            </p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Stats Footer */}
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                    Last updated: {new Date().toLocaleString()} •
                    Showing {filteredSubscribers.length} of {stats.total} subscribers
                </p>
            </div>
        </div>
    );
};

export default NewsLetter;