import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../hooks/useAppData';
import logoImage from '../../assets/small_Gemini_Generated_Image_1vj5vl1vj5vl1vj5-removebg-preview.png';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useAppData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 py-4">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
          <div className="flex justify-between items-center h-16 px-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-3 text-heading-3 font-bold text-text-primary hover:text-primary-blue transition-colors"
            >
              <img 
                src={logoImage} 
                alt="CareerSetu Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              />
              <span className="hidden sm:block">CareerSetu</span>
            </button>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/careers')}
              className="text-sm px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              Careers
            </button>
            <button
              onClick={() => navigate('/career-guidance')}
              className="text-sm px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              Guidance
            </button>
            <button
              onClick={() => navigate('/jobs')}
              className="text-sm px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              Jobs
            </button>
            <button
              onClick={() => navigate('/learning')}
              className="text-sm px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              Learning
            </button>
            <button
              onClick={() => navigate('/mentors')}
              className="text-sm px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              Mentors
            </button>
            <button
              onClick={() => navigate('/resume')}
              className="text-sm px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              Resume
            </button>
            <button
              onClick={() => navigate('/agents')}
              className="text-sm px-3 py-1.5 text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              AI Agents
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {data?.user && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                    <span className="text-white text-body-small font-semibold">
                      {data.user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-body text-text-primary font-medium hidden sm:block">
                    {data.user.name}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-body text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate('/careers');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-body text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Careers
              </button>
              <button
                onClick={() => {
                  navigate('/career-guidance');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-body text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Career Guidance
              </button>
              <button
                onClick={() => {
                  navigate('/jobs');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-body text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Jobs
              </button>
              <button
                onClick={() => {
                  navigate('/learning');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-body text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Learning
              </button>
              <button
                onClick={() => {
                  navigate('/mentors');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-body text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Mentors
              </button>
              <button
                onClick={() => {
                  navigate('/resume');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-body text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Resume
              </button>
            <button
              onClick={() => {
                navigate('/agents');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-body text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              AI Agents
            </button>
              <button
                onClick={() => {
                  navigate('/profile');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-body text-text-secondary hover:text-text-primary hover:bg-gray-50 rounded-lg transition-colors"
              >
                Profile
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;