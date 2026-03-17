import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image, Phone } from 'lucide-react';
import TeamMemberModal from './TeamMemberModal';
import Notification from './Notification';

const TeamAdmin = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '', type: '' });
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('https://api.sewacareservices.com/team/get_team_members.php');
      // const response = await fetch('http://localhost/SewaHome/Backend/team/get_team_members.php');
      const data = await response.json();

      if (data.success) {
        const formattedMembers = data.teamMembers.map(member => ({
          ...member,
          experience: formatArrayField(member.experience),
          credentials: formatArrayField(member.credentials)
        }));
        setTeamMembers(formattedMembers);
      } else {
        showNotification(`Failed to fetch team members: ${data.message}`, 'error');
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
      showNotification('Error fetching team members. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatArrayField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) {
      return field.map(item => {
        if (typeof item === 'string') return item;
        if (typeof item === 'object') return JSON.stringify(item);
        return String(item);
      });
    }
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
    } catch {
      return [String(field)];
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const openModal = (member = null) => {
    setEditingMember(member);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
  };

  const handleFormSuccess = (message) => {
    showNotification(message, 'success');
    closeModal();
    fetchTeamMembers();
  };

  const handleFormError = (message) => {
    showNotification(message, 'error');
  };

  const handleDelete = async (memberId, memberName) => {
    if (window.confirm(`Are you sure you want to delete "${memberName}"?`)) {
      try {
        const response = await fetch(`https://api.sewacareservices.com/team/delete_team_member.php`, {
          // const response = await fetch(`http://localhost/SewaHome/Backend/team/delete_team_member.php`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ member_id: memberId })
        });

        const result = await response.json();

        if (result.success) {
          showNotification(`Team member "${memberName}" deleted successfully`, 'success');
          fetchTeamMembers();
        } else {
          showNotification(`Error: ${result.message}`, 'error');
        }
      } catch (error) {
        console.error('Error deleting team member:', error);
        showNotification('Error deleting team member. Please try again.', 'error');
      }
    }
  };

  const renderArrayItem = (item) => {
    if (typeof item === 'string') return item;
    if (typeof item === 'object') {
      try {
        if (item.title && item.company) return `${item.title} at ${item.company}`;
        return JSON.stringify(item);
      } catch {
        return String(item);
      }
    }
    return String(item);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pl-6">
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
          duration={5000}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => openModal()}
            className="bg-[#376082] my-8 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Add Team Member</span>
          </button>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={`https://api.sewacareservices.com/team/${member.image}`}
                 //  src={`http://localhost/SewaHome/Backend/team/${member.image}`}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => openModal(member)}
                    className="bg-[#376082] hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(member.member_id, member.name)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-1">{member.role}</p>

                {/* Phone */}
                {member.phone && (
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-2">
                    <Phone size={13} />
                    {member.phone}
                  </p>
                )}

                {member.shortDescription && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {member.shortDescription}
                  </p>
                )}

                {/* Credentials */}
                {member.credentials && member.credentials.length > 0 && member.credentials[0] !== '' && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Credentials</p>
                    <div className="flex flex-wrap gap-1">
                      {member.credentials.slice(0, 2).map((cred, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          {renderArrayItem(cred)}
                        </span>
                      ))}
                      {member.credentials.length > 2 && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                          +{member.credentials.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Image size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Team Members</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first team member.</p>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors"
            >
              <Plus size={20} />
              <span>Add Team Member</span>
            </button>
          </div>
        )}

        <TeamMemberModal
          show={showModal}
          onClose={closeModal}
          member={editingMember}
          onSuccess={handleFormSuccess}
          onError={handleFormError}
        />
      </div>
    </div>
  );
};

export default TeamAdmin;