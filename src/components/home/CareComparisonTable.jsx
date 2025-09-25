import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const CareComparisonTable = () => {
  const [expandedRows, setExpandedRows] = useState({});
  
  const comparisonData = [
    {
      feature: "Thoroughly Screened & Insured Caregivers",
      sewaHomeCare: true,
      basicAgency: false,
      privateCaregiver: false,
      facility: true,
      noSupport: false,
      description: "All caregivers undergo comprehensive background checks and are fully insured for your protection."
    },
    {
      feature: "Active Fall Prevention Plan",
      sewaHomeCare: true,
      basicAgency: true,
      privateCaregiver: false,
      facility: true,
      noSupport: false,
      description: "Proactive measures and monitoring to prevent falls, a leading cause of injury for seniors."
    },
    {
      feature: "24/7 Professional Support",
      sewaHomeCare: true,
      basicAgency: false,
      privateCaregiver: false,
      facility: true,
      noSupport: false,
      description: "Round-the-clock access to professional support for emergencies or care questions."
    },
    {
      feature: "Expertly Trained in Senior Care",
      sewaHomeCare: true,
      basicAgency: false,
      privateCaregiver: false,
      facility: true,
      noSupport: false,
      description: "Specialized training in senior care needs, including dementia, mobility, and medication management."
    },
    {
      feature: "Backup Caregiver Guarantee",
      sewaHomeCare: true,
      basicAgency: false,
      privateCaregiver: false,
      facility: false,
      noSupport: false,
      description: "Guaranteed coverage with a backup caregiver when your primary caregiver is unavailable."
    },
    {
      feature: "Care Personalized to Evolving Needs",
      sewaHomeCare: true,
      basicAgency: false,
      privateCaregiver: false,
      facility: false,
      noSupport: false,
      description: "Care plans that adapt as needs change, ensuring appropriate support at every stage."
    }
  ];

  const toggleRow = (index) => {
    setExpandedRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const CheckIcon = ({ checked }) => (
    <div className="flex justify-center items-center">
      {checked ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      )}
    </div>
  );

  // Column headers for reusability
  const columnHeaders = [
    { key: 'sewaHomeCare', label: 'Sewa Home Care', bgColor: 'bg-slate-600', textColor: 'text-white' },
    { key: 'basicAgency', label: 'Basic Agency', bgColor: 'bg-blue-100', textColor: 'text-gray-700' },
    { key: 'privateCaregiver', label: 'Private Caregiver', bgColor: 'bg-blue-100', textColor: 'text-gray-700' },
    { key: 'facility', label: 'Facility', bgColor: 'bg-blue-100', textColor: 'text-gray-700' },
    { key: 'noSupport', label: 'No support', bgColor: 'bg-blue-100', textColor: 'text-gray-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-10 md:mb-12">
               <h1
        className="text-5xl md:text-7xl font-extrabold text-center text-[#376082] mb-4"
        style={{ fontFamily: "Chathura" }}
      >
       Finding Peace of Mind: How Your Options Compare
      </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Sewa Home care helps seniors and individuals with challenges maintain their 
          independence, safety, and quality of life in the place they love most.
        </p>
      </div>

      {/* Desktop/Large Tablet Comparison Table */}
      <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 bg-gray-100">
          <div className="p-4 font-medium text-gray-700 bg-blue-100">
            Care Consideration
          </div>
          {columnHeaders.map((header, index) => (
            <div key={index} className={`p-4 text-center font-medium ${header.textColor} ${header.bgColor}`}>
              {header.label}
            </div>
          ))}
        </div>

        {/* Table Body */}
        {comparisonData.map((row, index) => (
          <div key={index} className={`grid grid-cols-6 border-b border-gray-200 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}>
            <div className="p-4 font-medium text-gray-800 border-r border-gray-200">
              {row.feature}
            </div>
            <div className="p-4 border-r border-gray-200">
              <CheckIcon checked={row.sewaHomeCare} />
            </div>
            <div className="p-4 border-r border-gray-200">
              <CheckIcon checked={row.basicAgency} />
            </div>
            <div className="p-4 border-r border-gray-200">
              <CheckIcon checked={row.privateCaregiver} />
            </div>
            <div className="p-4 border-r border-gray-200">
              <CheckIcon checked={row.facility} />
            </div>
            <div className="p-4">
              <CheckIcon checked={row.noSupport} />
            </div>
          </div>
        ))}
      </div>

      {/* Medium Tablet View (simplified table) */}
      <div className="hidden md:block lg:hidden mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Simplified header */}
          <div className="grid grid-cols-3 bg-gray-100">
            <div className="p-3 font-medium text-gray-700 bg-blue-100">Feature</div>
            <div className="p-3 text-center font-medium text-white bg-slate-600">Sewa Home Care</div>
            <div className="p-3 text-center font-medium text-gray-700 bg-blue-100">Others</div>
          </div>
          
          {/* Simplified rows */}
          {comparisonData.map((row, index) => (
            <div key={index} className={`grid grid-cols-3 border-b border-gray-200 ${
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
            }`}>
              <div className="p-3 font-medium text-gray-800 border-r border-gray-200">
                {row.feature}
              </div>
              <div className="p-3 border-r border-gray-200 flex justify-center">
                <CheckIcon checked={row.sewaHomeCare} />
              </div>
              <div className="p-3 flex justify-center">
                <CheckIcon checked={row.basicAgency || row.privateCaregiver || row.facility} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">
          Note: "Others" column shows if any alternative option provides this feature
        </p>
      </div>

      {/* Mobile Version - Card Based */}
      <div className="md:hidden mt-8 space-y-4">
        {comparisonData.map((row, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleRow(index)}
            >
              <h4 className="font-semibold text-gray-800 text-sm">{row.feature}</h4>
              {expandedRows[index] ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            
            {expandedRows[index] && row.description && (
              <p className="text-sm text-gray-600 mt-2 mb-3">{row.description}</p>
            )}
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className={`flex items-center justify-between p-2 rounded ${row.sewaHomeCare ? 'bg-green-50' : 'bg-gray-50'}`}>
                <span className="text-xs font-medium">Sewa Home Care</span>
                <CheckIcon checked={row.sewaHomeCare} />
              </div>
              <div className={`flex items-center justify-between p-2 rounded ${row.basicAgency ? 'bg-green-50' : 'bg-gray-50'}`}>
                <span className="text-xs font-medium">Basic Agency</span>
                <CheckIcon checked={row.basicAgency} />
              </div>
              <div className={`flex items-center justify-between p-2 rounded ${row.privateCaregiver ? 'bg-green-50' : 'bg-gray-50'}`}>
                <span className="text-xs font-medium">Private Caregiver</span>
                <CheckIcon checked={row.privateCaregiver} />
              </div>
              <div className={`flex items-center justify-between p-2 rounded ${row.facility ? 'bg-green-50' : 'bg-gray-50'}`}>
                <span className="text-xs font-medium">Facility</span>
                <CheckIcon checked={row.facility} />
              </div>
              <div className={`flex items-center justify-between p-2 rounded ${row.noSupport ? 'bg-green-50' : 'bg-gray-50'}`}>
                <span className="text-xs font-medium">No Support</span>
                <CheckIcon checked={row.noSupport} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareComparisonTable;