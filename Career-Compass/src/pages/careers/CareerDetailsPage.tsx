import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, ProgressBar } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';
import { getSkillGapAnalysis } from '../../utils/dataLoader';
import CareerTrajectoryChart from '../../components/charts/CareerTrajectoryChart';
import SalaryForecastChart from '../../components/charts/SalaryForecastChart';

const CareerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading } = useAppData();

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

  const { user, careers, courses } = data;
  const career = careers.find(c => c.id === id);

  if (!career) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-heading-2 font-semibold text-text-primary mb-4">Career Not Found</h1>
          <Button onClick={() => navigate('/careers')}>Back to Careers</Button>
        </div>
      </Layout>
    );
  }

  const skillGap = getSkillGapAnalysis(user.skills, career.requiredSkills);
  const relevantCourses = courses.filter(course => 
    course.skills.some(skill => 
      skillGap.missing.some(missing => 
        missing.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(missing.toLowerCase())
      )
    )
  ).slice(0, 3);

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/careers')}
            className="text-primary-blue hover:underline text-body"
          >
            ← Back to Career Paths
          </button>
        </div>

        {/* Career Header */}
        <div className="mb-8">
          <h1 className="text-heading-1 font-bold text-text-primary mb-4">
            {career.title}
          </h1>
          <p className="text-body-large text-text-secondary mb-6">
            {career.description}
          </p>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-body-small text-text-secondary">10-Year Growth</div>
              <div className="text-heading-2 font-bold text-success">{career.growthRate}</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-body-small text-text-secondary">Median Salary</div>
              <div className="text-heading-2 font-bold text-primary-blue">{career.medianSalary}</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-body-small text-text-secondary">Skill Match</div>
              <div className="text-heading-2 font-bold text-purple-600">{skillGap.percentage}%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skill Gap Analysis */}
            <Card title="🎯 Your Skill Gap Analysis">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-body font-semibold text-text-primary mb-2">
                    Overall Match: {skillGap.matchCount} of {skillGap.totalRequired} skills
                  </h4>
                  <ProgressBar 
                    current={skillGap.matchCount} 
                    total={skillGap.totalRequired}
                    label="Skill Compatibility"
                    className="mb-2"
                  />
                  <p className="text-body-small text-text-secondary">
                    You have {skillGap.percentage}% of the required skills for this role
                  </p>
                </div>

                {/* Skills You Have */}
                {skillGap.matched.length > 0 && (
                  <div>
                    <h4 className="text-body font-semibold text-text-primary mb-3">
                      ✅ Skills You Already Have ({skillGap.matched.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGap.matched.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-success text-white text-body-small rounded-lg font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills to Develop */}
                {skillGap.missing.length > 0 && (
                  <div>
                    <h4 className="text-body font-semibold text-text-primary mb-3">
                      📚 Skills to Develop ({skillGap.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGap.missing.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-orange-100 text-warning text-body-small rounded-lg font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Recommended Learning Path */}
            {relevantCourses.length > 0 && (
              <Card title="📖 Recommended Learning Path">
                <div className="space-y-4">
                  <p className="text-body text-text-secondary mb-4">
                    Based on your skill gaps, here are courses that can help you prepare for this role:
                  </p>
                  
                  {relevantCourses.map((course, index) => (
                    <div key={course.id} className="border border-border-light rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="w-6 h-6 bg-primary-blue text-white text-body-small rounded-full flex items-center justify-center font-semibold">
                              {index + 1}
                            </span>
                            <h5 className="text-body font-semibold text-text-primary">
                              {course.title}
                            </h5>
                          </div>
                          <p className="text-body-small text-text-secondary mb-2">
                            {course.provider} • {course.duration} • {course.difficulty}
                          </p>
                          <div className="flex items-center space-x-4 mb-2">
                            <div className="flex items-center space-x-1">
                              <div className="flex text-yellow-400">
                                {'★'.repeat(Math.floor(course.rating))}
                              </div>
                              <span className="text-body-small text-text-secondary">
                                {course.rating}
                              </span>
                            </div>
                            <span className="text-body-small text-text-secondary">
                              {course.enrolled} enrolled
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {course.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-blue-100 text-primary-blue text-body-small rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(course.url, '_blank')}
                          className="ml-4"
                        >
                          Start Course
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Button 
                      variant="primary"
                      onClick={() => navigate('/learning')}
                    >
                      View All Courses
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Career Trajectory Visualization */}
            <Card title="🎯 Career Progression Path">
              <div className="space-y-6">
                <p className="text-body text-text-secondary">
                  Here's your potential career journey in {career.title}, showing progression from entry-level to senior positions:
                </p>
                <CareerTrajectoryChart trajectory={career.trajectory} />
              </div>
            </Card>

            {/* Salary Forecast */}
            <SalaryForecastChart trajectory={career.trajectory} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card title="🚀 Quick Actions">
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => navigate('/mentors')}
                >
                  Find a Mentor
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/learning')}
                >
                  Browse Courses
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/resume')}
                >
                  Update Resume
                </Button>
              </div>
            </Card>

            {/* Career Requirements */}
            <Card title="📋 All Required Skills">
              <div className="space-y-2">
                {career.requiredSkills.map((skill, index) => {
                  const hasSkill = user.skills.some(userSkill => 
                    userSkill.toLowerCase().includes(skill.toLowerCase()) || 
                    skill.toLowerCase().includes(userSkill.toLowerCase())
                  );
                  
                  return (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-body text-text-primary">{skill}</span>
                      <span className={`text-body-small ${hasSkill ? 'text-success' : 'text-text-secondary'}`}>
                        {hasSkill ? '✓' : '○'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Career Stats */}
            <Card title="📊 Career Insights">
              <div className="space-y-4">
                <div>
                  <div className="text-body-small text-text-secondary">Job Market Demand</div>
                  <div className="text-body font-semibold text-text-primary">High</div>
                </div>
                <div>
                  <div className="text-body-small text-text-secondary">Remote Work Options</div>
                  <div className="text-body font-semibold text-text-primary">Excellent</div>
                </div>
                <div>
                  <div className="text-body-small text-text-secondary">Career Flexibility</div>
                  <div className="text-body font-semibold text-text-primary">High</div>
                </div>
                <div>
                  <div className="text-body-small text-text-secondary">Learning Curve</div>
                  <div className="text-body font-semibold text-text-primary">Moderate</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareerDetailsPage;