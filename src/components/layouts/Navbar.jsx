// Navbar.jsx
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import SocialIcons from "./navbar/SocialIcons";
import DesktopMenuItem from "./navbar/DesktopMenu";
import MobileMenu from "./navbar/MobileMenu";
import { additionalMenuItems } from "./navbar/ServiceData"; 
import { useLocation, useNavigate } from "react-router-dom";
import DesktopAdditionalMenu from "./navbar/DesktopAdditionalMenu";
import NavbarCTAs from "./navbar/NavbarCTAs";

//const BASE_URL = "http://localhost/SewaHome/Backend";
const BASE_URL = "https://api.sewacareservices.com";

const menuRoutes = {
  "HOMECARE MASSACHUSETTS": "homecare-massachusetts",
  "NON-DISCRIMINATION POLICY": "non-discrimination-policy",
  "BLOGS": "blogs",
  "CONTACT US": "contact-us",
  "JOIN OUR TEAM": "join-our-team",
  "OPPORTUNITIES": "opportunities",
  "LEAVE A REVIEW": "leave-review",
  "GOOGLE BUSINESS REVIEWS": "google-business-reviews",
  "CARE.COM REVIEWS": "care-com-reviews",
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [serviceMenuData, setServiceMenuData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/service/services.php`)
      .then(res => res.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          if (data.success) setServiceMenuData(data.services ?? []);
        } catch {
          console.error("[Navbar] services.php returned non-JSON:", text.slice(0, 200));
        }
      })
      .catch(err => console.error("[Navbar] fetch error:", err));
  }, []);

  // Filter services - using shorter labels for display
  const homeCareServices = serviceMenuData.filter(item =>
    ["HOME CARE SERVICES", "TRANSITION & PLACEMENT", "SUPPORT SERVICES"].includes(item.title)
  );
  const professionalCare = serviceMenuData.filter(item =>
    item.title === "PROFESSIONAL CARE MANAGEMENT"
  );
  const clinicalNursingServices = serviceMenuData.filter(item =>
    item.title === "CLINICAL NURSING SERVICES"
  );
  const dementiaCareSpecialists = serviceMenuData.filter(item =>
    item.title === "DEMENTIA CARE SPECIALISTS"
  );

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      setScrolled(window.scrollY > 10);
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
        setActiveMenu(null);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleMenuEnter = (title) => setActiveMenu(title);
  const handleMenuLeave = () => setActiveMenu(null);
  const toggleSubmenu = (title) => setOpenSubmenu(openSubmenu === title ? null : title);

  const navigateToAbout = () => {
    navigate("/about");
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  };

  const navigateToContact = () => {
    navigate("/contact-us");
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  };

  const navigateToLeaveReview = () => {
    navigate("/leave-review");
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  };

  const handleServiceClick = (serviceItem, e) => {
    e.preventDefault();
    let slug;
    if (typeof serviceItem === 'object' && serviceItem !== null) {
      slug = serviceItem.serviceId;
    } else {
      slug = String(serviceItem).toLowerCase().replace(/\s+/g, '-');
    }
    if (slug) {
      window.location.href = `/services/${slug}`;
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleMenuClick = (menuName, e) => {
    e.preventDefault();
    if (menuName === "GOOGLE BUSINESS REVIEWS") {
      window.open('https://search.google.com/local/reviews?placeid=ChIJN-6XXWCj44kRO9OoeOWMzhY', '_blank');
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
      return;
    }
    if (menuName === "CARE.COM REVIEWS") {
      window.open('https://www.care.com/b/l/sewa-home-care/westford-ma', '_blank');
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
      return;
    }
    if (menuName === "LEAVE A REVIEW") {
      navigateToLeaveReview();
      return;
    }
    const routeId = menuRoutes[menuName];
    if (routeId) {
      window.location.href = `/${routeId}`;
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate(location.pathname === '/home' ? '/' : '/home');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] bg-white w-screen transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
    >
      {/* Desktop Navigation */}
      <div
        className="hidden lg:flex items-end justify-between w-full px-4 xl:px-10"
        style={{ height: '80px' }}
        onMouseLeave={handleMenuLeave}
      >
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <a href="/home" onClick={handleLogoClick}>
            <img src="/main-logo/logo.webp" alt="Logo" className="h-18 w-auto object-contain" />
          </a>
        </div>

        {/* Navigation Links - Center */}
        <nav className="flex items-center gap-0.5 flex-1 justify-center min-w-0">
          {/* ABOUT US - On the left side */}
          <button
            onClick={navigateToAbout}
            className="text-[13px] font-semibold tracking-wide px-3 py-2 rounded transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            style={{ fontFamily: "century, 'Century Gothic', sans-serif", color: '#376082' }}
            onMouseEnter={e => e.currentTarget.style.color = '#376082'}
            onMouseLeave={e => e.currentTarget.style.color = '#376082'}
          >
            ABOUT US
          </button>

          <Divider />

          {/* OUR SERVICES */}
          <DesktopMenuItem
            title="OUR SERVICES"
            items={homeCareServices}
            dropdownType="services"
            onItemClick={handleServiceClick}
            activeMenu={activeMenu}
            handleMenuEnter={handleMenuEnter}
            handleMenuLeave={handleMenuLeave}
          />
          
          <Divider />

          {/* PROFESSIONAL CARE */}
          <DesktopMenuItem
            title="PROFESSIONAL CARE"
            items={professionalCare}
            dropdownType="services"
            onItemClick={handleServiceClick}
            activeMenu={activeMenu}
            handleMenuEnter={handleMenuEnter}
            handleMenuLeave={handleMenuLeave}
          />
          
          <Divider />

          {/* CLINICAL NURSING */}
          <DesktopMenuItem
            title="CLINICAL NURSING"
            items={clinicalNursingServices}
            dropdownType="services"
            onItemClick={handleServiceClick}
            activeMenu={activeMenu}
            handleMenuEnter={handleMenuEnter}
            handleMenuLeave={handleMenuLeave}
          />
          
          <Divider />

          {/* DEMENTIA CARE */}
          <DesktopMenuItem
            title="DEMENTIA CARE"
            items={dementiaCareSpecialists}
            dropdownType="services"
            onItemClick={handleServiceClick}
            activeMenu={activeMenu}
            handleMenuEnter={handleMenuEnter}
            handleMenuLeave={handleMenuLeave}
          />
        </nav>

        {/* Right utilities - Phone Number and MENU */}
        <div className="flex items-center gap-3 flex-shrink-0 mb-2">
          <NavbarCTAs />
          
          <div className="h-5 w-px bg-gray-200" />
          
          {/* MENU */}
          <DesktopAdditionalMenu
            title="MENU"
            items={additionalMenuItems}
            activeMenu={activeMenu}
            onItemClick={handleMenuClick}
            handleMenuEnter={handleMenuEnter}
            handleMenuLeave={handleMenuLeave}
          />
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16">
        <a href="/home" onClick={handleLogoClick}>
          <img src="/main-logo/logo.webp" alt="Logo" className="h-10 w-auto object-contain" />
        </a>
        <div className="flex items-center gap-3">
          {/* Phone Number for Mobile */}
          <NavbarCTAs />
          <button
            className="p-2 rounded-md focus:outline-none focus:ring-2 transition-colors"
            style={{ color: '#376082' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        openSubmenu={openSubmenu}
        toggleSubmenu={toggleSubmenu}
        handleServiceClick={handleServiceClick}
        additionalMenuItems={additionalMenuItems}
        navigateToAbout={navigateToAbout}
        handleMenuClick={handleMenuClick}
        services={serviceMenuData}
        navigateToContact={navigateToContact}
        navigateToLeaveReview={navigateToLeaveReview}
      />
    </header>
  );
};

const Divider = () => (
  <div className="h-5 w-px bg-gray-200 flex-shrink-0" aria-hidden="true" />
);

export default Navbar;