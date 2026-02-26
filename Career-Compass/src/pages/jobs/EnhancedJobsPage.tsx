import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  skills: string[];
  applicants: number;
  postedDate: string;
  matchScore: number;
  trending?: boolean;
  quickApply?: boolean;
  referralBonus?: number;
}

const EnhancedJobsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'discover' | 'applied' | 'saved' | 'referrals'>('discover');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [aiMatchEnabled, setAiMatchEnabled] = useState(true);

  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹25L - ₹40L',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      applicants: 234,
      postedDate: '2 days ago',
      matchScore: 92,
      trending: true,
      quickApply: true,
      referralBonus: 150000,
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '₹18L - ₹28L',
      skills: ['React', 'JavaScript', 'CSS', 'Redux'],
      applicants: 189,
      postedDate: '1 week ago',
      matchScore: 85,
      quickApply: true,
      referralBonus: 100000,
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      company: 'Amazon',
      location: 'Remote',
      type: 'Full-time',
      experience: '4-6 years',
      salary: '₹30L - ₹45L',
      skills: ['React', 'Python', 'MongoDB', 'Docker'],
      applicants: 312,
      postedDate: '3 days ago',
      matchScore: 88,
      trending: true,
      referralBonus: 125000,
    },
  ];

  const filteredJobs = mockJobs.filter(job => {
    if (selectedJobType !== 'all' && job.type !== selectedJobType) return false;
    if (selectedExperience !== 'all' && !job.experience.includes(selectedExperience)) return false;
    if (remoteOnly && job.location !== 'Remote') return false;
    return true;
  });

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const applyToJob = (jobId: string) => {
    setAppliedJobs(prev => [...prev, jobId]);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-amber-50">
        {/* Hero Section */}
        <div className="bg-emerald-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
              <p className="text-xl text-emerald-50">
                AI-powered job matching with referral rewards
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-2 flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-2 py-3 text-gray-900 focus:outline-none"
                />
                <button className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-sm text-emerald-100">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-emerald-100">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm text-emerald-100">Match Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-emerald-100">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-xl shadow-lg p-1 flex gap-1 overflow-x-auto">
            {[
              { id: 'discover', label: 'Discover Jobs' },
              { id: 'applied', label: 'Applied' },
              { id: 'saved', label: 'Saved Jobs' },
              { id: 'referrals', label: 'Referrals' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'discover' | 'applied' | 'saved' | 'referrals')}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                {tab.id === 'applied' && appliedJobs.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-white text-emerald-600 rounded-full text-xs">
                    {appliedJobs.length}
                  </span>
                )}
                {tab.id === 'saved' && savedJobs.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-white text-emerald-600 rounded-full text-xs">
                    {savedJobs.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'discover' && (
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-3 mb-6 lg:mb-0">
                <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Filters
                  </h3>

                  {/* AI Match Toggle */}
                  <div className="mb-6 p-3 bg-emerald-50 rounded-lg">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">AI Match Score</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={aiMatchEnabled}
                        onChange={(e) => setAiMatchEnabled(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                    </label>
                  </div>

                  {/* Job Type Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                    <select
                      value={selectedJobType}
                      onChange={(e) => setSelectedJobType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="all">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  {/* Experience Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="all">All Levels</option>
                      <option value="0-1">Entry Level (0-1 years)</option>
                      <option value="2-4">Mid Level (2-4 years)</option>
                      <option value="5+">Senior (5+ years)</option>
                    </select>
                  </div>

                  {/* Remote Only Toggle */}
                  <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={remoteOnly}
                        onChange={(e) => setRemoteOnly(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Remote Only</span>
                    </label>
                  </div>

                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Clear Filters
                  </button>
                </div>

                {/* Referral Program Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mt-6 hidden lg:block">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Referral Program</h4>
                      <p className="text-xs text-gray-600">Earn up to ₹1,50,000</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Refer friends and earn rewards when they get hired
                  </p>
                  <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Job Listings */}
              <div className="lg:col-span-9">
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        {/* Company Logo */}
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>

                        {/* Job Details */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-3 mb-1">
                                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                {job.trending && (
                                  <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                                    Trending
                                  </span>
                                )}
                                {job.quickApply && (
                                  <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-full">
                                    Quick Apply
                                  </span>
                                )}
                              </div>
                              <p className="text-lg font-semibold text-gray-700">{job.company}</p>
                            </div>

                            {/* AI Match Score */}
                            {aiMatchEnabled && (
                              <div className="text-center mt-4 md:mt-0">
                                <div className="relative w-16 h-16 mx-auto">
                                  <svg className="w-16 h-16 transform -rotate-90">
                                    <circle
                                      cx="32"
                                      cy="32"
                                      r="28"
                                      stroke="#e5e7eb"
                                      strokeWidth="6"
                                      fill="none"
                                    />
                                    <circle
                                      cx="32"
                                      cy="32"
                                      r="28"
                                      stroke="#059669"
                                      strokeWidth="6"
                                      fill="none"
                                      strokeDasharray={`${job.matchScore * 1.76} 176`}
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-emerald-600">{job.matchScore}%</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">Match</p>
                              </div>
                            )}
                          </div>

                          {/* Job Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                              <span>{job.experience}</span>
                            </div>
                            <div className="flex items-center gap-1 font-semibold text-emerald-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{job.salary}</span>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Bottom Info */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-gray-100 gap-4">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>{job.applicants} applicants</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{job.postedDate}</span>
                              </div>
                              {job.referralBonus && (
                                <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>₹{(job.referralBonus / 1000).toFixed(0)}K bonus</span>
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3">
                              <button
                                onClick={() => toggleSaveJob(job.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  savedJobs.includes(job.id)
                                    ? 'bg-emerald-100 text-emerald-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                <svg className="w-5 h-5" fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                              </button>
                              {job.referralBonus && (
                                <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-200 transition-colors">
                                  Refer & Earn
                                </button>
                              )}
                              <button
                                onClick={() => applyToJob(job.id)}
                                disabled={appliedJobs.includes(job.id)}
                                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                                  appliedJobs.includes(job.id)
                                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                }`}
                              >
                                {appliedJobs.includes(job.id) ? 'Applied' : 'Apply Now'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Applied Jobs Tab */}
          {activeTab === 'applied' && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Applications Yet</h3>
              <p className="text-gray-600 mb-6">Start applying to jobs that match your skills</p>
              <button
                onClick={() => setActiveTab('discover')}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Browse Jobs
              </button>
            </div>
          )}

          {/* Saved Jobs Tab */}
          {activeTab === 'saved' && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Saved Jobs</h3>
              <p className="text-gray-600 mb-6">Save jobs you're interested in to apply later</p>
              <button
                onClick={() => setActiveTab('discover')}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Discover Jobs
              </button>
            </div>
          )}

          {/* Referrals Tab */}
          {activeTab === 'referrals' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Referral Program</h2>
                    <p className="text-gray-600">Earn up to ₹1,50,000 per successful referral</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">₹0</div>
                    <div className="text-sm text-gray-600">Total Earned</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">0</div>
                    <div className="text-sm text-gray-600">Active Referrals</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">0</div>
                    <div className="text-sm text-gray-600">Successful Hires</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-emerald-600">1</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Share Job</h4>
                    <p className="text-sm text-gray-600">Share job openings with your network</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">2</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Track Progress</h4>
                    <p className="text-sm text-gray-600">Monitor application status in real-time</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-yellow-600">3</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Earn Rewards</h4>
                    <p className="text-sm text-gray-600">Get paid when they're hired</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EnhancedJobsPage;
