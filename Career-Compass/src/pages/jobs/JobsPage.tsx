import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';
import { AnimatedSection, StaggeredGrid } from '../../components/animations';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  remote: boolean;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience: string;
  description: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
  applicants: number;
  views: number;
  recruiter: {
    name: string;
    title: string;
    email: string;
    linkedin: string;
    bio: string;
  };
  companyInfo: {
    size: string;
    industry: string;
    website: string;
    description: string;
  };
  interviewProcess: Array<{
    stage: string;
    duration: string;
    type: string;
    description: string;
  }>;
}

const JobsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useAppData();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [salaryRange, setSalaryRange] = useState([0, 3000000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load mock jobs data
    const loadJobs = async () => {
      try {
        const response = await fetch('/src/data/mock-jobs.json');
        const jobsData = await response.json();
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error('Error loading jobs:', error);
      }
    };
    loadJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Location filter
    if (selectedLocation !== 'all') {
      if (selectedLocation === 'remote') {
        filtered = filtered.filter(job => job.remote);
      } else {
        filtered = filtered.filter(job => job.location.toLowerCase().includes(selectedLocation.toLowerCase()));
      }
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type.toLowerCase() === selectedType.toLowerCase());
    }

    // Experience filter
    if (selectedExperience !== 'all') {
      filtered = filtered.filter(job => {
        const expYears = parseInt(job.experience.split('-')[0]);
        const selectedYears = parseInt(selectedExperience);
        return expYears <= selectedYears;
      });
    }

    // Salary filter
    filtered = filtered.filter(job => 
      job.salary.min >= salaryRange[0] && job.salary.max <= salaryRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'salary':
        filtered.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'date':
        filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'applicants':
        filtered.sort((a, b) => b.applicants - a.applicants);
        break;
      default:
        // Relevance - could be based on skill match, etc.
        break;
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedLocation, selectedType, selectedExperience, salaryRange, sortBy]);

  const toggleSavedJob = (jobId: string) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
    } else {
      newSaved.add(jobId);
    }
    setSavedJobs(newSaved);
  };

  const getSkillMatch = (jobSkills: string[], userSkills: string[]) => {
    const matched = jobSkills.filter(skill =>
      userSkills.some(userSkill =>
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    return {
      matched: matched.length,
      total: jobSkills.length,
      percentage: Math.round((matched.length / jobSkills.length) * 100)
    };
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    const formatNumber = (num: number) => {
      if (num >= 100000) {
        return `${(num / 100000).toFixed(1)}L`;
      }
      return num.toLocaleString();
    };
    return `${formatNumber(salary.min)} - ${formatNumber(salary.max)} ${salary.currency}`;
  };

  const getLocations = () => {
    const locations = Array.from(new Set(jobs.map(job => job.location)));
    return locations;
  };

  const getExperienceLevels = () => {
    return ['0-1', '1-3', '3-5', '5+'];
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-body text-text-secondary">Failed to load user data</p>
        </div>
      </Layout>
    );
  }

  const { user } = data;

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <h1 className="text-heading-1 font-bold text-text-primary mb-2">
            🎯 Find Your Dream Job
          </h1>
          <p className="text-body-large text-text-secondary">
            Discover opportunities that match your skills and career goals
          </p>
        </AnimatedSection>

        {/* Search and Filters */}
        <AnimatedSection animation="slideUp" delay={100} className="mb-8">
          <Card className="p-6">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search jobs, companies, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6"
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border-light">
                  <div>
                    <label className="block text-body-small font-medium text-text-primary mb-2">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <option value="all">All Locations</option>
                      <option value="remote">Remote</option>
                      {getLocations().map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-body-small font-medium text-text-primary mb-2">
                      Job Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <option value="all">All Types</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-body-small font-medium text-text-primary mb-2">
                      Experience
                    </label>
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <option value="all">All Levels</option>
                      {getExperienceLevels().map(level => (
                        <option key={level} value={level}>{level} years</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-body-small font-medium text-text-primary mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="salary">Salary</option>
                      <option value="date">Date Posted</option>
                      <option value="applicants">Popularity</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </AnimatedSection>

        {/* Results Summary */}
        <AnimatedSection animation="slideUp" delay={150} className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-heading-2 font-semibold text-text-primary">
              {filteredJobs.length} Jobs Found
            </h2>
            <div className="text-body-small text-text-secondary">
              Based on your skills and preferences
            </div>
          </div>
        </AnimatedSection>

        {/* Job Cards */}
        <StaggeredGrid
          className="space-y-6"
          animation="slideUp"
          delay={200}
        >
          {filteredJobs.map((job) => {
            const skillMatch = getSkillMatch(job.skills, user.skills);
            const isSaved = savedJobs.has(job.id);
            
            return (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="space-y-4">
                  {/* Job Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-heading-3 font-semibold text-text-primary">
                          {job.title}
                        </h3>
                        <button
                          onClick={() => toggleSavedJob(job.id)}
                          className={`p-2 rounded-full transition-colors ${
                            isSaved 
                              ? 'bg-primary-blue text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-body text-text-secondary mb-2">
                        {job.company} • {job.location} • {job.type}
                      </p>
                      <p className="text-body-small text-text-secondary line-clamp-2">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-body-small text-text-secondary">Salary</div>
                      <div className="text-body font-semibold text-primary-blue">
                        {formatSalary(job.salary)}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-body-small text-text-secondary">Experience</div>
                      <div className="text-body font-semibold text-success">
                        {job.experience}
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-body-small text-text-secondary">Skill Match</div>
                      <div className="flex items-center space-x-2">
                        <div className="text-body font-semibold text-purple-600">
                          {skillMatch.percentage}%
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skillMatch.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Match */}
                  <div>
                    <div className="text-body-small text-text-secondary mb-2">
                      Skills Match ({skillMatch.matched}/{skillMatch.total})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 6).map((skill, index) => {
                        const hasSkill = user.skills.some(userSkill =>
                          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                          skill.toLowerCase().includes(userSkill.toLowerCase())
                        );
                        return (
                          <span
                            key={index}
                            className={`px-3 py-1 text-body-small rounded-full ${
                              hasSkill
                                ? 'bg-success text-white'
                                : 'bg-gray-200 text-text-secondary'
                            }`}
                          >
                            {skill}
                            {hasSkill && ' ✓'}
                          </span>
                        );
                      })}
                      {job.skills.length > 6 && (
                        <span className="px-3 py-1 bg-gray-100 text-text-secondary text-body-small rounded-full">
                          +{job.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Job Stats */}
                  <div className="flex items-center justify-between text-body-small text-text-secondary">
                    <div className="flex items-center space-x-4">
                      <span>📅 Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      <span>👥 {job.applicants} applicants</span>
                      <span>👁️ {job.views} views</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {job.remote && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-body-small rounded-full">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-border-light">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/interview-prep/${job.id}`)}
                    >
                      Interview Prep
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/jobs/${job.id}/apply`)}
                    >
                      Quick Apply
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </StaggeredGrid>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <AnimatedSection animation="slideUp" className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-heading-3 font-semibold text-text-primary mb-2">
              No jobs found
            </h3>
            <p className="text-body text-text-secondary mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
                setSelectedType('all');
                setSelectedExperience('all');
                setSalaryRange([0, 3000000]);
              }}
            >
              Clear All Filters
            </Button>
          </AnimatedSection>
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;

