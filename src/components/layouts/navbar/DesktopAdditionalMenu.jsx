import React from 'react';
import { MenuDropdownContent } from './DropdownContents';
import { ChevronDown } from 'lucide-react';

const BRAND = '#376082';

const DesktopAdditionalMenu = ({
  title,
  items = [],
  activeMenu,
  handleMenuEnter,
  handleMenuLeave,
  onItemClick,
}) => {
  const isActive = activeMenu === title;

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={() => handleMenuEnter(title)}
      onMouseLeave={handleMenuLeave}
    >
      <button
        className="flex items-center gap-1 text-[13px] font-light tracking-wide px-3 py-2 rounded transition-colors duration-200 whitespace-nowrap"
        style={{
          fontFamily: "century, 'Century Gothic', sans-serif",
          color: isActive ? BRAND : '#374151',
        }}
      >
        {title}
        <ChevronDown
          className="w-3 h-3 transition-transform duration-200"
          style={{
            color: isActive ? BRAND : '#9ca3af',
            transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      

      {/* Full-width dropdown */}
      <div
        className="fixed w-screen bg-white shadow-xl z-[100] transition-all duration-200 ease-out"
        style={{
          top: '80px',
          left: '50%',
          transform: isActive
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-6px)',
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      >
        <MenuDropdownContent items={items} onItemClick={onItemClick} />
      </div>
    </div>
  );
};

export default DesktopAdditionalMenu;