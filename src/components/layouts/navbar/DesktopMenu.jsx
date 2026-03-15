import React from 'react';
import { ServicesDropdownContent } from './DropdownContents';
import { ChevronDown } from 'lucide-react';

const BRAND = '#376082';

const DesktopMenuItem = ({
  title,
  items = [],
  dropdownType = "default",
  onItemClick,
  activeMenu,
  handleMenuEnter,
  handleMenuLeave,
}) => {
  const isActive = activeMenu === title;

  const renderDropdownContent = () => {
    if (dropdownType === "services") {
      return <ServicesDropdownContent items={items} onServiceClick={onItemClick} />;
    }
    return null;
  };

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={() => handleMenuEnter(title)}
      onMouseLeave={handleMenuLeave}
    >
      <div
        className="flex items-center gap-1 text-[13px] font-light tracking-wide px-3 py-2 rounded cursor-pointer whitespace-nowrap transition-colors duration-200 select-none"
        style={{
          fontFamily: "century, 'Century Gothic', sans-serif",
          color: isActive ? BRAND : '#374151',
        }}
      >
        {title}
        {items.length > 0 && (
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-200`}
            style={{ color: isActive ? BRAND : '#9ca3af', transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        )}
      </div>

      {/* Active underline indicator */}
      {isActive && (
        <div
          className="absolute bottom-0 left-3 right-3 h-0.25 rounded-full"
          style={{ backgroundColor: BRAND }}
        />
      )}

      {/* Full-width dropdown */}
      {items.length > 0 && (
        <div
          className={`fixed top-[80px] w-screen bg-white shadow-xl z-[100] transition-all duration-200 ease-out`}
          style={{
            left: '50%',
            transform: isActive
              ? 'translateX(-50%) translateY(0)'
              : 'translateX(-50%) translateY(-6px)',
            opacity: isActive ? 1 : 0,
            pointerEvents: isActive ? 'auto' : 'none',
          }}
        >
          {renderDropdownContent()}
        </div>
      )}
    </div>
  );
};

export default DesktopMenuItem;