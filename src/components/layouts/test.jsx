import { Search, Menu, X, ChevronDown, ChevronUp, Link } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const serviceData = {
    "COMPREHENSIVE HOME CARE SOLUTIONS": {
      title: "Comprehensive Home Care Solutions",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      description:
        "Our personalized extensive range of services caters to every need. From companion and personal care to specialized support for Alzheimer's and dementia, our offerings are as diverse as our clients. Our hospital-to-home transitional care ensures a smooth adjustment post-discharge, and our respite services offer invaluable support to family caregivers.",
    },
    "EXPERIENCED CARE MANAGERS OVERSIGHT": {
      title: "Experienced Care Managers Oversight",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=400&fit=crop",
      description:
        "Sewa Home Care, led by experienced RNs brings professional oversight into your home. Our team's extensive healthcare background ensures top-notch care management, offering specialized nursing visits, chronic condition management, and health monitoring. This ensures a highly personalized and professional approach to home care. Every care plan is meticulously crafted and managed, offering peace of mind that you or your loved ones truly deserve.",
    },
    "COMPLETE GERIATRIC SUPPORT": {
      title: "Complete Geriatric Support",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      description:
        "Our personalized extensive range of services caters to every need. From companion and personal care to specialized support for Alzheimer's and dementia, our offerings are as diverse as our clients. Our hospital-to-home transitional care ensures a smooth adjustment post-discharge, and our respite services offer invaluable support to family caregivers.",
    },
    "NURSING VISITS & HEALTH MONITORING": {
      title: "Nursing Visits & Health Monitoring",
      image:
        "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=400&fit=crop",
      description:
        "Our service portfolio also includes on-demand and regular nursing visits for those requiring medical oversight at home. From chronic condition management to post-operative care, our nurses ensure your health needs are expertly addressed. This cornerstone service reflects our commitment to maintaining the highest standards of health and well-being for our clients.",
    },
    "MOBILITY AND INDEPENDENCE": {
      title: "Mobility and Independence",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      description:
        "Our transportation services ensure that clients maintain their independence, with assistance for medical appointments, social engagements, and more, prioritizing the quality of life and ease of access to the wider community. This service underscores our commitment to enhancing the quality of life for our clients.",
    },
    "TECHNOLOGY-ENABLED PEACE OF MIND": {
      title: "Technology-Enabled Peace of Mind",
      image:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=400&fit=crop",
      description:
        "Utilizing advanced care technologies, we keep families informed and involved in their loved ones' care through online portals and direct communication, enhancing the caregiving experience for everyone involved.",
    },
    "FLEXIBLE CARE PLANS": {
      title: "Flexible Care Plans",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
      description:
        "Every client's care plan is as unique as they are, developed and adapted over time by our dedicated care coordinators to reflect changing needs and preferences, ensuring the most effective and compassionate care.",
    },
  };

  const additionalMenuItems = [
    "HOMECARE MASSACHUSETTS",
    "JOB OPPORTUNITIES",
    "JOIN OUR TEAM",
    "MYHOMEHEALTHAIDES",
    "NON-DISCRIMINATION POLICY",
    "OUR PARTNERS",
    "CONTACT US",
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleMenuEnter = (title) => {
    setActiveMenu(title);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const handleScrollTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServiceClick = (serviceName, e) => {
    e.preventDefault();
    if (serviceData[serviceName]) {
      setSelectedService(serviceData[serviceName]);
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
    }
  };

  const handleAboutClick = (sectionName, e) => {
    e.preventDefault();
    let sectionId = "";

    switch (sectionName) {
      case "MEET THE TEAM":
        sectionId = "meet-the-team";
        break;
      case "WHO WE ARE":
        sectionId = "who-we-are";
        break;
      case "OUR PARTNERS":
        sectionId = "our-partners";
        break;
      case "CONTACT US":
        sectionId = "contact-us";
        break;
      default:
        return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    console.log("Logo clicked - implement navigation logic");
  };

  // Full-width dropdown content components
  const ServicesDropdownContent = ({ items, onServiceClick }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => onServiceClick(item, e)}
            className="block p-4 rounded-lg border border-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 cursor-pointer group"
          >
            <div className="font-semibold text-sm mb-2 group-hover:text-blue-600">
              {item}
            </div>
            <div className="text-xs text-gray-500 group-hover:text-blue-500">
              Professional care services tailored to your needs
            </div>
          </a>
        ))}
      </div>
    );
  };

  const AboutDropdownContent = ({ items, onAboutClick }) => {
    return (
      <div className="p-6">
        {/* <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About Our Company</h3>
          <p className="text-sm text-gray-600">Learn more about who we are and what we do</p>
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={(e) => onAboutClick(item, e)}
              className="block p-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer group"
            >
              <div className="font-semibold text-sm group-hover:text-blue-600 mb-1">
                {item}
              </div>
              <div className="text-xs text-gray-500 group-hover:text-blue-500">
                Discover our story and values
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const ReviewsDropdownContent = ({ items, onAboutClick }) => {
    return (
      <div className="p-6">
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold text-yellow-500 mb-2">★★★★★</div>
          <p className="text-sm text-gray-600">See what our customers say</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={(e) => onAboutClick(item, e)}
              className="block p-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer group text-center"
            >
              <div className="font-semibold text-sm group-hover:text-blue-600 mb-1">
                {item}
              </div>
              <div className="text-xs text-gray-500 group-hover:text-blue-500">
                Read authentic reviews
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const MenuDropdownContent = ({ items, onAboutClick }) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => onAboutClick(typeof item === 'string' ? item : item.name, e)}
            className="block p-4 text-center hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer rounded-lg border border-gray-100 group"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="text-xs font-medium group-hover:text-blue-600">
              {typeof item === 'string' ? item : item.name}
            </div>
          </a>
        ))}
      </div>
    );
  };

  // Desktop Menu Item Component with Full-Width Dropdown
  const DesktopMenuItem = ({ title, id, items = [], dropdownType = "default", onItemClick }) => {
    const renderDropdownContent = () => {
      switch (dropdownType) {
        case "services":
          return <ServicesDropdownContent items={items} onServiceClick={onItemClick} />;
        case "about":
          return <AboutDropdownContent items={items} onAboutClick={onItemClick} />;
        case "reviews":
          return <ReviewsDropdownContent items={items} onAboutClick={onItemClick} />;
        case "menu":
          return <MenuDropdownContent items={items} onAboutClick={onItemClick} />;
        default:
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
              {items.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(e) => onItemClick(item, e)}
                  className="block p-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  <div className="font-medium text-sm">{item}</div>
                </a>
              ))}
            </div>
          );
      }
    };

    return (
      <div
        className="relative"
        onMouseEnter={() => handleMenuEnter(title)}
        onMouseLeave={handleMenuLeave}
      >
        <a
          onClick={() => handleScrollTo(id)}
          className="text-black text-[14px] hover:text-blue-600 py-2 transition-colors duration-200 tracking-wider cursor-pointer"
          style={{ fontFamily: "century" }}
        >
          {title}
        </a>

        {items.length > 0 && activeMenu === title && (
          <div 
            className="absolute top-full left-0 w-screen bg-white shadow-xl border-t border-gray-200 z-50"
            style={{ 
              left: '70%', 
              transform: 'translateX(-50%)',
              maxWidth: '100vw'
            }}
          >
            <div className=" mx-auto">
              {renderDropdownContent()}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Desktop Additional Menu Component with Full-Width Dropdown
  const DesktopAdditionalMenu = ({ title, items = [] }) => {
    return (
      <div
        className="relative "
        onMouseEnter={() => handleMenuEnter(title)}
        onMouseLeave={handleMenuLeave}
      >
        <button
          className="text-gray-700 hover:text-blue-600 font-semibold text-[14px] py-2 mr-8 flex items-center transition-colors duration-200 tracking-wider"
          style={{ fontFamily: "century" }}
        >
          {title}
        </button>
        
        {activeMenu === title && (
          <div 
            className="absolute top-full right-0 w-screen bg-white shadow-xl border-t border-gray-200 z-50"
            style={{ 
              right: '50%', 
              transform: 'translateX(50%)',
              maxWidth: '100vw'
            }}
          >
            <div className="max-w-7xl mx-auto">
              <MenuDropdownContent items={items} onAboutClick={handleAboutClick} />
            </div>
          </div>
        )}
      </div>
    );
  };

  // Social Icons Component
  const SocialIcons = () => {
    return (
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 8.75a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5"
          />
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M6.77 3.082a47.5 47.5 0 0 1 10.46 0c1.899.212 3.43 1.707 3.653 3.613a45.7 45.7 0 0 1 0 10.61c-.223 1.906-1.754 3.401-3.652 3.614a47.5 47.5 0 0 1-10.461 0c-1.899-.213-3.43-1.708-3.653-3.613a45.7 45.7 0 0 1 0-10.611C3.34 4.789 4.871 3.294 6.77 3.082M17 6a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-9.75 6a4.75 4.75 0 1 1 9.5 0a4.75 4.75 0 0 1-9.5 0"
            clipRule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07l-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
            <path
              fill="currentColor"
              d="M12 4c.855 0 1.732.022 2.582.058l1.004.048l.961.057l.9.061l.822.064a3.8 3.8 0 0 1 3.494 3.423l.04.425l.075.91c.07.943.122 1.971.122 2.954s-.052 2.011-.122 2.954l-.075.91l-.04.425a3.8 3.8 0 0 1-3.495 3.423l-.82.063l-.9.062l-.962.057l-1.004.048A62 62 0 0 1 12 20a62 62 0 0 1-2.582-.058l-1.004-.048l-.961-.057l-.9-.062l-.822-.063a3.8 3.8 0 0 1-3.494-3.423l-.04-.425l-.075-.91A41 41 0 0 1 2 12c0-.983.052-2.011.122-2.954l.075-.91l.04-.425A3.8 3.8 0 0 1 5.73 4.288l.821-.064l.9-.061l.962-.057l1.004-.048A62 62 0 0 1 12 4m-2 5.575v4.85c0 .462.5.75.9.52l4.2-2.425a.6.6 0 0 0 0-1.04l-4.2-2.424a.6.6 0 0 0-.9.52Z"
            />
          </g>
        </svg>
      </div>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/30 shadow-sm">
        {/* Main Navbar Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar - Logo and Mobile Menu Button */}
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="/home">
                <img
                  src="/main-logo/logo.png"
                  alt=""
                  className="h-10 lg:relative lg:top-7 lg:h-30"
                  onClick={handleLogoClick}
                />
              </a>
            </div>

            {/* Desktop Social Icons and Search */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center mr-8">
                <SocialIcons />
                <button className="bg-gray-100 rounded-full p-2 pl-50 ml-10 border border-blue-500 hover:bg-gray-200 transition-colors">
                  <Search className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu Section */}
          <div 
            className="hidden lg:block"
            onMouseLeave={handleMenuLeave}
          >
            <div className="flex items-center justify-end pt-4">
              {/* Main Menu Items Container */}
              <div className="flex space-x-8">
                {/* About Us Menu Item */}
                <DesktopMenuItem
                  title="ABOUT US"
                  id="about-us"
                  items={["MEET THE TEAM", "WHO WE ARE"]}
                  dropdownType="about"
                  onItemClick={handleAboutClick}
                />

                {/* Services Menu Item */}
                <DesktopMenuItem
                  title="OUR SERVICES"
                  id="our-services"
                  items={[
                    "COMPREHENSIVE HOME CARE SOLUTIONS",
                    "EXPERIENCED CARE MANAGERS OVERSIGHT",
                    "COMPLETE GERIATRIC SUPPORT",
                    "NURSING VISITS & HEALTH MONITORING",
                    "MOBILITY AND INDEPENDENCE",
                    "TECHNOLOGY-ENABLED PEACE OF MIND",
                    "FLEXIBLE CARE PLANS",
                  ]}
                  dropdownType="services"
                  onItemClick={handleServiceClick}
                />

                {/* Testimonials Menu Item */}
                <DesktopMenuItem
                  title="TESTIMONIALS"
                  id="testimonials"
                  items={[]}
                  dropdownType="default"
                  onItemClick={handleAboutClick}
                />

                {/* Reviews Menu Item */}
                <DesktopMenuItem
                  title="VIEW REVIEWS"
                  id="join-our-team"
                  items={["GOOGLE BUSINESS REVIEWS", "CARE.COM REVIEWS"]}
                  dropdownType="reviews"
                  onItemClick={handleAboutClick}
                />
              </div>

              {/* Additional Menu Container */}
              <div className="ml-60">
                <DesktopAdditionalMenu
                  title="MENU"
                  items={additionalMenuItems}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Section */}
        <div
          className={`lg:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4">
            <div className="flex items-center justify-end space-x-4 py-3 border-b border-gray-200">
              <SocialIcons />
              <button className="bg-gray-100 rounded-full p-2 border border-blue-500">
                <Search className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <nav className="py-2">
              {[
                {
                  title: "ABOUT US",
                  id: "about-us",
                  items: ["MEET THE TEAM", "WHO WE ARE"],
                },
                {
                  title: "OUR SERVICES",
                  id: "our-services",
                  items: [
                    "COMPREHENSIVE HOME CARE SOLUTIONS",
                    "EXPERIENCED CARE MANAGERS OVERSIGHT",
                    "COMPLETE GERIATRIC SUPPORT",
                    "NURSING VISITS & HEALTH MONITORING",
                    "MOBILITY AND INDEPENDENCE",
                    "TECHNOLOGY-ENABLED PEACE OF MIND",
                    "FLEXIBLE CARE PLANS",
                  ],
                },
                {
                  title: "TESTIMONIALS",
                  id: "testimonials",
                  items: [],
                },
                {
                  title: "VIEW REVIEWS",
                  id: "join-our-team",
                  items: ["GOOGLE BUSINESS REVIEWS", "CARE.COM REVIEWS"],
                },
                { title: "MENU", items: additionalMenuItems },
              ].map((item) => (
                <div
                  key={item.title}
                  className="mb-2 border-b border-gray-100 last:border-0"
                >
                  <button
                    className="w-full flex justify-between items-center py-3 text-gray-700 font-medium"
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    <span>{item.title}</span>
                    {item.items.length > 0 && (
                      <>
                        {openSubmenu === item.title ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </>
                    )}
                  </button>
                  {item.items.length > 0 && (
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-in-out ${
                        openSubmenu === item.title ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="pb-2">
                        {item.items.map((subItem, index) => (
                          <a
                            key={index}
                            href="#"
                            onClick={(e) =>
                              item.title === "OUR SERVICES"
                                ? handleServiceClick(subItem, e)
                                : handleAboutClick(subItem, e)
                            }
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Service Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600 pr-8">
              {selectedService.title}
            </h2>
            <img
              src={selectedService.image}
              alt={selectedService.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-gray-700 leading-relaxed">
              {selectedService.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;