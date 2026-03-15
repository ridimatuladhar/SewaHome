import React from "react";

const MainContent = ({ typedText, typedText2 }) => (
  <main className="relative z-10 flex-1">
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between min-h-[500px]">
        <div className="flex-1 max-w-2xl space-y-4 w-full lg:w-auto">
          <div className="mb-8">
            <h1 
              className="text-5xl mt-30 md:mt-0 text-center md:text-start sm:text-4xl md:text-5xl text-[#376082] mb-4 rotate-[-10deg]" 
              style={{ 
                fontFamily: 'Britany',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)'
              }}
            >
              {typedText}
              <span className="animate-pulse">|</span>
            </h1>
          </div>
          <div className="mb-12 pt-20">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6dabff] leading-tight" 
              style={{ 
                fontFamily: 'Marine',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              {typedText2}
              <span className="animate-pulse">|</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default MainContent;
