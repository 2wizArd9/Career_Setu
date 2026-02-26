import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';
import { AnimatedSection, StaggeredGrid } from '../../components/animations';

const MentorsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useAppData();
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');

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
          <p className="text-body text-text-secondary">Failed to load mentor data</p>
        </div>
      </Layout>
    );
  }

  const { mentors } = data;

  // Get unique expertise areas for filtering
  const expertiseAreas = Array.from(
    new Set(mentors.flatMap(mentor => mentor.expertise))
  );

  // Filter and sort mentors
  const filteredMentors = mentors
    .filter(mentor => {
      if (selectedExpertise === 'all') return true;
      return mentor.expertise.includes(selectedExpertise);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'price': {
          const priceA = parseInt(a.sessionFee.replace(/[₹,]/g, ''));
          const priceB = parseInt(b.sessionFee.replace(/[₹,]/g, ''));
          return priceA - priceB;
        }
        default:
          return 0;
      }
    });


  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <h1 className="text-heading-1 font-bold text-text-primary mb-2">
            🤝 MentorsConnect 
          </h1>
          <p className="text-body-large text-text-secondary">
            Connect with industry experts for personalized career guidance
          </p>
        </AnimatedSection>

        {/* Stats Overview */}
        <StaggeredGrid
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          animation="scaleIn"
          delay={100}
        >
          <div className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"> 
            <div className="text-heading-2 font-bold text-primary-blue">{mentors.length}</div>
            <div className="text-body-small text-text-secondary">Expert Mentors</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"> 
            <div className="text-heading-2 font-bold text-success">{expertiseAreas.length}</div>
            <div className="text-body-small text-text-secondary">Expertise Areas</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"> 
            <div className="text-heading-2 font-bold text-purple-600">
              {Math.round(mentors.reduce((sum, mentor) => sum + mentor.rating, 0) / mentors.length * 10) / 10}
            </div>
            <div className="text-body-small text-text-secondary">Average Rating</div>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"> 
            <div className="text-heading-2 font-bold text-warning">24/7</div>
            <div className="text-body-small text-text-secondary">Availability</div>
          </div>
        </StaggeredGrid>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card title="🔍 Filter Mentors">
              <div className="space-y-6">
                {/* Expertise Filter */}
                <div>
                  <label className="block text-body font-medium text-text-primary mb-2">
                    Expertise Area
                  </label>
                  <select
                    value={selectedExpertise}
                    onChange={(e) => setSelectedExpertise(e.target.value)}
                    className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="all">All Expertise</option>
                    {expertiseAreas.map(expertise => (
                      <option key={expertise} value={expertise}>{expertise}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-body font-medium text-text-primary mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="experience">Most Experience</option>
                    <option value="price">Lowest Price</option>
                  </select>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-border-light">
                  <h4 className="text-body font-medium text-text-primary mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => navigate('/careers')}
                    >
                      Explore Careers
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => navigate('/learning')}
                    >
                      Browse Courses
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Mentor Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-2 font-semibold text-text-primary">
                Available Mentors ({filteredMentors.length})
              </h2>
              <div className="text-body-small text-text-secondary">
                Showing {filteredMentors.length} of {mentors.length} mentors
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <Card 
                  key={mentor.id}
                  clickable
                  onClick={() => navigate(`/mentors/${mentor.id}`)}
                  className="hover:shadow-lg transition-all duration-200 h-full"
                >
                  <div className="text-center space-y-4">
                    {/* Avatar */}
                    <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>

                    {/* Basic Info */}
                    <div>
                      <h3 className="text-heading-3 font-semibold text-text-primary mb-1">
                        {mentor.name}
                      </h3>
                      <p className="text-body-small text-text-secondary mb-2">
                        {mentor.title}
                      </p>
                      <p className="text-body-small text-text-secondary mb-3">
                        {mentor.experience} experience
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(mentor.rating))}
                        {mentor.rating % 1 !== 0 && '☆'}
                      </div>
                      <span className="text-body-small font-medium text-text-primary">
                        {mentor.rating}
                      </span>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1 justify-center">
                      {mentor.expertise.slice(0, 2).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-primary-blue text-body-small rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-text-secondary text-body-small rounded-full">
                          +{mentor.expertise.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Session Fee */}
                    <div className="bg-white p-3 rounded-lg border border-amber-200">
                      <div className="text-body-small text-text-secondary">Session Fee</div>
                      <div className="text-body font-bold text-text-primary">
                        {mentor.sessionFee}
                      </div>
                    </div>

                    {/* Availability Indicator */}
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-body-small text-success font-medium">
                        Available Now
                      </span>
                    </div>

                    {/* Action Button */}
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => navigate(`/mentors/${mentor.id}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentorsPage;