import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common';
import { AnimatedSection, StaggeredGrid } from '../components/animations';
import logoImage from '../assets/small_Gemini_Generated_Image_1vj5vl1vj5vl1vj5-removebg-preview.png';
import heroImage from '../assets/1Header-section.png';
import usersImage from '../assets/users.png';

const HeroPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // removed old features grid; redesigned section below uses inline config

  const testimonials = [
    {
      name: 'Sarah Sharma',
      role: 'Data Scientist',
      company: 'Tech Corp',
      content: 'CareerSetu helped me transition from marketing to data science. The AI recommendations were spot-on!',
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      company: 'StartupXYZ',
      content: 'The mentorship program connected me with industry leaders who guided my career growth.',
      avatar: 'MR'
    },
    {
      name: 'Emily Johnson',
      role: 'UX Designer',
      company: 'Design Studio',
      content: 'The learning paths were perfectly tailored to my goals. I landed my dream job in 6 months!',
      avatar: 'EJ'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src={logoImage}
                  alt="CareerSetu Logo"
                  className="h-8 w-8 object-contain"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-lg text-gray-900">CareerSetu</span>
                  <span className="text-[10px] text-emerald-600 font-medium">For Career Guidance</span>
                </div>
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-1 relative">
              {[
                { label: 'Prepare', hasDropdown: true },
                { label: 'Courses', hasDropdown: true },
                { label: 'Projects', hasDropdown: true },
                { label: 'Skill Courses', hasDropdown: true },
                { label: 'OffCampus', hasDropdown: true }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="relative nav-item"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                      activeDropdown === item.label 
                        ? 'text-emerald-600' 
                        : 'text-gray-700 hover:text-emerald-600'
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Mega Menu Dropdown */}
                  {activeDropdown === item.label && (
                    <MegaMenuDropdown menuType={item.label} navigate={navigate} onMouseEnter={() => setActiveDropdown(item.label)} />
                  )}
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder='Search for "Engineering"'
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Login */}
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Login
              </button>

              {/* Get Sign Up Button */}
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-md text-sm flex items-center gap-1 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Sign Up
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-[90vh]">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <AnimatedSection animation="slideUp" delay={0}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                  <span className="text-emerald-600">CareerSetu, </span>
                  <span className="text-gray-400">Careers</span>
                  <br />
                  <span className="text-gray-900">Simplified!!!</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" delay={100}>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Sign Up for Free
                </button>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" delay={200}>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: '✓', label: 'Career Path' },
                    { icon: '✓', label: 'Skill Building' },
                    { icon: '✓', label: 'Interview Prep' },
                    { icon: '✓', label: 'Job Search' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <span className="text-emerald-600 text-xl font-bold">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slideUp" delay={300}>
                <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-md border border-gray-100">
                  <img 
                    src={usersImage} 
                    alt="Active learners" 
                    className="h-12 w-auto object-contain"
                  />
                  <div>
                    <div className="text-lg font-bold text-gray-900">10 Million+</div>
                    <div className="text-sm text-gray-500">Monthly Active Learners</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Content - Hero Image */}
            <AnimatedSection animation="scaleIn" delay={200}>
              <div className="relative h-[600px] lg:h-[700px]">
                {/* Hero Image - Natural Display */}
                <div className="relative w-full h-full">
                  <img 
                    src={heroImage} 
                    alt="Student with backpack and notebook" 
                    className="w-full h-full object-contain object-center"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Company Marquee Section */}
      <section className="bg-emerald-600 py-6 overflow-hidden">
        <div className="relative">
          <div className="marquee-container">
            <div className="marquee-content">
              {/* First set of logos */}
              <div className="flex items-center space-x-12">
                {[
                  'GaragePlug', 'Google', 'Infosys', 'KPMG', 'Mindtree', 
                  'Persistent', 'Simplilearn', 'TCS iON', 'upGrad', 
                  'Whatfix', 'Zoho', 'Accenture', 'BOSCH'
                ].map((company, idx) => (
                  <div 
                    key={`logo-1-${idx}`} 
                    className="flex-shrink-0 bg-white rounded-lg px-6 py-3 shadow-md min-w-[140px] flex items-center justify-center"
                  >
                    <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
                      {company}
                    </span>
                  </div>
                ))}
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center space-x-12">
                {[
                  'GaragePlug', 'Google', 'Infosys', 'KPMG', 'Mindtree', 
                  'Persistent', 'Simplilearn', 'TCS iON', 'upGrad', 
                  'Whatfix', 'Zoho', 'Accenture', 'BOSCH'
                ].map((company, idx) => (
                  <div 
                    key={`logo-2-${idx}`} 
                    className="flex-shrink-0 bg-white rounded-lg px-6 py-3 shadow-md min-w-[140px] flex items-center justify-center"
                  >
                    <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
                      {company}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose a Learning Path Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp" className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Choose a Learning Path</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Companies Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Companies</h3>
              <p className="text-gray-600 mb-6">
                Prepare for companies like Cisco, Amazon, TCS, Google with CareerSetu's Company specific curated courses
              </p>
              <div className="grid grid-cols-4 gap-4 mb-8">
                {['TCS', 'Cisco', 'Tech Mahindra', 'Amazon', 'Mindtree', 'Netflix', 'Google', 'Microsoft'].map((company, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-xl font-bold text-gray-700">{company}</div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/careers')}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                View All Companies
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Aptitude Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Aptitude</h3>
              <p className="text-gray-600 mb-6">
                Learn Aptitude from basic to pro with CareerSetu
              </p>
              <div className="h-32"></div>
              <button 
                onClick={() => navigate('/learning')}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Prepare Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* CS Subjects Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">CS Subjects</h3>
              <p className="text-gray-600 mb-6">
                Prepare for CS Subjects with CareerSetu and excel in your chosen field.
              </p>
              <div className="h-20"></div>
              <button 
                onClick={() => navigate('/learning')}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Prepare Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Programming Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Programming</h3>
              <p className="text-gray-600 mb-6">
                Learn and become a pro in programming with CareerSetu
              </p>
              <div className="flex items-center justify-center h-20">
                <div className="text-6xl text-gray-400">&lt;/&gt;</div>
              </div>
              <button 
                onClick={() => navigate('/learning')}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Interview Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Interview</h3>
              <p className="text-gray-600 mb-6">
                HR, Puzzles, Group Discussion, Interview Experiences and more ...
              </p>
              <div className="h-20"></div>
              <button 
                onClick={() => navigate('/interview-prep')}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Off Campus Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Off Campus</h3>
              <p className="text-gray-600 mb-6">
                Get Latest Off-Campus Updates at our social media platforms
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { name: 'Instagram', icon: '📷', color: 'bg-pink-50 hover:bg-pink-100' },
                  { name: 'LinkedIn', icon: '💼', color: 'bg-blue-50 hover:bg-blue-100' },
                  { name: 'Whatsapp', icon: '💬', color: 'bg-green-50 hover:bg-green-100' },
                  { name: 'Telegram', icon: '✈️', color: 'bg-sky-50 hover:bg-sky-100' }
                ].map((social, idx) => (
                  <button 
                    key={idx}
                    className={`w-full ${social.color} border border-gray-200 px-4 py-3 rounded-lg font-medium text-gray-700 flex items-center gap-3 transition-colors`}
                  >
                    <span className="text-2xl">{social.icon}</span>
                    {social.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programming/CS Subject Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Title */}
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Programming/CS Subject</h2>
              <p className="text-gray-600 text-lg">
                Competitive Coding, Basic / Advanced Coding, Top Codes, of Languages like - C/C++/Java or CS Subjects Like OS, DBMS etc
              </p>
            </div>

            {/* Right Side - Grid of Options */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: '💻', title: 'Top 100 Codes' },
                { icon: '📄', title: 'Top 500 Codes' },
                { icon: '{C}', title: 'Learn C' },
                { icon: '{C++}', title: 'Learn C++' },
                { icon: '✏️', title: 'Learn DSA' },
                { icon: '</>', title: 'Competitive Coding' },
                { icon: '⚙️', title: 'Learn OS' },
                { icon: '🗄️', title: 'Learn DBMS' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/learning')}
                  className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 font-semibold text-center">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CareerSetu Subscription Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="text-emerald-400">CareerSetu</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Learn from the Top 1% Industry Experts and develop real-world skills with our courses
              </p>

              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Learn from Industry Experts</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[
                    { name: 'Siddhart', company: 'Deloitte' },
                    { name: 'Rohit Sharma', company: 'Paytm' },
                    { name: 'Atulya Kaushik', company: 'Google' },
                    { name: 'Shourya Kaushik', company: 'CRED' },
                    { name: 'Siddhant Soni', company: 'Flipkart' }
                  ].map((expert, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 mx-auto mb-2 flex items-center justify-center text-2xl font-bold">
                        {expert.name.charAt(0)}
                      </div>
                      <div className="text-sm font-semibold">{expert.name}</div>
                      <div className="text-xs text-gray-400">{expert.company}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => navigate('/onboarding')}
                className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                Experience CareerSetu
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* Right Side - Company Logos Grid with Bento Box Layout */}
            <div className="grid grid-cols-3 gap-3">
              {/* Large cards */}
              <div className="col-span-2 row-span-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-2">CareerSetu</h3>
                  <p className="text-sm opacity-90">200+ Courses curated from Trusted Sources</p>
                </div>
              </div>

              <div className="bg-pink-600 rounded-2xl p-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">DATA</div>
                  <div className="text-sm">STRUCTURES</div>
                </div>
              </div>

              <div className="bg-orange-500 rounded-2xl p-4 flex items-center justify-center">
                <div className="text-center text-sm font-bold">200+ Courses<br/>Under One Subscription</div>
              </div>

              <div className="col-span-2 bg-emerald-400 rounded-2xl p-6">
                <h4 className="text-2xl font-bold text-black">Tracks for<br/>Service/Product Based<br/>Companies</h4>
              </div>

              <div className="bg-yellow-400 rounded-2xl p-4 flex items-center justify-center text-black">
                <div className="text-center">
                  <div className="text-lg font-bold">Full Stack</div>
                  <div className="text-xs">Web Dev</div>
                </div>
              </div>

              <div className="bg-purple-600 rounded-2xl p-4 flex items-center justify-center">
                <div className="text-sm font-bold text-center">TRACKS FOR<br/>SERVICE BASED<br/>COMPANIES</div>
              </div>

              <div className="bg-pink-500 rounded-2xl p-4 flex items-center justify-center">
                <div className="text-sm font-bold">Netflix for<br/>Placements &<br/>Upskilling</div>
              </div>

              <div className="bg-blue-600 rounded-2xl p-4 flex items-center justify-center text-xs font-bold">
                TRACK FOR<br/>DATA SCIENCE<br/>& ANALYTICS
              </div>

              <div className="bg-teal-500 rounded-2xl p-4 flex items-center justify-center">
                <div className="text-2xl font-bold">SDLC</div>
              </div>
            </div>
          </div>

          {/* Company Logos at Top Right */}
          <div className="absolute top-8 right-8 grid grid-cols-3 gap-3">
            {['Paytm', 'Google', 'Amazon', 'Deloitte', 'FireEye', 'PayPal', 'KPMG', 'CRED', 'Instamojo', 'Rippling'].map((company, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-xs font-semibold text-center">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp" className="text-center mb-12">
            <h2 className="text-heading-2 font-bold text-text-primary">What can CareerSetu do?</h2>
            <p className="text-body text-text-secondary mt-2">Expert-backed activities that guide every step of the journey.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              {[
                'Explore career paths that match strengths and interests',
                'Build career development skills and confidence',
                'Ace the job search with resumes, networking, and interviews',
                'Connect school to career with practical guidance',
                'Dive into career-specific pathways and market insights',
              ].map((t,idx)=> (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mt-0.5">✓</div>
                  <p className="text-body text-text-primary">{t}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="h-80 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-text-secondary">
                  <span className="text-body">Module preview</span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {[1,2,3,4].map(i=> (<div key={i} className="h-10 rounded-lg bg-gray-100 border border-gray-200" />))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
     
      {/* Stats Section */}
      {/* Features Section (Everything You Need) */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp" className="text-center mb-12">
            <h2 className="text-heading-2 font-bold text-text-primary">Everything You Need</h2>
            <p className="text-body text-text-secondary mt-2">Guided activities, market insights, and mentorship—wrapped in a simple experience.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { title: 'Career Exploration', desc: 'Discover best-fit roles and understand real market demand.', bg: 'bg-blue-50', emoji:'🧭' },
              { title: 'Skill Building', desc: 'Close gaps with curated courses and hands-on projects.', bg: 'bg-green-50', emoji:'📚' },
              { title: 'Job Readiness', desc: 'Polish resumes, practice interviews, and network with mentors.', bg: 'bg-purple-50', emoji:'💼' },
            ].map((card, i)=> (
              <div key={i} className={`rounded-2xl border border-gray-200 p-6 ${card.bg}`}>
                <div className="text-3xl mb-3">{card.emoji}</div>
                <h3 className="text-heading-3 font-semibold text-text-primary mb-1">{card.title}</h3>
                <p className="text-body text-text-secondary">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp" className="text-center mb-16">
            <h2 className="text-heading-2 font-bold text-text-primary mb-4">
              How CareerSetu Works
            </h2>
            <p className="text-body-large text-text-secondary max-w-2xl mx-auto">
              Get started in minutes and see results in weeks.
            </p>
          </AnimatedSection>
          <StaggeredGrid 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            animation="slideUp"
            delay={300}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <span className="text-white text-heading-2 font-bold">1</span>
              </div>
              <h3 className="text-heading-3 font-semibold text-text-primary mb-3">
                Upload Your Profile
              </h3>
              <p className="text-body text-text-secondary">
                Share your resume, skills, and career goals. Our AI analyzes your background to understand your potential.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <span className="text-white text-heading-2 font-bold">2</span>
              </div>
              <h3 className="text-heading-3 font-semibold text-text-primary mb-3">
                Get AI Analysis
              </h3>
              <p className="text-body text-text-secondary">
                Watch our AI Career Advisory Board collaborate to create your personalized career forecast and recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <span className="text-white text-heading-2 font-bold">3</span>
              </div>
              <h3 className="text-heading-3 font-semibold text-text-primary mb-3">
                Take Action
              </h3>
              <p className="text-body text-text-secondary">
                Follow your personalized learning path, connect with mentors, and apply to recommended opportunities.
              </p>
            </div>
          </StaggeredGrid>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp" className="text-center mb-12">
            <h2 className="text-heading-2 font-bold text-text-primary">Real Stories</h2>
            <p className="text-body text-text-secondary mt-2">Learners and partners share outcomes and wins.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i)=> (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">{t.avatar}</div>
                  <div>
                    <div className="text-body font-semibold text-text-primary">{t.name}</div>
                    <div className="text-body-small text-text-secondary">{t.role} • {t.company}</div>
                  </div>
                </div>
                <p className="text-body text-text-secondary">“{t.content}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cta-gradient">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="scaleIn" delay={0}>
            <h2 className="text-heading-2 font-bold text-gray mb-4">
              Ready to Transform Your Career?
            </h2>
          </AnimatedSection>
          <AnimatedSection animation="slideUp" delay={200}>
            <p className="text-body-large text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already discovered their ideal career path with CareerSetu.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="slideUp" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/onboarding')}
                className="px-8 py-4 text-lg bg-white text-primary-blue hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
                className="px-8 py-4 text-lg bg-white border-white text- hover:bg-gray-400 hover:text-primary-blue hover:scale-105 transition-transform duration-300"
              >
                Sign In
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={logoImage}
                  alt="CareerSetu Logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="text-heading-3 font-bold">CareerSetu</span>
              </div>
              <p className="text-body-small text-gray-400">
                Your AI-powered career guidance platform.
              </p>
            </div>
            <div>
              <h4 className="text-body font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-body-small text-gray-400">
                <li>AI Career Guidance</li>
                <li>Market Intelligence</li>
                <li>Learning Paths</li>
                <li>Mentorship</li>
              </ul>
            </div>
            <div>
              <h4 className="text-body font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-body-small text-gray-400">
                <li>Career Blog</li>
                <li>Success Stories</li>
                <li>Industry Reports</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h4 className="text-body font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-body-small text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-body-small text-gray-400">
              © 2024 CareerSetu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroPage;

// Mega Menu Dropdown Component
const MegaMenuDropdown: React.FC<{ menuType: string; navigate: (path: string) => void; onMouseEnter: () => void }> = ({ menuType, navigate, onMouseEnter }) => {
  const exploreMenu = {
    leftSection: [
      { title: 'All Platforms', items: [] },
      { title: 'Programming', items: [] },
      { title: 'Aptitude', items: [] },
      { title: 'Syllabus', items: [] },
      { title: 'Interview Prep', items: [] },
      { title: 'Interview Exp.', items: [] },
      { title: 'Off Campus', items: [] }
    ],
    platforms: [
      { name: 'AMCAT', icon: '🎯' },
      { name: 'CoCubes', icon: '🔶' },
      { name: 'DevSquare', icon: '📐' },
      { name: 'eLitmus', icon: '📊' },
      { name: 'First Naukri', icon: 'Fn' },
      { name: 'HackerRank', icon: 'HR' },
      { name: 'HirePro', icon: '✦' },
      { name: 'Merittrac', icon: 'm' },
      { name: 'Mettl', icon: 'M' }
    ],
    companies: [
      { name: 'Deloitte NLA', icon: 'D' },
      { name: 'Accenture', icon: '>' },
      { name: 'Capgemini', icon: '💎' },
      { name: 'Cognizant GenC', icon: 'C' },
      { name: 'Infosys', icon: 'ℹ️' },
      { name: 'TCS NQT', icon: 'T' },
      { name: 'TCS Digital', icon: 'TD' },
      { name: 'TCS Ninja', icon: 'TN' },
      { name: 'HackWithInfy', icon: 'HWI' },
      { name: 'Tech Mahindra', icon: 'TM' },
      { name: 'VMware', icon: 'V' },
      { name: 'Virtusa', icon: 'Vi' },
      { name: 'Wipro', icon: 'W' },
      { name: 'Wipro NTH', icon: 'WN' },
      { name: 'Wipro WILP', icon: 'WW' },
      { name: 'Zs Associates', icon: 'Zs' }
    ]
  };

  const coursesMenu = {
    skills: [
      { name: 'AIML', icon: '🤖' },
      { name: 'Data Analytics', icon: '📊' },
      { name: 'Data Science', icon: '🔬' },
      { name: 'Power BI', icon: '⚡' },
      { name: 'Tableau', icon: '📈' },
      { name: 'Big Data', icon: '💾' }
    ],
    technical: [
      { name: 'QA Analyst', icon: '🔍' },
      { name: 'Git', icon: '🔀' },
      { name: 'Github', icon: '⚫' },
      { name: 'Ethical Hacking', icon: '🔐' },
      { name: 'NLP and Deep Learning', icon: '🧠' }
    ],
    cloud: [
      { name: 'AWS Cloud', icon: '☁️' },
      { name: 'Cloud Computing', icon: '🌥️' },
      { name: 'Cyber Security', icon: '🛡️' },
      { name: 'Statistics for DA', icon: '📉' }
    ]
  };

  if (menuType === 'Prepare') {
    return (
      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl w-[900px] p-6 z-50 animate-slideDown" onMouseEnter={onMouseEnter}>
        <div className="grid grid-cols-4 gap-6">
          {/* Left Navigation */}
          <div className="border-r border-gray-200 pr-4">
            {exploreMenu.leftSection.map((section, idx) => (
              <button
                key={idx}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md flex items-center justify-between transition-colors"
              >
                {section.title}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Platforms Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">All Platforms</h3>
            <div className="space-y-2">
              {exploreMenu.platforms.map((platform, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/careers')}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-600 transition-colors w-full"
                >
                  <span className="text-lg">{platform.icon}</span>
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Companies Column */}
          <div className="col-span-2">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">All Companies</h3>
            <div className="grid grid-cols-2 gap-2">
              {exploreMenu.companies.map((company, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/jobs')}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <span className="text-lg">{company.icon}</span>
                  {company.name}
                </button>
              ))}
              <button className="text-emerald-600 font-medium text-sm flex items-center gap-1">
                All Companies
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Card */}
        <div className="absolute right-6 top-6 w-64 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
          <img src={logoImage} alt="Operation Placement" className="w-full rounded-lg mb-2" />
          <h4 className="font-bold text-sm mb-1">OPERATION PLACEMENT</h4>
          <p className="text-xs text-gray-600 mb-2">Join our live Cohort now, get Certificate and land your Dream Job!</p>
          <button className="bg-gray-900 text-white text-xs px-4 py-2 rounded-md w-full font-semibold">
            Apply Now
          </button>
        </div>
      </div>
    );
  }

  if (menuType === 'Courses') {
    return (
      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl w-[800px] p-6 z-50 animate-slideDown" onMouseEnter={onMouseEnter}>
        <div className="grid grid-cols-4 gap-6">
          {/* Left Navigation */}
          <div className="border-r border-gray-200 pr-4">
            {['Skills', 'Popular Languages', 'Platform', 'Aptitude', 'CS Subjects'].map((section, idx) => (
              <button
                key={idx}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md flex items-center justify-between transition-colors"
              >
                {section}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Skills Content */}
          <div className="col-span-3 grid grid-cols-3 gap-4">
            {/* Skills Column 1 */}
            <div className="space-y-2">
              {coursesMenu.skills.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/learning')}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-600 transition-colors w-full"
                >
                  <span className="text-lg">{skill.icon}</span>
                  {skill.name}
                </button>
              ))}
            </div>

            {/* Skills Column 2 */}
            <div className="space-y-2">
              {coursesMenu.technical.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/learning')}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-600 transition-colors w-full"
                >
                  <span className="text-lg">{skill.icon}</span>
                  {skill.name}
                </button>
              ))}
            </div>

            {/* Skills Column 3 */}
            <div className="space-y-2">
              {coursesMenu.cloud.map((skill, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate('/learning')}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-600 transition-colors w-full"
                >
                  <span className="text-lg">{skill.icon}</span>
                  {skill.name}
                </button>
              ))}
              <button className="text-emerald-600 font-medium text-sm flex items-center gap-1">
                See all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Card */}
        <div className="absolute right-6 top-6 w-64 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
          <div className="bg-white rounded-lg p-3 mb-2">
            <div className="text-center">
              <div className="text-4xl mb-2">🎓</div>
              <p className="text-xs font-semibold">OPERATION PLACEMENT</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-2">Join our live Cohort now, get Certificate and land your Dream Job!</p>
          <button className="bg-gray-900 text-white text-xs px-4 py-2 rounded-md w-full font-semibold">
            Apply Now
          </button>
        </div>
      </div>
    );
  }

  if (menuType === 'Projects') {
    const projectsData = [
      { 
        title: 'Image-Based Species Recognition',
        tech: ['Python', 'Flask', 'OpenCV', 'AI/ML'],
        badge: 'Become CareerSetu Certified',
        color: 'from-amber-100 to-amber-200'
      },
      { 
        title: 'American Express DA',
        tech: ['Excel', 'Tableau', 'SQL', 'Analytics'],
        badge: null,
        color: 'from-blue-600 to-blue-700'
      },
    ];

    return (
      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl w-[1000px] p-6 z-50 animate-slideDown" onMouseEnter={onMouseEnter}>
        <div className="mb-4">
          <div className="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-md mb-2">
            🏢 Industry Projects
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Placement ready projects</h3>
          <p className="text-sm text-gray-600 mb-3">Show recruiters your skills through hands-on projects, not just certificates.</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-emerald-600">✓</span> Latest technology and tools
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-emerald-600">✓</span> Included in CareerSetu
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {projectsData.map((project, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${project.color} rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
              <h4 className="font-bold text-sm mb-2 text-gray-900">{project.title}</h4>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs bg-white/70 px-2 py-0.5 rounded">{tech}</span>
                ))}
              </div>
              {project.badge && (
                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded inline-block">
                  📜 {project.badge}
                </div>
              )}
            </div>
          ))}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 flex items-center justify-center border-2 border-dashed border-emerald-300">
            <button className="text-emerald-600 font-semibold text-sm">View All Projects →</button>
          </div>
        </div>
      </div>
    );
  }

  if (menuType === 'Skill Courses') {
    const skillCoursesData = [
      {
        title: 'GenAI',
        subtitle: 'Become Job Ready with',
        features: ['With 8+ Gen AI Projects', 'Become CareerSetu Certified'],
        color: 'from-purple-900 via-purple-800 to-purple-900',
        icon: '🤖'
      },
      {
        title: 'Data Analysts',
        subtitle: 'Become Job Ready',
        features: ['70+ Hours', 'CareerSetu Certifications'],
        color: 'from-orange-700 to-orange-800',
        icon: '📊'
      },
      {
        title: 'Full Stack Developer',
        subtitle: 'Become Job Ready',
        features: ['70+ Hours', '20+ Projects & 3 Capstone'],
        color: 'from-emerald-700 to-emerald-800',
        icon: '💻'
      }
    ];

    return (
      <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl w-[1100px] p-6 z-50 animate-slideDown" onMouseEnter={onMouseEnter}>
        <div className="grid grid-cols-3 gap-4">
          {skillCoursesData.map((course, idx) => (
            <div 
              key={idx} 
              className={`bg-gradient-to-br ${course.color} rounded-lg p-6 text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">{course.subtitle}</p>
                  <h4 className="text-2xl font-bold">{course.title}</h4>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-lg">
                    {course.icon}
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {course.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-lg">✨</span> {feature}
                  </div>
                ))}
              </div>
              <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold w-full hover:bg-white/30 transition-colors">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Simple dropdown for other menu items
  return (
    <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl min-w-[200px] p-4 z-50 animate-slideDown" onMouseEnter={onMouseEnter}>
      <div className="space-y-2">
        {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, idx) => (
          <button
            key={idx}
            onClick={() => navigate('/dashboard')}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// Local component: TabsBlock
const TabsBlock: React.FC = () => {
  const [active, setActive] = useState<'institutions' | 'individuals'>('institutions');

  const bulletsInstitutions = [
    'Scale guidance with consistent, research-backed activities',
    'Improve job readiness and placement outcomes',
    'Integrate with portals/LMS and include your own resources',
  ];

  const bulletsIndividuals = [
    'Explore career paths that match your strengths',
    'Build job search skills with practical activities',
    'Get tailored learning and next-step suggestions',
  ];

  const bullets = active === 'institutions' ? bulletsInstitutions : bulletsIndividuals;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActive('institutions')}
            className={`px-4 py-2 rounded-full border text-body font-medium ${active === 'institutions' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-text-primary border-gray-200'}`}
          >
            For Institutions
          </button>
          <button
            onClick={() => setActive('individuals')}
            className={`px-4 py-2 rounded-full border text-body font-medium ${active === 'individuals' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-text-primary border-gray-200'}`}
          >
            For Individuals
          </button>
        </div>
        <div className="space-y-4">
          {bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 p-3">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-600"></div>
              <p className="text-body text-text-primary">{b}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <div className="h-80 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center text-text-secondary">
            <span className="text-body">{active === 'institutions' ? 'Dashboard preview' : 'Learner preview'}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="h-16 rounded-lg bg-blue-50 border border-blue-100" />
            <div className="h-16 rounded-lg bg-green-50 border border-green-100" />
            <div className="h-16 rounded-lg bg-purple-50 border border-purple-100" />
          </div>
        </div>
      </div>
    </div>
  );
};


