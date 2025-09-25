import React from 'react';
import { FaCalendarAlt, FaUsers, FaUserCheck, FaStar } from 'react-icons/fa';

const TrustMetrics = () => {
  const metrics = [
    {
      value: "5+",
      label: "Years of Trust"
    },
    {
      value: "1,800+",
      label: "Families Supported"
    },
    {
      value: "900+",
      label: "Certified Caregivers"
    },
    {
        icon: <FaStar className="text-yellow-400 w-10 h-10 mx-auto mb-2" />,
      value: "4.9/5",
      label: "Average Google Ratings"
    }
  ];

  return (
    <div className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
       
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 text-[#376082] cursor-pointer"
            >
                <div className="flex items-center justify-center">               
              
              <h3 className="text-4xl font-semibold text-[#376082] mb-2">
                {metric.value}
              </h3>
              <div className="ml-2">
                {metric.icon}
              </div>
              </div>
              <p className="text-lg text-black font-medium">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default TrustMetrics;