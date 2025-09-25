// Services.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "./serviceData";

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const navigate = useNavigate();

  const handleHover = (id) => setHoveredService(id);
  const handleLeave = () => setHoveredService(null);
  
  const navigateToService = (serviceId) => {
     window.location.href = `/services/${serviceId}`;
  };

  // Define service rows
  const serviceRows = [
    [1, 5, 9],    // Row 1
    [2, 6, 10],   // Row 2
    [3, 7, 11],   // Row 3
    [4, 8]        // Row 4
  ];

  const renderServiceCard = (service) => {
    const IconComponent = service.icon;
    const isHovered = hoveredService === service.id;
    
    return (
      <div
        key={service.id}
        className={`relative transition-all duration-300 ease-in-out cursor-pointer group 
          ${isHovered ? "transform scale-105 z-10" : ""}`}
        onMouseEnter={() => handleHover(service.id)}
        onMouseLeave={handleLeave}
        onClick={() => navigateToService(service.serviceId)}
      >
        <div className="bg-[#E8F4FD] rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl min-h-[280px]">
          {/* Icon */}
          <div className="mb-6 p-4 rounded-full bg-white/50 transition-all duration-300 group-hover:bg-white/80">
            <IconComponent 
              size={48} 
              className="text-[#6B9BD2] transition-all duration-300 group-hover:text-[#376082] group-hover:scale-110" 
            />
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold text-[#6B9BD2] mb-4 transition-colors duration-300 group-hover:text-[#376082]">
            {service.shortTitle}
          </h3>
          
          {/* Hover Information */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isHovered
                ? "max-h-32 opacity-100 transform translate-y-0"
                : "max-h-0 opacity-0 transform translate-y-2"
            }`}
          >
            <p className="text-sm text-gray-700 leading-relaxed px-2">
              {service.hoverInfo}
            </p>
            <div className="mt-3 text-xs text-[#376082] font-medium">
              Click to learn more →
            </div>
          </div>
        </div>
        
        {/* Hover Border Effect */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 pointer-events-none ${
            isHovered 
              ? "border-[#376082] shadow-lg" 
              : "border-transparent"
          }`}
        />
      </div>
    );
  };

  return (
    <div className="py-12 px-4" id="our-services">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 
          className="text-5xl md:text-7xl font-extrabold text-[#376082] mb-6" 
          style={{ fontFamily: "Chathura" }}
        >
          Expertly Managed, Whole-Person Home Care
        </h1>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          Experience peace of mind with expertly managed home care. Our custom plans combine clinical support, 
          geriatric expertise, and smart technology to promote your loved one's independence and well-being at home.
        </p>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl md:text-7xl font-bold text-center text-[#376082] mb-12"
          style={{ fontFamily: "Chathura" }}
        >
          Explore Our Services
        </h1>

        {/* Services Grid - Row Layout */}
        <div className="max-w-7xl mx-auto px-4" style={{ fontFamily: "outfit" }}>
          <div className="flex flex-col gap-8">
            {serviceRows.map((rowServiceIds, rowIndex) => (
              <div 
                key={rowIndex} 
                className={`grid gap-6 justify-items-center ${
                  rowIndex === serviceRows.length - 1 
                    ? "grid-cols-1 md:grid-cols-2 md:justify-center md:max-w-2xl md:mx-auto" 
                    : "grid-cols-1 md:grid-cols-3"
                }`}
              >
                {rowServiceIds.map(serviceId => {
                  const service = services.find(s => s.id === serviceId);
                  return service ? renderServiceCard(service) : null;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;