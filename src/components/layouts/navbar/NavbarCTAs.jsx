// NavbarCTAs.jsx - Two button version
import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavbarCTAs = () => {
  const PHONE_NUMBER = "(978) 677-7012";
  const PHONE_LINK = "tel:19786777012";

  return (
    <div className="flex items-center gap-3">
      {/* Phone Number Button - #6CABFF color */}
      <button
        onClick={() => window.location.href = PHONE_LINK}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:opacity-90 shadow-md"
        style={{ backgroundColor: '#6CABFF' }}
      >
        <Phone className="w-4 h-4" />
        <span className="text-sm">{PHONE_NUMBER}</span>
      </button>

    
    </div>
  );
};

export default NavbarCTAs;