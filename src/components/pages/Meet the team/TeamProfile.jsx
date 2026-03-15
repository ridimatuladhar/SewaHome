import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import Navbar from '../../layouts/Navbar';
import FooterButtons from '../footer/FooterButtons';

const TeamProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'https://stf.org.np/Backend/team';
  //const API_BASE = 'http://localhost/SewaHome/Backend/team';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const cardHoverVariants = {
    hover: { y: -5, transition: { duration: 0.2 } }
  };

  // Scroll to top whenever the profile id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Fetch all team members for navigation
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${API_BASE}/get_team_members.php`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.success) {
          setTeamMembers(data.teamMembers);
        } else {
          throw new Error(data.message || 'Failed to fetch team members');
        }
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError(err.message);
      }
    };

    fetchTeamMembers();
  }, []);

  // Fetch specific team member
  useEffect(() => {
    const fetchTeamMember = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/get_team_member.php?id=${id}`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.success) {
          setMember(data.teamMember);
        } else {
          throw new Error(data.message || 'Team member not found');
        }
      } catch (err) {
        console.error('Error fetching team member:', err);
        setError(err.message);
        setMember(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [id]);

  const handleProfileClick = (memberId) => {
    navigate(`/team/${memberId}`);
  };

  // Call phone number if available, otherwise navigate to profile
  const handleTalkToMe = () => {
    if (member?.phone) {
      window.location.href = `tel:${member.phone}`;
    } else {
      navigate(`/team/${member.member_id || id}`);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/about/placeholder.png';
    if (imagePath.startsWith('http') || imagePath.startsWith('//')) return imagePath;
    if (imagePath.startsWith('/uploads/')) return `${API_BASE}${imagePath}`;
    if (imagePath.startsWith('/')) return imagePath;
    return `${API_BASE}/uploads/${imagePath}`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
            style={{ fontFamily: "Chathura" }}
          >
            Team Profile
          </motion.h1>
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <Loader className="animate-spin h-12 w-12 text-[#376082]" />
              <p className="text-gray-600">Loading team profile...</p>
            </div>
          </div>
        </div>
        <FooterButtons />
      </>
    );
  }

  if (error && !member) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
            style={{ fontFamily: "Chathura" }}
          >
            Team Profile
          </motion.h1>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-red-600 text-lg mb-4">Error loading team profile: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#376082] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <FooterButtons />
      </>
    );
  }

  if (!member) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
            style={{ fontFamily: "Chathura" }}
          >
            Team Profile
          </motion.h1>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-4">Team member not found.</p>
              <button
                onClick={() => navigate('/team')}
                className="bg-[#376082] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Team
              </button>
            </div>
          </div>
        </div>
        <FooterButtons />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-12 mt-16"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
          style={{ fontFamily: "Chathura" }}
        >
          Team Profile
        </motion.h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded"
          >
            <div className="text-yellow-700">Warning: {error} (showing cached data)</div>
          </motion.div>
        )}

        <div className="flex gap-8">
          {/* Left Side - Team Member Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "Macha" }}>
                Team Members
              </h3>
              <div className="space-y-3">
                {teamMembers.map((team) => (
                  <motion.button
                    key={team.member_id || team.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProfileClick(team.member_id)}
                    className={`w-full p-3 rounded-lg transition-all duration-200 text-left ${
                      (team.member_id === id || team.id === id)
                        ? 'bg-[#1990ff] text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[#1990ff]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={getImageUrl(team.image)}
                        alt={team.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                        onError={(e) => { e.target.src = '/about/placeholder.png'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate" style={{ fontFamily: "Macha" }}>
                          {team.name.split(' ')[0]}
                        </h4>
                        <p className="text-xs opacity-80 truncate" style={{ fontFamily: "Macha" }}>
                          {team.role.split('|')[0].trim()}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left Column - Image and Info Card */}
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <motion.div
                whileHover="hover"
                variants={cardHoverVariants}
                className="relative mb-8"
              >
                <div className="relative w-72 h-88 bg-[url('/about/icon.png')] bg-contain bg-no-repeat bg-center flex items-center justify-center">
                  <img
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    className="w-72 h-88 object-cover shadow-lg"
                    onError={(e) => { e.target.src = '/about/placeholder.png'; }}
                  />
                </div>
              </motion.div>

              {/* Info Card */}
              <motion.div
                whileHover="hover"
                variants={cardHoverVariants}
                className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center"
              >
                <h1 className="text-2xl font-bold text-[#1c3c6b] mb-2" style={{ fontFamily: "Macha" }}>
                  {member.name}
                </h1>
                <p className="text-[#1990ff] font-medium text-lg mb-2" style={{ fontFamily: "Macha" }}>
                  {member.role}
                </p>
               
                <p className="text-gray-700 text-sm mb-6" style={{ fontFamily: "Macha" }}>
                  {member.shortDescription}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTalkToMe}
                  className="bg-[#1990ff] text-white px-8 py-2 rounded-full hover:bg-[#376082] transition-colors duration-200"
                  style={{ fontFamily: "Macha" }}
                  aria-label={`Talk to ${member.name}${member.phone ? ` at ${member.phone}` : ''}`}
                >
                  Talk to me
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - Bio and Details */}
            <div className="space-y-6">
              {/* Bio Section */}
              <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-5xl font-extrabold text-[#1c3c6b] mb-4 border-b pb-2" style={{ fontFamily: "Chathura" }}>
                  About Me
                </h3>
                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base" style={{ fontFamily: "Macha" }}>
                    {member.bio}
                  </p>
                </div>
              </motion.div>

              {/* Experience Section */}
              {member.experience && member.experience.length > 0 && (
                <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-5xl font-extrabold text-[#1c3c6b] mb-4 border-b pb-2" style={{ fontFamily: "Chathura" }}>
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {member.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex justify-between items-start"
                      >
                        <div>
                          <h4 className="font-semibold text-gray-800" style={{ fontFamily: "Macha" }}>{exp.title}</h4>
                          <p className="text-gray-600 text-sm" style={{ fontFamily: "Macha" }}>{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                          {exp.duration}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Credentials Section */}
              {member.credentials && member.credentials.length > 0 && (
                <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-5xl font-extrabold text-[#1c3c6b] mb-4 border-b pb-2" style={{ fontFamily: "Chathura" }}>
                    Credentials
                  </h2>
                  <ul className="space-y-2">
                    {member.credentials.map((credential, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <span className="w-2 h-2 bg-[#1c3c6b] rounded-full mr-3"></span>
                        <span className="text-gray-700" style={{ fontFamily: "Macha" }}>{credential}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Mobile Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:hidden fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50"
        >
          <div className="flex justify-center gap-2">
            {teamMembers.map((team) => (
              <motion.button
                key={team.member_id || team.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleProfileClick(team.member_id)}
                className="focus:outline-none flex-1"
              >
                <div className={`p-3 rounded-lg transition-colors ${
                  (team.member_id === id || team.id === id)
                    ? 'bg-[#1990ff] text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <div className="text-xs font-medium text-center" style={{ fontFamily: "Macha" }}>
                    {team.name.split(' ')[0]}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <FooterButtons />
    </>
  );
};

export default TeamProfile;