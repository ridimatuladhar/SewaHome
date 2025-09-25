import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import SocialIcons from "./navbar/Socialicons";
import DesktopMenuItem from "./navbar/DesktopMenu";
import MobileMenu from "./navbar/MobileMenu";
import ServiceModal from "./navbar/ServiceModal";
import DesktopAdditionalMenu from "./navbar/DesktopAdditionalMenu";
import { additionalMenuItems } from "./navbar/ServiceData";
import { useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { // scroll down
        setIsVisible(false);
        setActiveMenu(null); // Close dropdowns when hiding navbar
      } else { // scroll up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

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

  const navigateToAbout = () => {
    navigate("/about");
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  };


  const handleServiceClick = (serviceName, e) => {
    e.preventDefault();

    // Map service names to their route IDs
    const serviceRoutes = {
      "COMPREHENSIVE HOME CARE SOLUTIONS": "comprehensive-home-care",
      "EXPERIENCED CARE MANAGERS OVERSIGHT": "care-manager-oversight",
      "COMPLETE GERIATRIC SUPPORT": "geriatric-support",
      "NURSING VISITS & HEALTH MONITORING": "nursing-visits",
      "TRANSITIONAL ASSISTANCE": "transitional-assistance",
      "MOBILITY AND INDEPENDENCE": "mobility-independence",
      "TECHNOLOGY-ENABLED PEACE OF MIND": "technology-enabled-care",
      "FLEXIBLE CARE PLANS": "flexible-care-plans",
      "HOME SEARCH ENTITY": "home-search-entity",
      "NON MEDICAL TRANSPORTATION": "non-medical-transportation",
      "ASSISTED LIVING REFERRALS": "assisted-living-referrals"
    };

    const routeId = serviceRoutes[serviceName];
    if (routeId) {
      window.location.href = `/services/${routeId}`;
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
    }
  };

  const handleMenuClick = (menuName, e) => {
    e.preventDefault();

    // Map service names to their route IDs
    const menuRoutes = {
      "HOMECARE MASSACHUSETTS": "homecare-massachusetts",
      "MYHOMEHEALTHAIDES": "myhomehealthaides",
      "NON-DISCRIMINATION POLICY": "non-discrimination-policy",
      "BLOGS": "blogs",
      "CONTACT US": "contact-us",

      "JOIN OUR TEAM": "join-our-team",
      "OPPORTUNITIES": "opportunities"
    };

    const routeId = menuRoutes[menuName];
    if (routeId) {
      window.location.href = `/${routeId}`;
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
      default:
        return;
    }

    // const section = document.getElementById(sectionId);
    // if (section) {
    //   section.scrollIntoView({ behavior: "smooth" });
    // }

    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === '/home') {
      navigate('/');
    } else {
      navigate('/home');
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[9999] bg-white shadow-sm w-screen transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
        {/* Main Navbar Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar - Logo and Mobile Menu Button */}
          <div className="flex justify-between items-center h-10">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="/home">
                <img
                  src="/main-logo/logo.png"
                  alt=""
                  className="h-10 lg:relative lg:top-7 lg:h-24"
                  onClick={handleLogoClick}
                />
              </a>
            </div>

            {/* Desktop Social Icons and Search */}
            <div className="hidden lg:flex items-center">
              {/* <div className="flex items-center mr-8">
                <SocialIcons />
                <button className="bg-gray-100 rounded-full p-2 pl-50 ml-10 border border-blue-500 hover:bg-gray-200 transition-colors">
                  <Search className="w-4 h-4 text-gray-600" />
                </button>
              </div> */}
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
            className="hidden lg:block "
            onMouseLeave={handleMenuLeave}
          >
            <div className="flex items-center justify-end  pt-4 ">
              {/* Navbar ko Items Container  ho jaha about, our servies*/}
              <div className="flex items-center mr-20 ">
                {/* About Us Menu Item */}
                <button onClick={navigateToAbout} className="flex items-center">
                  <DesktopMenuItem
                    title="ABOUT US"
                    id="about-us"
                    activeMenu={activeMenu}
                    handleMenuEnter={handleMenuEnter}
                    handleMenuLeave={handleMenuLeave}
                  />
                  <span className="mx-4 h-7">|</span>
                </button>


                {/* Services Menu Item */}
                <DesktopMenuItem
                  title="OUR SERVICES"
                  id="our-services"
                  items={[
                    "COMPREHENSIVE HOME CARE SOLUTIONS",
                    "EXPERIENCED CARE MANAGERS OVERSIGHT",
                    "COMPLETE GERIATRIC SUPPORT",
                    "NURSING VISITS & HEALTH MONITORING",
                    "TRANSITIONAL ASSISTANCE",
                    "MOBILITY AND INDEPENDENCE",
                    "TECHNOLOGY-ENABLED PEACE OF MIND",
                    "FLEXIBLE CARE PLANS",
                    "HOME SEARCH ENTITY",
                    "NON MEDICAL TRANSPORTATION",
                    "ASSISTED LIVING REFERRALS"
                  ]}
                  dropdownType="services"
                  onItemClick={handleServiceClick}
                  activeMenu={activeMenu}
                  handleMenuEnter={handleMenuEnter}
                  handleMenuLeave={handleMenuLeave}
                // handleScrollTo={handleScrollTo}
                />
                <span className="  mx-4 h-7">|</span>


                {/* Reviews Menu Item */}
                {/* <DesktopMenuItem
                  title="View Reviews"
                  id="testimonials"
                  items={[]}
                  dropdownType="default"
                  onItemClick={handleAboutClick}
                  activeMenu={activeMenu}
                  handleMenuEnter={handleMenuEnter}
                  handleMenuLeave={handleMenuLeave}
                  handleScrollTo={handleScrollTo}
                />
                  <span className="  mx-4 h-7">|</span> */}

                {/* Testimonials Menu Item */}
                <DesktopMenuItem
                  title="TESTIMONIALS"
                  id="testimonials"
                  items={["GOOGLE BUSINESS REVIEWS", "CARE.COM REVIEWS"]}
                  dropdownType="reviews"
                  onItemClick={handleAboutClick}
                  activeMenu={activeMenu}
                  handleMenuEnter={handleMenuEnter}
                  handleMenuLeave={handleMenuLeave}
                  handleScrollTo={handleScrollTo}
                />

                <span className="  mx-4 h-7">|</span>

                {/* Careers Menu Item */}
                <DesktopMenuItem
                  title="CAREERS"
                  id="join-our-team"
                  items={["JOIN OUR TEAM", "OPPORTUNITIES"]}
                  dropdownType="reviews"
                  onItemClick={handleMenuClick}
                  activeMenu={activeMenu}
                  handleMenuEnter={handleMenuEnter}
                  handleMenuLeave={handleMenuLeave}
                  handleScrollTo={handleScrollTo}
                />

              </div>

              <div className="flex items-center mx-4">
                <SocialIcons />
              </div>

              <span className="  mx-4 h-7"></span>


              {/* Additional Menu Container */}
              <div className="relative">
                <DesktopAdditionalMenu
                  title="MENU"
                  items={additionalMenuItems}
                  activeMenu={activeMenu}
                  onItemClick={handleMenuClick}
                  handleMenuEnter={handleMenuEnter}
                  handleMenuLeave={handleMenuLeave}
                  onAboutClick={handleAboutClick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Section */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          openSubmenu={openSubmenu} toggleSubmenu={toggleSubmenu}

          handleServiceClick={handleServiceClick}
          handleAboutClick={handleAboutClick}
          additionalMenuItems={additionalMenuItems}
          navigateToAbout={navigateToAbout}
          handleMenuClick={handleMenuClick}
        />
      </header>

      {/* Service Modal */}
      <ServiceModal
        selectedService={selectedService}
        onClose={closeModal}
      />
    </>
  );
};

export default Navbar;