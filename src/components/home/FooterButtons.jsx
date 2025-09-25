import React from 'react';
import { MapPin, Phone, Mail, HelpCircle, Facebook, Instagram, Twitter } from 'lucide-react';

const FooterButtons = () => {
  
  // Function to open Google Maps with the specified URL
  const openGoogleMaps = (url) => {
    window.open(url, '_blank');
  };

  // Google Maps URLs
  const californiaMapsUrl = "https://www.google.com/maps/search/?api=1&query=San+Francisco,+California+94102,+United+States";
  const massachusettsMapsUrl = "https://www.google.com/maps/place/SEWA+HOME+CARE/@42.5583828,-71.4400269,16.25z/data=!4m14!1m7!3m6!1s0x39eb195084b2fb6f:0xe2a9f4c3eeee38b6!2sSmart+Home+Sewa!8m2!3d27.6960003!4d85.2929533!16s%2Fg%2F11kh4nk88j!3m5!1s0x89e3a3605d97ee37:0x16ce8ce578a8d33b!8m2!3d42.5571586!4d-71.436875!16s%2Fg%2F11fx8rpb86?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D";

  return (
    <div className="bg-slate-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            {/* California Location */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">California</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center space-x-2 mb-1 md:mb-2">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Location</span>
                  </div>
                  <button 
                    onClick={() => openGoogleMaps(californiaMapsUrl)}
                    className="text-xs md:text-sm text-left hover:text-blue-300 transition-colors duration-300 cursor-pointer"
                    aria-label="Open California location in Google Maps"
                  >
                    <p>San Francisco, California 94102,</p>
                    <p>United States</p>
                  </button>
                </div>
                
                <div className="flex justify-center md:justify-start items-center space-x-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <a href="tel:9786777012" className="text-sm md:text-base hover:text-blue-300 transition-colors duration-300">
                    (978) 677-7012
                  </a>
                </div>
                
                <div className="flex justify-center md:justify-start items-center space-x-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <a href="mailto:California@sewahomecare.com" className="text-xs md:text-sm hover:text-blue-300 transition-colors duration-300">
                    California@sewahomecare.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* Massachusetts Location */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">Massachusetts</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center space-x-2 mb-1 md:mb-2">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm md:text-base">Location</span>
                  </div>
                  <button 
                    onClick={() => openGoogleMaps(massachusettsMapsUrl)}
                    className="text-xs md:text-sm text-left hover:text-blue-300 transition-colors duration-300 cursor-pointer"
                    aria-label="Open Massachusetts location in Google Maps"
                  >
                    <p>6 Lyberty Way, Ste 202,</p>
                    <p>Westford, Massachusetts 01886,</p>
                    <p>United States</p>
                  </button>
                </div>
                
                <div className="flex justify-center md:justify-start items-center space-x-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <a href="tel:9786777012" className="text-sm md:text-base hover:text-blue-300 transition-colors duration-300">
                    (978) 677-7012
                  </a>
                </div>
                
                <div className="flex justify-center md:justify-start items-center space-x-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <a href="mailto:headoffice@sewahomecare.com" className="text-xs md:text-sm hover:text-blue-300 transition-colors duration-300">
                    headoffice@sewahomecare.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">Quick Links</h3>
            <div className="space-y-2 mb-6 md:mb-8">
              <div><a href="/home" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Home</a></div>
              <div><a href="/about" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">About Us</a></div>
              <div><a href="/join-our-team" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Join our Team</a></div>
              <div><a href="/opportunities" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Opportunities</a></div>
              <div><a href="/homecare-massachusetts" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Homecare Massachusetts</a></div>
              <div><a href="/contact-us" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Contact us</a></div>
              <div><a href="/blogs" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Blogs</a></div>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">Services</h3>
            <div className="space-y-2">
              <div><a href="/services/comprehensive-home-care" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Comprehensive Home Care Solutions</a></div>
              <div><a href="/services/care-manager-oversight" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Experienced Care Managers Oversight</a></div>
              <div><a href="/services/geriatric-support" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Complete Geriatric Support</a></div>
              <div><a href="/services/nursing-visits" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Nursing Visits & Health Monitoring</a></div>
              <div><a href="/services/transitional-assistance" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Transitional Assistance</a></div>
              <div><a href="/services/mobility-independence" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Mobility and Independence</a></div>
              <div><a href="/services/technology-enabled-care" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Technology-Enabled Peace of Mind</a></div>
              <div><a href="/services/flexible-care-plans" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Flexible, Custom Care Plans</a></div>
              <div><a href="/services/home-search-entity" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Home Search Entity</a></div>
              <div><a href="/services/non-medical-transportation" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Non Medical Transportation</a></div>
              <div><a href="/services/assisted-living-referrals" className="hover:text-blue-300 transition-colors duration-300 text-xs md:text-sm">Assisted Living Referrals</a></div>
              
            </div>
          </div>
          
          {/* Additional Links & Trust Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6 md:mb-8">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 underline decoration-2">Additionals</h3>
              <div className="space-y-2">
                <div><a href="/consultation" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Book a Consultation</a></div>
                <div><a href="/non-discrimination-policy" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Non-Discrimination policy</a></div>
                <div><a href="#" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Terms of Service</a></div>
                <div><a href="#" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Privacy policy</a></div>
                <div><a href="#" className="hover:text-blue-300 transition-colors duration-300 text-sm md:text-base">Terms and conditions</a></div>
              </div>
            </div>
            
            {/* Trust & Action Section */}
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
        
        {/* Social Media & Bottom Section */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col items-center">
            <p className="text-xs md:text-sm mb-2">Copyright © SEWA Home Care - All Rights Reserved.</p>
            <p className="text-xs md:text-sm mb-2">Developed by</p>
            <div className="flex justify-center">
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                <img 
                  src="/main-logo/footer_logo.png" 
                  alt="SEWA Home Care Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback in case the logo doesn't load
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterButtons;