import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';
import { AnimatedSection, StaggeredGrid } from '../../components/animations';

const LearningPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useAppData();
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [completedCourses, setCompletedCourses] = useState<Set<string>>(new Set());
  const [savedCourses, setSavedCourses] = useState<Set<string>>(new Set());
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
          <p className="text-body text-text-secondary">Failed to load learning data</p>
        </div>
      </Layout>
    );
  }

  const { user, courses } = data;
  
  // Filter courses based on selected filters
  const filteredCourses = courses.filter(course => {
    const providerMatch = selectedProvider === 'all' || course.provider === selectedProvider;
    const difficultyMatch = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    return providerMatch && difficultyMatch;
  });

  // Get unique providers and difficulties for filters
  const providers = Array.from(new Set(courses.map(course => course.provider)));
  const difficulties = Array.from(new Set(courses.map(course => course.difficulty)));

  const toggleCourseCompletion = (courseId: string) => {
    const newCompleted = new Set(completedCourses);
    if (newCompleted.has(courseId)) {
      newCompleted.delete(courseId);
    } else {
      newCompleted.add(courseId);
    }
    setCompletedCourses(newCompleted);
  };

  const toggleSavedCourse = (courseId: string) => {
    const newSaved = new Set(savedCourses);
    if (newSaved.has(courseId)) {
      newSaved.delete(courseId);
    } else {
      newSaved.add(courseId);
    }
    setSavedCourses(newSaved);
  };

  const getSkillRelevance = (courseSkills: string[]) => {
    const matchedSkills = courseSkills.filter(skill => 
      user.skills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    return {
      matched: matchedSkills.length,
      total: courseSkills.length,
      percentage: Math.round((matchedSkills.length / courseSkills.length) * 100)
    };
  };

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <h1 className="text-heading-1 font-bold text-text-primary mb-2">
            📚 Personalized Learning Path
          </h1>
          <p className="text-body-large text-text-secondary">
            Courses tailored to your skills and career goals
          </p>
        </AnimatedSection>

        {/* Progress Overview */}
        <StaggeredGrid
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          animation="scaleIn"
          delay={100}
        >
          <div className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-heading-2 font-bold text-primary-blue">{completedCourses.size}</div>
            <div className="text-body-small text-text-secondary">Courses Completed</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-heading-2 font-bold text-success">{courses.length - completedCourses.size}</div>
            <div className="text-body-small text-text-secondary">Courses Available</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-heading-2 font-bold text-purple-600">{user.skills.length}</div>
            <div className="text-body-small text-text-secondary">Current Skills</div>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-heading-2 font-bold text-warning">
              {Math.round((completedCourses.size / courses.length) * 100)}%
            </div>
            <div className="text-body-small text-text-secondary">Learning Progress</div>
          </div>
        </StaggeredGrid>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card title="🔍 Filter Courses">
              <div className="space-y-6">
                {/* Provider Filter */}
                <div>
                  <label className="block text-body font-medium text-text-primary mb-2">
                    Provider
                  </label>
                  <select
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value)}
                    className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="all">All Providers</option>
                    {providers.map(provider => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-body font-medium text-text-primary mb-2">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="all">All Levels</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
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
                      onClick={() => navigate('/mentors')}
                    >
                      Find Mentors
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Course List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-2 font-semibold text-text-primary">
                Recommended Courses ({filteredCourses.length})
              </h2>
              <div className="text-body-small text-text-secondary">
                Showing {filteredCourses.length} of {courses.length} courses
              </div>
            </div>

            <div className="space-y-6">
              {filteredCourses.map((course) => {
                const isCompleted = completedCourses.has(course.id);
                const skillRelevance = getSkillRelevance(course.skills);
                
                return (
                  <Card 
                    key={course.id}
                    className={`transition-all duration-200 ${
                      isCompleted ? 'bg-green-50 border-success' : 'hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Completion Checkbox */}
                      <div className="flex-shrink-0 pt-1">
                        <button
                          onClick={() => toggleCourseCompletion(course.id)}
                          className={`
                            w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                            ${isCompleted 
                              ? 'bg-success border-success text-white' 
                              : 'border-border-light hover:border-primary-blue'
                            }
                          `}
                        >
                          {isCompleted && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Course Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className={`text-heading-3 font-semibold mb-2 ${
                              isCompleted ? 'text-success line-through' : 'text-text-primary'
                            }`}>
                              {course.title}
                            </h3>
                            <div className="flex items-center space-x-4 mb-2">
                              <span className="text-body-small text-text-secondary">
                                {course.provider}
                              </span>
                              <span className="text-body-small text-text-secondary">
                                {course.duration}
                              </span>
                              <span className={`
                                px-2 py-1 text-body-small rounded-full
                                ${course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                  course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'}
                              `}>
                                {course.difficulty}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center space-x-1">
                                <div className="flex text-yellow-400">
                                  {'★'.repeat(Math.floor(course.rating))}
                                </div>
                                <span className="text-body-small text-text-secondary">
                                  {course.rating} ({course.enrolled})
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-body-small text-text-secondary">
                                  Skill Match:
                                </span>
                                <span className={`text-body-small font-medium ${
                                  skillRelevance.percentage > 50 ? 'text-success' : 'text-warning'
                                }`}>
                                  {skillRelevance.percentage}%
                                </span>
                              </div>
                            </div>
                          </div>

                          <Button
                            variant={isCompleted ? "secondary" : "primary"}
                            onClick={() => window.open(course.url, '_blank')}
                            disabled={isCompleted}
                          >
                            {isCompleted ? 'Completed' : 'Start Learning'}
                          </Button>
                        </div>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2">
                          {course.skills.map((skill, index) => {
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
                                    : 'bg-blue-100 text-primary-blue'
                                }`}
                              >
                                {skill}
                                {hasSkill && ' ✓'}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-heading-3 font-semibold text-text-primary mb-2">
                  No courses found
                </h3>
                <p className="text-body text-text-secondary">
                  Try adjusting your filters to see more courses
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearningPage;