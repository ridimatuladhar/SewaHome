import React, { useRef, useEffect } from 'react';
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
  handleMenuToggle,
}) => {
  const isActive = activeMenu === title;
  const ref = useRef(null);

  // Close on outside click (touch)
  useEffect(() => {
    if (!isActive) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handleMenuLeave();
      }
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [isActive, handleMenuLeave]);

  return (
    <div
      ref={ref}
      className="relative flex-shrink-0"
      onMouseEnter={() => handleMenuEnter(title)}
      onMouseLeave={handleMenuLeave}
    >
      <div
        className="flex items-center gap-1 text-sm font-extrabold tracking-wide px-3 py-2 rounded cursor-pointer whitespace-nowrap transition-colors duration-200 select-none uppercase"
        style={{
          fontFamily: "century, 'Century Gothic', sans-serif",
          color: BRAND,
        }}
        // Toggle on tap; mouse users rely on hover
        onPointerUp={(e) => {
          if (e.pointerType === 'touch') {
            e.preventDefault();
            handleMenuToggle(title);
          }
        }}
      >
        {title}
        {items.length > 0 && (
          <ChevronDown
            className="w-3 h-3 transition-transform duration-200"
            style={{
              color: isActive ? BRAND : '#9ca3af',
              transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      </div>

      {isActive && (
        <div
          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
          style={{ backgroundColor: BRAND }}
        />
      )}

      {items.length > 0 && (
        <div
          className="fixed top-[80px] w-screen bg-white shadow-xl z-[100] transition-all duration-200 ease-out"
          style={{
            left: '50%',
            transform: isActive
              ? 'translateX(-50%) translateY(0)'
              : 'translateX(-50%) translateY(-6px)',
            opacity: isActive ? 1 : 0,
            pointerEvents: isActive ? 'auto' : 'none',
          }}
        >
          {dropdownType === 'services' && (
            <ServicesDropdownContent items={items} onServiceClick={onItemClick} />
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopMenuItem;