import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import SocialIcons from "./navbar/Socialicons";
import DesktopMenuItem from "./navbar/DesktopMenu";
import MobileMenu from "./navbar/MobileMenu";
import { additionalMenuItems } from "./navbar/ServiceData"; // ← only additionalMenuItems stays static
import { useLocation, useNavigate } from "react-router-dom";
import DesktopAdditionalMenu from "./navbar/DesktopAdditionalMenu";

const BASE_URL = "https://stf.org.np";
//const BASE_URL = "http://localhost/SewaHome";

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
  const [activeMenu,       setActiveMenu]       = useState(null);
  const [openSubmenu,      setOpenSubmenu]       = useState(null);
  const [isVisible,        setIsVisible]         = useState(true);
  const [lastScrollY,      setLastScrollY]       = useState(0);
  const [scrolled,         setScrolled]          = useState(false);

  // ── Service data from backend ─────────────────────────────────────────────
  const [serviceMenuData, setServiceMenuData] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/Backend/service/services.php`)
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

  // ── Split service data to mirror desktop sections ─────────────────────────
  // API returns category objects: { id, title, slug, items: [...] }
  // Filter by title exactly as before — works with both static and API data
  const homeCareServices = serviceMenuData.filter(item =>
    ["HOME CARE SERVICES", "TRANSITION & PLACEMENT", "SUPPORT SERVICES"].includes(item.title)
  );
  const professionalCareManagement = serviceMenuData.filter(item =>
    item.title === "PROFESSIONAL CARE MANAGEMENT"
  );
  const clinicalNursingServices = serviceMenuData.filter(item =>
    item.title === "CLINICAL NURSING SERVICES"
  );
  const dementiaCareSpecialists = serviceMenuData.filter(item =>
    item.title === "DEMENTIA CARE SPECIALISTS"
  );

  const navigate  = useNavigate();
  const location  = useLocation();

  // ── Scroll behaviour ──────────────────────────────────────────────────────
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
  const toggleSubmenu   = (title) => setOpenSubmenu(openSubmenu === title ? null : title);

  // ── Navigation helpers ────────────────────────────────────────────────────
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

  // ── Service click — uses serviceId slug from API, falls back to title-slug ──
  // serviceItem is now an object { title, serviceId, subItems, ... } from the API
  // OR a plain string (legacy / sub-item string) — handle both safely
  const handleServiceClick = (serviceItem, e) => {
    e.preventDefault();

    let slug;
    if (typeof serviceItem === 'object' && serviceItem !== null) {
      // API object — use the stored serviceId slug directly
      slug = serviceItem.serviceId;
    } else {
      // Fallback: plain string (shouldn't happen with API data, but keeps old behaviour)
      slug = String(serviceItem).toLowerCase().replace(/\s+/g, '-');
    }

    if (slug) {
      window.location.href = `/services/${slug}`;
    }
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  };

  // ── Additional MENU item click ────────────────────────────────────────────
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
      {/* ── Desktop bar ── */}
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

        {/* Nav links */}
        <nav className="flex items-center gap-0.5 flex-1 justify-center min-w-0">
          <button
            onClick={navigateToAbout}
            className="text-[13px] font-light tracking-wide px-3 py-2 rounded transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            style={{ fontFamily: "century, 'Century Gothic', sans-serif", color: '#374151' }}
            onMouseEnter={e => e.currentTarget.style.color = '#376082'}
            onMouseLeave={e => e.currentTarget.style.color = '#374151'}
          >
            ABOUT US
          </button>

          <Divider />

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
          <DesktopMenuItem
            title="PROFESSIONAL CARE"
            items={professionalCareManagement}
            dropdownType="services"
            onItemClick={handleServiceClick}
            activeMenu={activeMenu}
            handleMenuEnter={handleMenuEnter}
            handleMenuLeave={handleMenuLeave}
          />
          <Divider />
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

        {/* Right utilities */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <SocialIcons />
          <div className="h-5 w-px bg-gray-200" />
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

      {/* ── Mobile bar ── */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16">
        <a href="/home" onClick={handleLogoClick}>
          <img src="/main-logo/logo.webp" alt="Logo" className="h-10 w-auto object-contain" />
        </a>
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