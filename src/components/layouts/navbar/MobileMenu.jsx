import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import NavbarCTAs from './NavbarCTAs';

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

  const toggleServiceCategory = (title, sectionTitle) => {
    if (openServiceCategory === title) {
      setOpenServiceCategory(null);
    } else {
      setOpenServiceCategory(title);
      if (openSubmenu !== sectionTitle) {
        toggleSubmenu(sectionTitle);
      }
    }
    setOpenServiceItem(null);
  };

  const toggleServiceItem = (title) => {
    setOpenServiceItem(openServiceItem === title ? null : title);
  };

  // ✅ Match title-case strings returned by the API
  const homeCareServices = services.filter(item =>
    ["Home Care Services", "Transition and Placement", "Support Services"].includes(item.title)
  );
  const professionalCare = services.filter(item =>
    item.title === "Professional Care Management"
  );
  const clinicalNursing = services.filter(item =>
    item.title === "Clinical Nursing Services"
  );
  const dementiaCare = services.filter(item =>
    item.title === "Dementia Care Specialists"
  );

  const serviceMenuItems = [
    { title: "OUR SERVICES",      data: homeCareServices },
    { title: "PROFESSIONAL CARE", data: professionalCare },
    { title: "CLINICAL NURSING",  data: clinicalNursing },
    { title: "DEMENTIA CARE",     data: dementiaCare },
  ];

  const renderServiceSection = (sectionData, sectionTitle) => (
    <div className="pb-2">
      {sectionData.map((category) => (
        <div key={category.title} className="mb-1">
          <button
            className="w-full flex justify-between items-center px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded transition-colors"
            style={{
              color: BRAND,
              fontFamily: "century, 'Century Gothic', sans-serif",
              backgroundColor: openServiceCategory === category.title ? BRAND_LIGHT : 'transparent',
            }}
            onClick={() => toggleServiceCategory(category.title, sectionTitle)}
          >
            <span>{category.title}</span>
            {openServiceCategory === category.title
              ? <ChevronUp className="w-3 h-3" />
              : <ChevronDown className="w-3 h-3" />}
          </button>

          {openServiceCategory === category.title && (
            <div className="ml-3 mt-1 border-l-2 pl-2" style={{ borderColor: '#d1dde8' }}>
              {(category.items ?? [])
                .filter(serviceItem => serviceItem.isActive !== false)
                .map((serviceItem) => {
                  const activeSubs = (serviceItem.subItems ?? []).filter(s => s.isActive !== false);
                  const hasSubs    = activeSubs.length > 0;

                  return (
                    <div key={serviceItem.serviceId ?? serviceItem.title}>
                      {hasSubs ? (
                        <>
                          <button
                            className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-600 rounded transition-colors"
                            style={{
                              fontFamily: "century, 'Century Gothic', sans-serif",
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
                                  href={sub.serviceId ? `/services/${sub.serviceId}` : '#'}
                                  onClick={(e) => handleServiceClick(sub, e)}
                                  className="flex items-center gap-2 py-1.5 px-3 text-xs text-gray-500 rounded transition-colors hover:text-[#376082] hover:bg-[#eef3f7]"
                                  style={{ fontFamily: "century, 'Century Gothic', sans-serif" }}
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
                        <a
                          href={serviceItem.serviceId ? `/services/${serviceItem.serviceId}` : '#'}
                          onClick={(e) => handleServiceClick(serviceItem, e)}
                          className="block py-2 px-3 text-sm text-gray-600 rounded transition-colors hover:text-[#376082] hover:bg-[#eef3f7]"
                          style={{ fontFamily: "century, 'Century Gothic', sans-serif" }}
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
        <div className="flex items-center justify-end space-x-4 py-3 border-b border-gray-200">
          <NavbarCTAs />
        </div>

        <nav className="py-2">
          {/* ABOUT US */}
          <div className="mb-1 border-b border-gray-100">
            <button
              className="w-full flex items-center py-3 text-sm font-bold tracking-wide transition-colors"
              style={{ color: BRAND, fontFamily: "century, 'Century Gothic', sans-serif" }}
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
                style={{ color: BRAND, fontFamily: "century, 'Century Gothic', sans-serif" }}
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
                {renderServiceSection(section.data, section.title)}
              </div>
            </div>
          ))}

          {/* MENU (grouped) */}
          <div className="mb-1">
            <button
              className="w-full flex justify-between items-center py-3 text-sm font-bold tracking-wide transition-colors"
              style={{ color: BRAND, fontFamily: "century, 'Century Gothic', sans-serif" }}
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
              <div className="flex flex-col gap-4 pb-3">
                {(additionalMenuItems || []).map((group, gIdx) => (
                  <div key={group.heading || gIdx} className="px-2">
                    <p
                      className="text-[10px] font-bold uppercase mb-2 pb-1 border-b border-gray-100 tracking-widest"
                      style={{ color: BRAND, fontFamily: "century, 'Century Gothic', sans-serif" }}
                    >
                      {group.heading}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {(group.items || []).map((item) => {
                        const label = typeof item === 'string' ? item : item.label;
                        const href  = typeof item === 'string' ? '#' : (item.href ?? '#');
                        const ext   = typeof item !== 'string' && item.external;
                        return (
                          <a
                            key={label}
                            href={href}
                            target={ext ? '_blank' : undefined}
                            rel={ext ? 'noopener noreferrer' : undefined}
                            onClick={(e) => handleMenuClick(label, e)}
                            className="px-3 py-2 text-sm text-gray-600 rounded transition-colors hover:text-[#376082] hover:bg-[#eef3f7]"
                            style={{ fontFamily: "century, 'Century Gothic', sans-serif" }}
                          >
                            {label.charAt(0) + label.slice(1).toLowerCase()}
                          </a>
                        );
                      })}
                    </div>
                  </div>
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