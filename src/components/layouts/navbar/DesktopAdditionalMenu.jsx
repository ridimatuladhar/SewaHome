import React from 'react';
import { MenuDropdownContent } from './DropdownContents';

const DesktopAdditionalMenu = ({ 
  title, 
  items = [], 
  activeMenu, 
  handleMenuEnter, 
  handleMenuLeave, 
  onItemClick, // <-- Add this prop
  onAboutClick 
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={() => handleMenuEnter(title)}
      onMouseLeave={handleMenuLeave}
    >
      <button
        className=" hover:text-blue-600 text-[14px] py-2 mr-8 flex items-center transition-colors duration-200 tracking-wider"
        style={{ fontFamily: "century" }}
      >
        {title}
      </button>

      <div 
        className={`fixed left-0 right-0 w-screen bg-white shadow-xl border-t border-gray-200 z-[100] transition-all duration-300 ease-in-out ${
          activeMenu === title 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0  invisible'
        }`}
        style={{ 
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <MenuDropdownContent 
          items={items} 
          onItemClick={onItemClick} // <-- Pass this prop
          onAboutClick={onAboutClick} 
        />
      </div>
    </div>
  );
};

export default DesktopAdditionalMenu;