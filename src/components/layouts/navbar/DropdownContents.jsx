import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const BRAND = '#376082';

export const ServicesDropdownContent = ({ items, onServiceClick }) => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-6">
      {items.map((category) => (
        <div key={category.title} className="mb-5 last:mb-0">
          {/* Category heading */}
          <p
            className="text-xs font-medium uppercase mb-3 pb-1 border-b"
            style={{ color: BRAND, borderColor: '#d1dde8' }}
          >
            {category.title}
          </p>

          {/* Items grid — only show active items */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
            {(category.items ?? [])
              .filter(item => item.isActive !== false)
              .map((serviceItem) => {
                // subItems from API are objects: { id, serviceId, title, ... }
                // Filter to active only
                const activeSubs = (serviceItem.subItems ?? []).filter(s => s.isActive !== false);
                const hasSubs    = activeSubs.length > 0;

                return (
                  <div
                    key={serviceItem.serviceId ?? serviceItem.title}
                    className="relative"
                    onMouseEnter={() => hasSubs && setActiveItem(serviceItem.serviceId ?? serviceItem.title)}
                    onMouseLeave={() => setActiveItem(null)}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        if (!hasSubs) {
                          // Leaf item — pass the whole object so Navbar can use serviceId
                          onServiceClick(serviceItem, e);
                        } else {
                          e.preventDefault();
                        }
                      }}
                      className="flex items-center justify-between gap-2 px-3 py-2 text-sm text-gray-600 rounded hover:bg-[#eef3f7] transition-colors group"
                    >
                      <span className="group-hover:text-[#376082] transition-colors">
                        {serviceItem.title}
                      </span>
                      {hasSubs && (
                        <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-400 group-hover:text-[#376082] transition-colors" />
                      )}
                    </a>

                    {/* Sub-items fly-out panel */}
                    {hasSubs && activeItem === (serviceItem.serviceId ?? serviceItem.title) && (
                      <div
                        className="absolute left-full top-0 z-[200] bg-white border border-gray-200 rounded-lg shadow-xl min-w-[240px] py-2"
                        style={{ borderTopColor: BRAND, borderTopWidth: 2 }}
                      >
                        {activeSubs.map((sub) => (
                          <a
                            key={sub.serviceId ?? sub.id}
                            href="#"
                            onClick={(e) => onServiceClick(sub, e)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#376082] hover:bg-[#eef3f7] transition-colors"
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {items.map((item, index) => {
          const label = typeof item === 'string' ? item : item.name;
          return (
            <a
              key={index}
              href="#"
              onClick={(e) => onItemClick && onItemClick(label, e)}
              className="flex items-center justify-center text-center px-3 py-2.5 text-xs font-semibold tracking-wide rounded border border-transparent hover:bg-[#eef3f7] hover:text-[#376082] text-gray-600 transition-all duration-150 cursor-pointer"
            >
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};