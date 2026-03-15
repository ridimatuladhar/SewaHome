import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/Navbar';
import FooterButtons from '../footer/FooterButtons';

const teamMembers = [
  {
    id: "mala-lama",
    name: "MALA LAMA",
    role: "OWNER | CARE DIRECTOR",
    image: "/about/new1.png",
    shortDescription: "Registered Nurse, Certified Geriatric Care Manager, and Certified Dementia Practitioner",
    bio: `I'm Mala Lama, a Registered Nurse, Certified Geriatric Care Manager, and Certified Dementia Practitioner with over a decade of experience in the healthcare field. As the owner and operator of Sewa Home Care, I have been proudly providing high-quality home care services to elderly and disabled clients for the past seven years.

At Sewa Home Care, our team of dedicated and compassionate caregivers works closely under the supervision of a Registered Nurse to deliver personalized care plans. We are committed to addressing the unique needs of our clients and their families, ensuring they receive the best possible support and care.`,
    experience: [
      {
        title: "Owner & Care Director",
        company: "Sewa Home Care",
        duration: "7 years"
      },
      {
        title: "Registered Nurse",
        company: "Various healthcare settings",
        duration: "10+ years"
      }
    ],
    credentials: [
      "Registered Nurse (RN)",
      "Certified Geriatric Care Manager",
      "Certified Dementia Practitioner",
      "BLS/CPR Certified"
    ]
  },
  {
    id: "shareena-schofield",
    name: "SHAREENA SCHOFIELD",
    role: "TA SERVICE COORDINATOR",
    image: "/about/new4.png",
    shortDescription: "Real estate agent who juggles real life and real estate with integrity, resilience, and a strong work ethic",
    bio: "I'm a dedicated mom who knows how to juggle real life and real estate. I lead with integrity, resilience, and a strong work ethic — no fluff, no sugar-coating. You won't find flashy sales tactics here — just honest, results-driven support to help you find or sell your home. If you're looking for someone who will show up, keep it real, and get the job done, I'm your agent.",
    experience: [
      {
        title: "Real Estate Agent",
        company: "Buyer's Agent & Listing Agent",
        duration: "5 Years"
      }
    ],
    credentials: [
      "Buyer's Agent",
      "Listing Agent",
      "Relocation Specialist",
      "Staging Consultant",
      "Property Management",
      "First Time Homebuyer Expert",
      "Investment Properties",
      "Senior Communities Specialist",
      "5 Years of Experience"
    ]
  },
  {
    id: "debbie-jackson",
    name: "DEBBIE JACKSON",
    role: "CARE MANAGER",
    image: "/about/new2.png",
    shortDescription: "RN with 40 years of experience in Med-Surg, Ortho, and Oncology",
    bio: `I'm Debbie Jackson, an RN with 40 years of experience, primarily in Boston's hospitals across Med-Surg, Ortho, and Oncology, but my heart has always been with the geriatric community. Transitioning from hospital work, I climbed the ranks from Nursing Supervisor to Director of Nursing in skilled nursing facilities, dedicating 34 years to improving geriatric care. My role as a Nursing Executive was both a privilege and an honor.

Recently, I've moved into home care as a Director of Resident Care and Care Manager. This shift has deepened my appreciation for the teams that enable individuals to stay in their homes, reinforcing my values of empathy, compassion, and patience. The joy of making a tangible difference in someone's life continues to be my greatest reward.`,
    experience: [
      {
        title: "Care Manager",
        company: "Sewa Home Care",
        duration: "Current"
      },
      {
        title: "Director of Nursing",
        company: "Skilled Nursing Facilities",
        duration: "34 years"
      },
      {
        title: "Hospital Nurse",
        company: "Boston Hospitals",
        duration: "40+ years"
      }
    ],
    credentials: [
      "Registered Nurse (RN)",
      "40 Years Experience",
      "Med-Surg Specialist",
      "Oncology Experience"
    ]
  },
  {
    id: "luise-rodriguez",
    name: "LUISE RODRIGUEZ",
    role: "ADMINISTRATOR | TA COORDINATOR",
    image: "/about/new3.png",
    shortDescription: "Administrator and TA Coordinator with extensive home care experience",
    bio: `I'm Luisa Rodriguez, an Administrator and TA Coordinator with years of experience. Recently, I've moved into home care as a Director of Resident Care and Care Manager. This shift has deepened my appreciation for the teams that enable individuals to stay in their homes, reinforcing my values of empathy, compassion, and patience. The joy of making a tangible difference in someone's life continues to be my greatest reward.`,
    experience: [
      {
        title: "Administrator | TA Coordinator",
        company: "Sewa Home Care",
        duration: "Current"
      },
      {
        title: "Director of Resident Care",
        company: "Home Care Services",
        duration: "5+ years"
      }
    ],
    credentials: [
      "Certified Administrator",
      "TA Coordination Specialist",
      "Home Care Management",
      "Resident Care Director"
    ]
  },
];

const TeamProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = teamMembers.find((m) => m.id === id);

  const handleProfileClick = (memberId) => {
    navigate(`/team/${memberId}`);
  };

  const handleTalkToMe = () => {
    console.log(`Initiating contact with ${member.name}`);
    // Add your contact functionality here
  };

  if (!member)
    return <div className="text-center py-20">Team member not found.</div>;

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
        <h1
          className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-16"
          style={{ fontFamily: "Chathura" }}
        >
          Team Profile
        </h1>
        <div className="flex gap-8">


          {/* Left Side - Team Member Navigation */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">

              <div className="space-y-4">
                {teamMembers.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => handleProfileClick(team.id)}
                    className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${team.id === id
                        ? 'bg-[#1990ff] text-white shadow-md transform scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[#1990ff]'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={team.image}
                        alt={team.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                      />
                      <div>
                        <h4 className="font-semibold text-sm">{team.name.split(' ')[0]}</h4>
                        <p className="text-xs opacity-80">{team.role.split('|')[0].trim()}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Column - Image and Info Card */}
            <div className="flex flex-col items-center">
              {/* Main Profile Image with Background Pattern */}
              <div className="relative mb-8">
                <div className="relative w-72 h-88 bg-[url('/about/icon.png')] bg-contain bg-no-repeat bg-center flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-72 h-88 object-cover shadow-lg"
                  />
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-[#1c3c6b] mb-2">
                  {member.name}
                </h1>
                <p className="text-[#1990ff] font-medium text-lg mb-4">
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm mb-6" style={{ fontFamily: "Macha" }}>
                  {member.shortDescription}
                </p>
                <button
                  onClick={handleTalkToMe}
                  className="bg-[#1990ff] text-white px-8 py-2 rounded-full hover:bg-[#376082] transition-colors duration-200"
                  style={{ fontFamily: "Macha" }}
                >
                  Talk to me
                </button>
              </div>
            </div>

            {/* Right Column - Bio and Details */}
            <div className="space-y-6">

              {/* Bio Section */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-5xl font-extrabold text-[#1c3c6b] mb-4 border-b pb-2" style={{ fontFamily: "Chathura" }}>
                  About Me
                </h3>
                <div className="prose prose-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base" style={{ fontFamily: "Macha" }}>
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-5xl font-extrabold text-[#1c3c6b] mb-4 border-b pb-2" style={{ fontFamily: "Chathura" }}>
                  Experience
                </h2>
                <div className="space-y-4">
                  {member.experience.map((exp, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800 " style={{ fontFamily: "Macha" }}>{exp.title}</h4>
                        <p className="text-gray-600 text-sm" style={{ fontFamily: "Macha" }}>{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credentials Section */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-5xl font-extrabold text-[#1c3c6b] mb-4 border-b pb-2" style={{ fontFamily: "Chathura" }}>
                  Credentials
                </h2>
                <ul className="space-y-2">
                  {member.credentials.map((credential, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-[#1c3c6b] rounded-full mr-3"></span>
                      <span className="text-gray-700" style={{ fontFamily: "Macha" }}>{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-center gap-2">
            {teamMembers.map((team) => (
              <button
                key={team.id}
                onClick={() => handleProfileClick(team.id)}
                className="focus:outline-none flex-1"
              >
                <div className={`p-3 rounded-lg transition-colors ${team.id === id ? 'bg-[#1990ff] text-white' : 'bg-gray-100 text-gray-700'
                  }`}>
                  <div className="text-xs font-medium text-center">
                    {team.name.split(' ')[0]}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <FooterButtons />
    </>
  );
};

export default TeamProfile;