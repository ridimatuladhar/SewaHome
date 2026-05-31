import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const BRAND = '#376082';

const itemTextStyle = {
  fontSize: '13px',
  fontFamily: "century, 'Century Gothic', sans-serif",
  textTransform: 'capitalize',
  letterSpacing: '0.02em',
};

export const ServicesDropdownContent = ({ items, onServiceClick }) => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6">
      {items.map((category) => (
        <div key={category.title} className="mb-5 last:mb-0">
          <p
            className="text-xs font-semibold uppercase mb-3 pb-1 border-b tracking-widest"
            style={{ color: BRAND, borderColor: '#d1dde8', fontFamily: "century, 'Century Gothic', sans-serif" }}
          >
            {category.title}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
            {(category.items ?? [])
              .filter(item => item.isActive !== false)
              .map((serviceItem) => {
                const activeSubs = (serviceItem.subItems ?? []).filter(s => s.isActive !== false);
                const hasSubs = activeSubs.length > 0;

                return (
                  <div
                    key={serviceItem.serviceId ?? serviceItem.title}
                    className="relative"
                    onMouseEnter={() => hasSubs && setActiveItem(serviceItem.serviceId ?? serviceItem.title)}
                    onMouseLeave={() => setActiveItem(null)}
                  >
                    <a
                      href={serviceItem.serviceId ? `/services/${serviceItem.serviceId}` : '#'}
                      onClick={(e) => {
                        if (!hasSubs) {
                          onServiceClick(serviceItem, e);
                        } else {
                          e.preventDefault();
                        }
                      }}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded hover:bg-[#eef3f7] hover:text-[#376082] text-gray-600 transition-colors group"
                      style={itemTextStyle}
                    >
                      <span>{serviceItem.title}</span>
                      {hasSubs && (
                        <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-400 group-hover:text-[#376082] transition-colors" />
                      )}
                    </a>

                    {hasSubs && activeItem === (serviceItem.serviceId ?? serviceItem.title) && (
                      <div
                        className="absolute left-full top-0 z-[200] bg-white border border-gray-200 rounded-lg shadow-xl min-w-[240px] py-2"
                        style={{ borderTopColor: BRAND, borderTopWidth: 2 }}
                      >
                        {activeSubs.map((sub) => (
                          <a
                            key={sub.serviceId ?? sub.id}
                            href={sub.serviceId ? `/services/${sub.serviceId}` : '#'}
                            onClick={(e) => onServiceClick(sub, e)}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 rounded hover:bg-[#eef3f7] hover:text-[#376082] transition-colors"
                            style={itemTextStyle}
                          >
                            <span
                              className="w-1 h-1 rounded-full flex-shrink-0"
                              style={{ backgroundColor: BRAND }}
                            />
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};


export const MenuDropdownContent = ({ items, onItemClick }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-3 gap-8">
        {items.map((group) => (
          <div key={group.heading}>
            <p
              className="text-xs font-semibold uppercase mb-3 pb-1 border-b tracking-widest"
              style={{ color: BRAND, borderColor: '#d1dde8', fontFamily: "century, 'Century Gothic', sans-serif" }}
            >
              {group.heading}
            </p>
            <div className="flex flex-col gap-0.5">
              {(group.items ?? []).map((item) => {
                const label = typeof item === 'string' ? item : item.label;
                const href  = typeof item === 'string' ? '#' : (item.href ?? '#');
                const ext   = typeof item !== 'string' && item.external;

                return (
                  <a
                    key={label}
                    href={href}
                    target={ext ? '_blank' : undefined}
                    rel={ext ? 'noopener noreferrer' : undefined}
                    onClick={(e) => onItemClick && onItemClick(label, e)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 rounded hover:bg-[#eef3f7] hover:text-[#376082] transition-colors"
                    style={itemTextStyle}
                  >
                    {label.charAt(0) + label.slice(1).toLowerCase()}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};