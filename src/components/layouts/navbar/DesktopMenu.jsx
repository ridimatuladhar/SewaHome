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
      className="group relative flex-shrink-0 h-full flex items-center"
      onMouseEnter={() => handleMenuEnter(title)}
      onMouseLeave={handleMenuLeave}
    >
      <div
        className="flex items-center gap-1 text-sm font-extrabold tracking-wide px-3 py-2 rounded cursor-pointer whitespace-nowrap transition-colors duration-200 select-none uppercase"
        style={{
          fontFamily: "century, 'Century Gothic', sans-serif",
          color: BRAND,
        }}
        onClick={(e) => {
          e.preventDefault();
          handleMenuToggle(title);
        }}
      >
        {title}
        {items.length > 0 && (
          <ChevronDown
            className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
            style={{
              color: isActive ? BRAND : '#9ca3af',
              transform: isActive ? 'rotate(180deg)' : undefined,
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
          className={`fixed left-0 right-0 w-full bg-white shadow-xl z-[100] transition-all duration-200 ease-out ${
            isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1.5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'
          }`}
          style={{
            top: '80px',
          }}
        >
          {/* Invisible top bridge to prevent gap flicker */}
          <div className="absolute -top-4 left-0 right-0 h-4 bg-transparent" />
          {dropdownType === 'services' && (
            <ServicesDropdownContent items={items} onServiceClick={onItemClick} />
          )}
        </div>
      )}
    </div>
  );
};

export default DesktopMenuItem;