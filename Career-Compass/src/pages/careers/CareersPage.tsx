import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';
import { getSkillGapAnalysis } from '../../utils/dataLoader';
import { AnimatedSection, StaggeredGrid } from '../../components/animations';

const CareersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrowth, setSelectedGrowth] = useState('all');
  const [selectedSalary, setSelectedSalary] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [savedCareers, setSavedCareers] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

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
          <p className="text-body text-text-secondary">Failed to load career data</p>
        </div>
      </Layout>
    );
  }

  const { user, careers } = data;

  // Filter and sort careers
  const filteredCareers = careers
    .filter(career => {
      const searchMatch = searchTerm === '' || 
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const growthMatch = selectedGrowth === 'all' || 
        (selectedGrowth === 'high' && parseInt(career.growthRate) > 20) ||
        (selectedGrowth === 'medium' && parseInt(career.growthRate) >= 10 && parseInt(career.growthRate) <= 20) ||
        (selectedGrowth === 'low' && parseInt(career.growthRate) < 10);
      
      const salaryMatch = selectedSalary === 'all' || 
        (selectedSalary === 'high' && parseInt(career.medianSalary.replace(/[₹,]/g, '')) > 1500000) ||
        (selectedSalary === 'medium' && parseInt(career.medianSalary.replace(/[₹,]/g, '')) >= 800000 && parseInt(career.medianSalary.replace(/[₹,]/g, '')) <= 1500000) ||
        (selectedSalary === 'low' && parseInt(career.medianSalary.replace(/[₹,]/g, '')) < 800000);
      
      return searchMatch && growthMatch && salaryMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'match') {
        const matchA = getSkillGapAnalysis(user.skills, a.requiredSkills).percentage;
        const matchB = getSkillGapAnalysis(user.skills, b.requiredSkills).percentage;
        return matchB - matchA;
      } else if (sortBy === 'growth') {
        return parseInt(b.growthRate) - parseInt(a.growthRate);
      } else if (sortBy === 'salary') {
        return parseInt(b.medianSalary.replace(/[₹,]/g, '')) - parseInt(a.medianSalary.replace(/[₹,]/g, ''));
      }
      return 0;
    });

  const toggleSavedCareer = (careerId: string) => {
    const newSaved = new Set(savedCareers);
    if (newSaved.has(careerId)) {
      newSaved.delete(careerId);
    } else {
      newSaved.add(careerId);
    }
    setSavedCareers(newSaved);
  };

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <h1 className="text-heading-1 font-bold text-text-primary mb-2">
            🚀 Explore Career Paths
          </h1>
          <p className="text-body-large text-text-secondary">
            Discover career opportunities tailored to your skills and interests
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
                    placeholder="Search careers, skills, or industries..."
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
                      Growth Rate
                    </label>
                    <select
                      value={selectedGrowth}
                      onChange={(e) => setSelectedGrowth(e.target.value)}
                      className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <option value="all">All Growth Rates</option>
                      <option value="high">High (20%+)</option>
                      <option value="medium">Medium (10-20%)</option>
                      <option value="low">Low (&lt;10%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-body-small font-medium text-text-primary mb-2">
                      Salary Range
                    </label>
                    <select
                      value={selectedSalary}
                      onChange={(e) => setSelectedSalary(e.target.value)}
                      className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <option value="all">All Salaries</option>
                      <option value="high">High (₹15L+)</option>
                      <option value="medium">Medium (₹8-15L)</option>
                      <option value="low">Low (&lt;₹8L)</option>
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
                      <option value="match">Skill Match</option>
                      <option value="growth">Growth Rate</option>
                      <option value="salary">Salary</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedGrowth('all');
                        setSelectedSalary('all');
                        setSortBy('match');
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
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
              {filteredCareers.length} Career Paths Found
            </h2>
            <div className="text-body-small text-text-secondary">
              Based on your skills and preferences
            </div>
          </div>
        </AnimatedSection>

        {/* Career Path Cards Grid */}
        <StaggeredGrid
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          animation="slideUp"
          delay={200}
        >
          {filteredCareers.map((career) => {
            const skillGap = getSkillGapAnalysis(user.skills, career.requiredSkills);
            const isSaved = savedCareers.has(career.id);
            
            return (
              <Card 
                key={career.id}
                className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-full"
              >
                <div className="space-y-6">
                  {/* Career Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-heading-3 font-semibold text-text-primary mb-2">
                        {career.title}
                      </h3>
                      <p className="text-body text-text-secondary line-clamp-2">
                        {career.description}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSavedCareer(career.id);
                      }}
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

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-body-small text-text-secondary">Growth Rate</div>
                      <div className="text-heading-3 font-bold text-success">{career.growthRate}</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-body-small text-text-secondary">Median Salary</div>
                      <div className="text-heading-3 font-bold text-primary-blue">{career.medianSalary}</div>
                    </div>
                  </div>

                  {/* Skill Match */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-body font-medium text-text-primary">Skill Match</span>
                      <span className="text-body-small text-text-secondary">
                        {skillGap.matchCount}/{skillGap.totalRequired} skills
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-primary-blue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skillGap.percentage}%` }}
                      />
                    </div>
                    <div className="text-body-small text-text-secondary">
                      {skillGap.percentage}% match with your current skills
                    </div>
                  </div>

                  {/* Top Required Skills */}
                  <div>
                    <div className="text-body-small text-text-secondary mb-2">Key Skills Required:</div>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.slice(0, 4).map((skill, index) => {
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
                          </span>
                        );
                      })}
                      {career.requiredSkills.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-text-secondary text-body-small rounded-full">
                          +{career.requiredSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-border-light">
                    <Button 
                      variant="primary" 
                      onClick={() => navigate(`/careers/${career.id}`)}
                      className="flex-1"
                    >
                      Explore Career Path
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/jobs')}
                    >
                      Find Jobs
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </StaggeredGrid>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <AnimatedSection animation="slideUp" className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-heading-3 font-semibold text-text-primary mb-2">
              No careers found
            </h3>
            <p className="text-body text-text-secondary mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedGrowth('all');
                setSelectedSalary('all');
                setSortBy('match');
              }}
            >
              Clear All Filters
            </Button>
          </AnimatedSection>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-heading-2 font-semibold text-text-primary mb-4">
            Need Personalized Guidance?
          </h2>
          <p className="text-body text-text-secondary mb-6">
            Connect with industry mentors to get expert advice on your career path
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/mentors')}
          >
            Find a Mentor
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CareersPage;