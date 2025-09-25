import React from "react";
import Navbar from "../../layouts/Navbar";
import FooterButtons from "../../home/FooterButtons";
import { Briefcase, MapPin, Clock } from "lucide-react";

const jobOpenings = [
  {
    title: "Certified Nursing Assistant (CNA)",
    location: "Boston, MA",
    type: "Full-Time",
    description:
      "Provide compassionate daily care and support for elderly clients in their homes. Assist with personal hygiene, meals, mobility, and companionship.",
  },
  {
    title: "Home Health Aide (HHA)",
    location: "Cambridge, MA",
    type: "Part-Time",
    description:
      "Support patients with daily living activities, monitor their health, and provide emotional support. Training is provided for new team members.",
  },
  {
    title: "Registered Nurse (RN)",
    location: "Remote / Field Visits",
    type: "Contract",
    description:
      "Oversee patient care plans, perform medical assessments, and collaborate with caregivers to ensure the highest quality of home care.",
  },
];

const Opportunities = () => {
  return (
    <div className="flex flex-col">
      <Navbar />

      {/* Header Section */}
      <div className="bg-[#f8fafc] mt-16 py-16 px-6 text-center">
        <h1
          className="text-5xl md:text-6xl font-extrabold text-[#376082] mb-4"
          style={{ fontFamily: "Chathura" }}
        >
          Current Job Opportunities
        </h1>
        <p
          className="text-lg md:text-xl text-[#376082] max-w-2xl mx-auto"
          style={{ fontFamily: "Macha" }}
        >
          Join our compassionate home care team and make a meaningful impact in
          your community. Explore the openings below and find your next
          rewarding role.
        </p>
      </div>

      {/* Job Listings */}
      <div className="flex-grow container mx-auto px-6 py-12 grid gap-8 max-w-5xl">
        {jobOpenings.map((job, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 cursor-pointer"
          >
            <h2
              className="text-xl md:text-2xl font-bold text-[#376082] mb-4"
              style={{ fontFamily: "macha" }}
            >
              {job.title}
            </h2>

            <p
              className="text-[#376082] mb-6 leading-relaxed"
              style={{ fontFamily: "Macha" }}
            >
              {job.description}
            </p>

            <div className="flex flex-wrap gap-6 text-[#376082] mb-6">
              <span className="flex items-center gap-2 text-sm md:text-base">
                <MapPin className="w-5 h-5" /> {job.location}
              </span>
              <span className="flex items-center gap-2 text-sm md:text-base">
                <Clock className="w-5 h-5" /> {job.type}
              </span>
              <span className="flex items-center gap-2 text-sm md:text-base">
                <Briefcase className="w-5 h-5" /> Home Care Department
              </span>
            </div>

            <button
              className="bg-transparent hover:bg-[#376082] text-[#376082] hover:text-white font-semibold py-2 px-6 rounded-xl border-2 border-[#376082] transition-all duration-300 shadow-md hover:shadow-xl"
              style={{ fontFamily: "lexend" }}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <FooterButtons />
    </div>
  );
};

export default Opportunities;
