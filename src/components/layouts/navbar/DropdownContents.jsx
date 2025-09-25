import React from 'react';

export const ServicesDropdownContent = ({ items, onServiceClick }) => {
  return (
    <div className="w-full max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => onServiceClick(item, e)}
            className="flex items-center  p-2 text-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 cursor-pointer group"
          >
            <div className="text-sm group-hover:text-blue-600">
              {item}
            </div>
            {/* <div className="text-xs text-gray-500 group-hover:text-blue-500">
              Professional care services tailored to your needs
            </div> */}
          </a>
        ))}
      </div>
    </div>
  );
};

export const AboutDropdownContent = ({ items, onAboutClick }) => {
  return (
    <div className="w-full max-w-7xl mx-auto pl-40 ">
      <div className="flex justify-center p-6">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => onAboutClick(item, e)}
            className="flex items-center px-10  p-2 justify-center text-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 cursor-pointer group"
          >
            <div className=" text-sm group-hover:text-blue-600 ">
              {item}
            </div>
            {/* <div className="text-xs text-gray-500 group-hover:text-blue-500">
              Discover our story and values
            </div> */}
          </a>
        ))}
      </div>
    </div>
  );
};

export const ReviewsDropdownContent = ({ items, onAboutClick }) => {
  const handleReviewClick = (item, e) => {
    e.preventDefault();
    // Handle different review types
    if (item === "GOOGLE BUSINESS REVIEWS") {
      window.open("https://www.google.com/search?q=sewa+home+care+reviews", "_blank");
    } else if (item === "CARE.COM REVIEWS") {
      window.open("https://sewahomecare.com/our-services", "_blank");
    }
    onAboutClick(item, e);
  };

  return (
    <div className="w-full flex justify-center  max-w-7xl mx-auto">
      <div className="flex gap-6 p-6">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => handleReviewClick(item, e)}
            className="flex py-2 justify-center p-2  text-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 cursor-pointer group"
          >
            <div className="text-sm group-hover:text-blue-600 ">
              {item}
            </div>
            {/* <div className="text-xs text-gray-500 group-hover:text-blue-500">
              Click to read our verified client reviews
            </div> */}
          </a>
        ))}
      </div>
    </div>
  );
};

// yo chai menu bhitra ko content haru ho 
export const MenuDropdownContent = ({ items, onItemClick, onAboutClick }) => {
  return (
    <div className="w-full max-w-7xl mx-auto ">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
        {items.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => {
              if (onItemClick) {
                onItemClick(typeof item === 'string' ? item : item.name, e);
              }
            }}
            className="flex items-center justify-center p-2 text-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 cursor-pointer group"
          >
            <div className="text-sm group-hover:text-blue-600">
              {typeof item === 'string' ? item : item.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};