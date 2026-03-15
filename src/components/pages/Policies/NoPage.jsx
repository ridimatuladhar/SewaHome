import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/Navbar';
import FooterButtons from '../footer/FooterButtons';

const NoPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className=" flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 mt-16  lg:mt-32 mb-10">
        <div className="max-w-md w-full text-center">
          {/* 404 Graphic */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-9xl font-bold text-gray-300">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-[#376082] mb-4">
            Page not found
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered an incorrect URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Back
            </button>
            
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-[#376082] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Go Home
            </button>
          </div>

          
        </div>
      </main>

      <FooterButtons />
    </div>
  );
};

export default NoPage;