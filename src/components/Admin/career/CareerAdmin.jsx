import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Briefcase, MapPin, Clock, Users } from 'lucide-react';
import JobPostingModal from './JobPostingModal';

const CareerAdmin = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const API_BASE = 'https://api.sewacareservices.com/career';
  //const API_BASE = 'http://localhost/SewaHome/Backend/career';

  // Fetch positions
  const fetchPositions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/get_positions.php?admin=true`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setPositions(data.positions || []);
      } else {
        throw new Error(data.message || 'Failed to fetch positions');
      }
    } catch (err) {
      console.error('Error fetching positions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  // Handle add new position
  const handleAddPosition = () => {
    setEditingPosition(null);
    setShowModal(true);
  };

  // Handle edit position
  const handleEditPosition = (position) => {
    setEditingPosition(position);
    setShowModal(true);
  };

  // Handle delete position
  const handleDeletePosition = async (positionId) => {
    if (!window.confirm('Are you sure you want to delete this job position? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/delete_position.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: positionId })
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Position deleted successfully');
        fetchPositions();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error(data.message || 'Failed to delete position');
      }
    } catch (err) {
      console.error('Error deleting position:', err);
      setError(err.message);
    }
  };

  // Handle toggle active status
  const handleToggleActive = async (positionId, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE}/update_position.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: positionId,
          is_active: !currentStatus
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(`Position ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
        fetchPositions();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error(data.message || 'Failed to update position');
      }
    } catch (err) {
      console.error('Error updating position:', err);
      setError(err.message);
    }
  };

  // Handle modal success
  const handleModalSuccess = (message) => {
    setSuccessMessage(message);
    setShowModal(false);
    setEditingPosition(null);
    fetchPositions();
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle modal error
  const handleModalError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => setError(''), 5000);
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
          
            <button
              onClick={handleAddPosition}
              className="bg-[#376082] hover:bg-blue-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors"
              
            >
              <Plus size={20} />
              <span>Add Job Position</span>
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" >Total Positions</p>
                <p className="text-2xl font-bold text-gray-900">{positions.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-[#376082]" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600" >Active Positions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {positions.filter(p => p.is_active).length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive Positions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {positions.filter(p => !p.is_active).length}
                </p>
              </div>
              <EyeOff className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">
                  {positions.reduce((sum, pos) => sum + (pos.application_count || 0), 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Positions Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Job Positions
            </h2>
          </div>
          
          {positions.length === 0 ? (
            <div className="p-12 text-center">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg" >
                No job positions found. Create your first position to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                      Location & Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
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
                  {positions.map((position) => (
                    <tr key={position.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900" >
                            {position.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2" >
                            {position.description}
                          </p>
                          {position.salary_range && (
                            <p className="text-sm text-[#376082] font-medium mt-1" >
                              {position.salary_range}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-900 mb-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span >{position.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock size={16} className="text-gray-400" />
                          <span >{position.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Users size={16} className="text-gray-400" />
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              position.application_count > 0 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                           
                          >
                            {position.application_count} applications
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(position.id, position.is_active)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            position.is_active
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                         
                        >
                          {position.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditPosition(position)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit position"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeletePosition(position.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete position"
                          >
                            <Trash2 size={16} />
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

      {/* Job Posting Modal */}
      <JobPostingModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingPosition(null);
        }}
        position={editingPosition}
        onSuccess={handleModalSuccess}
        onError={handleModalError}
      />
    </div>
  );
};

export default CareerAdmin;