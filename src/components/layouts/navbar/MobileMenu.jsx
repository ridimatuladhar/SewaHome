import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import SocialIcons from './SocialIcons';

const BRAND       = '#376082';
const BRAND_LIGHT = '#eef3f7';

const MobileMenu = ({
  isOpen,
  openSubmenu,
  toggleSubmenu,
  handleServiceClick,
  additionalMenuItems,
  navigateToAbout,
  handleMenuClick,
  services = [],
  navigateToContact,
  navigateToLeaveReview,
}) => {
  const [openServiceCategory, setOpenServiceCategory] = useState(null);
  const [openServiceItem,     setOpenServiceItem]     = useState(null);

  const toggleServiceCategory = (title) => {
    setOpenServiceCategory(openServiceCategory === title ? null : title);
    setOpenServiceItem(null);
  };

  const toggleServiceItem = (title) => {
    setOpenServiceItem(openServiceItem === title ? null : title);
  };

  // Mirror desktop nav exactly: 4 service sections
  const homeCareServices = services.filter(item =>
    ["HOME CARE SERVICES", "TRANSITION & PLACEMENT", "SUPPORT SERVICES"].includes(item.title)
  );
  const professionalCare  = services.filter(item => item.title === "PROFESSIONAL CARE MANAGEMENT");
  const clinicalNursing   = services.filter(item => item.title === "CLINICAL NURSING SERVICES");
  const dementiaCare      = services.filter(item => item.title === "DEMENTIA CARE SPECIALISTS");

  const serviceMenuItems = [
    { title: "OUR SERVICES",      data: homeCareServices },
    { title: "PROFESSIONAL CARE", data: professionalCare },
    { title: "CLINICAL NURSING",  data: clinicalNursing },
    { title: "DEMENTIA CARE",     data: dementiaCare },
  ];

  const renderServiceSection = (sectionData) => (
    <div className="pb-2">
      {sectionData.map((category) => (
        <div key={category.title} className="mb-1">
          {/* Category header */}
          <button
            className="w-full flex justify-between items-center px-4 py-2 text-xs font-light tracking-widest uppercase rounded transition-colors"
            style={{
              color: BRAND,
              backgroundColor: openServiceCategory === category.title ? BRAND_LIGHT : 'transparent',
            }}
            onClick={() => toggleServiceCategory(category.title)}
          >
            <span>{category.title}</span>
            {openServiceCategory === category.title
              ? <ChevronUp className="w-3 h-3" />
              : <ChevronDown className="w-3 h-3" />}
          </button>

          {/* Items under category */}
          {openServiceCategory === category.title && (
            <div className="ml-3 mt-1 border-l-2 pl-2" style={{ borderColor: '#d1dde8' }}>
              {(category.items ?? [])
                .filter(serviceItem => serviceItem.isActive !== false)
                .map((serviceItem) => {
                  // subItems from API are objects: { id, serviceId, title, ... }
                  const activeSubs = (serviceItem.subItems ?? []).filter(s => s.isActive !== false);
                  const hasSubs    = activeSubs.length > 0;

                  return (
                    <div key={serviceItem.serviceId ?? serviceItem.title}>
                      {hasSubs ? (
                        <>
                          {/* Item with sub-items — toggle only, never navigate */}
                          <button
                            className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-700 rounded transition-colors"
                            style={{
                              backgroundColor: openServiceItem === serviceItem.title ? BRAND_LIGHT : 'transparent',
                            }}
                            onClick={() => toggleServiceItem(serviceItem.title)}
                          >
                            <span>{serviceItem.title}</span>
                            {openServiceItem === serviceItem.title
                              ? <ChevronUp className="w-3 h-3 text-gray-400" />
                              : <ChevronDown className="w-3 h-3 text-gray-400" />}
                          </button>

                          {openServiceItem === serviceItem.title && (
                            <div className="ml-3 mb-1 border-l pl-2" style={{ borderColor: '#d1dde8' }}>
                              {activeSubs.map((sub) => (
                                <a
                                  key={sub.serviceId ?? sub.id}
                                  href="#"
                                  // Pass the whole sub object — Navbar uses sub.serviceId for the URL
                                  onClick={(e) => handleServiceClick(sub, e)}
                                  className="flex items-center gap-2 py-1.5 px-3 text-xs text-gray-500 rounded transition-colors"
                                  onMouseEnter={e => e.currentTarget.style.color = BRAND}
                                  onMouseLeave={e => e.currentTarget.style.color = ''}
                                >
                                  <span
                                    className="w-1 h-1 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: BRAND }}
                                  />
                                  {sub.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        // Leaf item — navigate on click, pass whole object
                        <a
                          href="#"
                          onClick={(e) => handleServiceClick(serviceItem, e)}
                          className="block py-2 px-3 text-sm text-gray-600 rounded transition-colors"
                          onMouseEnter={e => {
                            e.currentTarget.style.color = BRAND;
                            e.currentTarget.style.backgroundColor = BRAND_LIGHT;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = '';
                            e.currentTarget.style.backgroundColor = '';
                          }}
                        >
                          {serviceItem.title}
                        </a>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`lg:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-screen overflow-y-auto" : "max-h-0"
      }`}
    >
      <div className="px-4 pt-2 pb-6">
        {/* Social icons row */}
        <div className="flex items-center justify-end space-x-4 py-3 border-b border-gray-200">
          <SocialIcons />
        </div>

        <nav className="py-2">

          {/* ABOUT US */}
          <div className="mb-1 border-b border-gray-100">
            <button
              className="w-full flex items-center py-3 text-sm font-bold tracking-wide transition-colors"
              style={{ color: BRAND }}
              onClick={navigateToAbout}
            >
              ABOUT US
            </button>
          </div>

          {/* 4 Service sections */}
          {serviceMenuItems.map((section) => (
            <div key={section.title} className="mb-1 border-b border-gray-100">
              <button
                className="w-full flex justify-between items-center py-3 text-sm font-bold tracking-wide transition-colors"
                style={{ color: BRAND }}
                onClick={() => {
                  toggleSubmenu(section.title);
                  if (openSubmenu === section.title) {
                    setOpenServiceCategory(null);
                    setOpenServiceItem(null);
                  }
                }}
              >
                <span>{section.title}</span>
                {openSubmenu === section.title
                  ? <ChevronUp className="w-4 h-4" style={{ color: BRAND }} />
                  : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  openSubmenu === section.title ? "max-h-[2000px]" : "max-h-0"
                }`}
              >
                {renderServiceSection(section.data)}
              </div>
            </div>
          ))}

          {/* MENU (flat list) */}
          <div className="mb-1">
            <button
              className="w-full flex justify-between items-center py-3 text-sm font-bold tracking-wide transition-colors"
              style={{ color: BRAND }}
              onClick={() => toggleSubmenu("MENU")}
            >
              <span>MENU</span>
              {openSubmenu === "MENU"
                ? <ChevronUp className="w-4 h-4" style={{ color: BRAND }} />
                : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                openSubmenu === "MENU" ? "max-h-[600px]" : "max-h-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-1 pb-3">
                {(additionalMenuItems || []).map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={(e) => handleMenuClick(item, e)}
                    className="flex items-center justify-center text-center px-3 py-2 text-xs font-semibold tracking-wide rounded border border-transparent transition-all"
                    style={{ color: '#374151', borderColor: 'transparent' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = BRAND;
                      e.currentTarget.style.backgroundColor = BRAND_LIGHT;
                      e.currentTarget.style.borderColor = BRAND;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;