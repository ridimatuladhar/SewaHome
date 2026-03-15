import React, { useState } from 'react';
import { MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import { serviceMenuData } from '../../layouts/navbar/ServiceData';

const toUrl = (title) =>
  `/services/${title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-')}`;

const openGoogleMaps = (url) => window.open(url, '_blank');

const californiaMapsUrl    = "https://www.google.com/maps/search/?api=1&query=San+Francisco,+California+94102,+United+States";
const massachusettsMapsUrl = "https://www.google.com/maps/place/SEWA+HOME+CARE/@42.5583828,-71.4400269,16.25z/data=!4m14!1m7!3m6!1s0x39eb195084b2fb6f:0xe2a9f4c3eeee38b6!2sSmart+Home+Sewa!8m2!3d27.6960003!4d85.2929533!16s%2Fg%2F11kh4nk88j!3m5!1s0x89e3a3605d97ee37:0x16ce8ce578a8d33b!8m2!3d42.5571586!4d-71.436875!16s%2Fg%2F11fx8rpb86?entry=ttu";

// ── Services accordion ────────────────────────────────────────────────────────
const ServicesAccordion = () => {
  const [openCat,  setOpenCat]  = useState(null);
  const [openItem, setOpenItem] = useState(null);

  const toggleCat  = (t) => { setOpenCat(openCat === t ? null : t); setOpenItem(null); };
  const toggleItem = (k) => setOpenItem(openItem === k ? null : k);

  return (
    <div className="space-y-1 max-h-80 overflow-y-auto pr-1 w-full">
      {serviceMenuData.map((category) => {
        const catOpen = openCat === category.title;

        return (
          <div key={category.title}>

            {/* Category — always a toggle, never navigates */}
            <button
              onClick={() => toggleCat(category.title)}
              className="w-full flex items-center justify-between py-1.5 text-sm text-white hover:text-blue-300 transition-colors duration-200"
            >
              <span className="text-left leading-snug">{category.title}</span>
              <ChevronDown
                size={12}
                className={`flex-shrink-0 ml-2 transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {catOpen && (
              <div className="ml-2 border-l border-white/20 pl-3 space-y-0.5 mb-1">
                {category.items.map((item) => {
                  const itemKey  = `${category.title}::${item.title}`;
                  const itemOpen = openItem === itemKey;
                  const hasSub   = item.subItems?.length > 0;

                  return (
                    <div key={item.title}>

                      {hasSub ? (
                        // Has sub-items → entire row is a toggle button, NO navigation
                        <button
                          onClick={() => toggleItem(itemKey)}
                          className="w-full flex items-center justify-between py-1 text-xs text-gray-300 hover:text-blue-300 transition-colors duration-200"
                        >
                          <span className="text-left leading-snug">{item.title}</span>
                          <ChevronDown
                            size={11}
                            className={`flex-shrink-0 ml-2 transition-transform duration-200 ${itemOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                      ) : (
                        // No sub-items → navigates directly
                        <a
                          href={toUrl(item.title)}
                          className="block py-1 text-xs text-gray-300 hover:text-blue-300 transition-colors duration-200 leading-snug"
                        >
                          {item.title}
                        </a>
                      )}

                      {/* Sub-items — these navigate */}
                      {hasSub && itemOpen && (
                        <div className="ml-3 border-l border-white/10 pl-2 space-y-0.5 mb-1">
                          {item.subItems.map((sub, si) => (
                            <a
                              key={si}
                              href={toUrl(sub)}
                              className="flex items-center gap-1.5 py-0.5 text-xs text-gray-400 hover:text-blue-300 transition-colors duration-200 leading-snug"
                            >
                              <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                              {sub}
                            </a>
                          ))}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const FooterButtons = () => (
  <div className="bg-slate-700 text-white">
    <div className="max-w-6xl mx-auto px-4 py-8">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">

        {/* ── Contact ── */}
        <div className="space-y-6 md:space-y-8">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">California</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2 mb-1 md:mb-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-base">Location</span>
                </div>
                <button onClick={() => openGoogleMaps(californiaMapsUrl)} className="text-xs md:text-sm text-left hover:text-blue-300 transition-colors duration-300">
                  <p>San Francisco, California 94102,</p>
                  <p>United States</p>
                </button>
              </div>
              <div className="flex justify-center md:justify-start items-center space-x-2">
                <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <a href="tel:9786777012" className="text-sm md:text-base hover:text-blue-300 transition-colors duration-300">(978) 677-7012</a>
              </div>
              <div className="flex justify-center md:justify-start items-center space-x-2">
                <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <a href="mailto:California@sewahomecare.com" className="text-xs md:text-sm hover:text-blue-300 transition-colors duration-300">California@sewahomecare.com</a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">Massachusetts</h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2 mb-1 md:mb-2">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-sm md:text-base">Location</span>
                </div>
                <button onClick={() => openGoogleMaps(massachusettsMapsUrl)} className="text-xs md:text-sm text-left hover:text-blue-300 transition-colors duration-300">
                  <p>270 Littleton Rd, Ste 10,</p>
                  <p>Westford, MA 01886,</p>
                  <p>United States</p>
                </button>
              </div>
              <div className="flex justify-center md:justify-start items-center space-x-2">
                <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <a href="tel:9786777012" className="text-sm md:text-base hover:text-blue-300 transition-colors duration-300">(978) 677-7012</a>
              </div>
              <div className="flex justify-center md:justify-start items-center space-x-2">
                <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <a href="mailto:headoffice@sewahomecare.com" className="text-xs md:text-sm hover:text-blue-300 transition-colors duration-300">headoffice@sewahomecare.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">Quick Links</h3>
          <div className="space-y-2">
            {[
              { label: "Home",                   href: "/home" },
              { label: "About Us",               href: "/about" },
              { label: "Join our Team",          href: "/join-our-team" },
              { label: "Opportunities",          href: "/opportunities" },
              { label: "Homecare Massachusetts", href: "/homecare-massachusetts" },
              { label: "Contact Us",             href: "/contact-us" },
              { label: "Blogs",                  href: "/blogs" },
              { label: "Leave your testimonial", href: "/leave-review" },
            ].map(({ label, href }) => (
              <div key={href}>
                <a href={href} className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">{label}</a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Services ── */}
        <div className="flex flex-col items-center md:items-start w-full">
          <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">Services</h3>
          <ServicesAccordion />
        </div>

        {/* ── Additionals + Trust ── */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">Additionals</h3>
            <div className="space-y-2">
              {[
                { label: "Book a Consultation",       href: "/consultation" },
                { label: "Non-Discrimination Policy", href: "/non-discrimination-policy" },
                { label: "Terms of Service",          href: "#" },
                { label: "Privacy Policy",            href: "#" },
                { label: "Terms and Conditions",      href: "#" },
              ].map(({ label, href }) => (
                <div key={label}>
                  <a href={href} className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">{label}</a>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 underline decoration-2">Trust & Action</h3>
            <div className="bg-white/10 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm font-medium">Fully Insured and Bonded</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-1 md:gap-2 mt-2">
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Licensed</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Certified</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Bonded</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="mt-8 pt-8 border-t border-white/20">
        <div className="flex flex-col items-center">
          <p className="text-xs md:text-sm mb-2">Copyright © SEWA Home Care - All Rights Reserved.</p>
          <p className="text-xs md:text-sm mb-2">Developed by</p>
          <div className="w-10 h-10 md:w-12 md:h-12">
            <img
              src="/main-logo/footer_logo.webp"
              alt="SEWA Home Care Logo"
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default FooterButtons;