import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';
import { AnimatedSection, StaggeredGrid } from '../../components/animations';
import AgentDemoCard from '../../components/agents/AgentDemoCard';

const DashboardPage: React.FC = () => {
  console.log('DashboardPage is rendering');
  const navigate = useNavigate();
  const { data, loading } = useAppData();

  console.log('Dashboard data:', { data, loading });

  if (loading) {
    console.log('Dashboard is loading...');
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    console.log('Dashboard data is null');
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-body text-text-secondary">Failed to load data</p>
        </div>
      </Layout>
    );
  }

  const { user, careers, courses, mentors } = data;
  const topCareer = careers[0]; // Data Scientist as top recommendation
  const nextCourse = courses[0]; // Python for Data Science
  const recommendedMentors = mentors.slice(0, 3); // First 3 mentors
  const [tasks, setTasks] = useState([
    { id: 't1', label: 'Complete profile basics', done: true },
    { id: 't2', label: 'Upload resume', done: false },
    { id: 't3', label: 'Pick a target role', done: false },
    { id: 't4', label: 'Enroll in next course', done: false },
  ]);
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header with quick actions */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h1 className="text-heading-1 font-bold text-text-primary mb-2">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-body-large text-text-secondary">
                Here’s your personalized career hub
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/careers')}>Browse Careers</Button>
              <Button variant="primary" onClick={() => navigate('/agents')}>Run Analysis</Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Quick Stats */}
        <StaggeredGrid 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          animation="scaleIn"
          delay={150}
        >
                <div className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-heading-2 font-bold text-primary-blue">{user.skills.length}</div>
            <div className="text-body-small text-text-secondary">Skills Identified</div>
          </div>
                <div className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-heading-2 font-bold text-success">4</div>
            <div className="text-body-small text-text-secondary">Career Paths</div>
          </div>
                <div className="bg-purple-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-heading-2 font-bold text-purple-600">{courses.length}</div>
            <div className="text-body-small text-text-secondary">Recommended Courses</div>
          </div>
                <div className="bg-orange-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="text-heading-2 font-bold text-warning">{mentors.length}</div>
            <div className="text-body-small text-text-secondary">Available Mentors</div>
          </div>
        </StaggeredGrid>

        {/* AI Agent Demo Section */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <AgentDemoCard />
        </AnimatedSection>

        {/* Main Content Grid */}
        <StaggeredGrid 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          animation="slideUp"
          delay={200}
        >
          {/* Career Recommendation - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card
              title={<div className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>Top Career Recommendation</div>}
              clickable
              onClick={() => navigate(`/careers/${topCareer.id}`)}
              className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-heading-3 font-semibold text-text-primary mb-2">
                    {topCareer.title}
                  </h3>
                  <p className="text-body text-text-secondary mb-4">
                    {topCareer.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-amber-200">
                    <div className="text-body-small text-text-secondary">10-Year Growth</div>
                    <div className="text-heading-3 font-bold text-success">{topCareer.growthRate}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-amber-200">
                    <div className="text-body-small text-text-secondary">Median Salary</div>
                    <div className="text-heading-3 font-bold text-text-primary">{topCareer.medianSalary}</div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={() => navigate(`/careers/${topCareer.id}`)}
                  className="w-full"
                >
                  Explore Career Path
                </Button>
              </div>
            </Card>
          </div>

          {/* Learning Progress */}
          <div>
            <Card title="📚 Next Learning Step">
              <div className="space-y-4">
                <div>
                  <h4 className="text-body font-semibold text-text-primary mb-1">
                    {nextCourse.title}
                  </h4>
                  <p className="text-body-small text-text-secondary mb-2">
                    {nextCourse.provider} • {nextCourse.duration}
                  </p>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(nextCourse.rating))}
                    </div>
                    <span className="text-body-small text-text-secondary">
                      {nextCourse.rating} ({nextCourse.enrolled})
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-body-small text-text-secondary">Skills you'll gain:</div>
                  <div className="flex flex-wrap gap-2">
                    {nextCourse.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-primary-blue text-body-small rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => navigate('/learning')}
                  className="w-full"
                >
                  View All Courses
                </Button>
              </div>
            </Card>
          </div>
        </StaggeredGrid>

        {/* Productivity Row: Tasks & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <Card title={<div className="flex items-center gap-2"><svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>My Tasks</div>} className="lg:col-span-2">
            <div className="space-y-3">
              {tasks.map(t => (
                <label key={t.id} className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer border border-amber-200">
                  <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} className="mt-1" />
                  <span className={`text-body ${t.done ? 'line-through text-text-secondary' : 'text-text-primary'}`}>{t.label}</span>
                </label>
              ))}
            </div>
          </Card>
          <Card title={<div className="flex items-center gap-2"><svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Recent Activity</div>}>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-gray-200">Viewed <strong>{topCareer.title}</strong> career path</div>
              <div className="p-3 rounded-lg border border-gray-200">Saved course <strong>{nextCourse.title}</strong></div>
              <div className="p-3 rounded-lg border border-gray-200">Checked mentor <strong>{recommendedMentors[0].name}</strong></div>
            </div>
          </Card>
        </div>

        {/* Mentor Recommendations */}
        <div className="mt-8">
          <AnimatedSection animation="slideUp" className="flex items-center justify-between mb-6">
            <h2 className="text-heading-2 font-semibold text-text-primary">
              🤝 Recommended Mentors
            </h2>
            <Button
              variant="outline"
              onClick={() => navigate('/mentors')}
            >
              View All Mentors
            </Button>
          </AnimatedSection>

          <StaggeredGrid 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            animation="slideUp"
            delay={150}
          >
            {recommendedMentors.map((mentor) => (
              <Card
                key={mentor.id}
                clickable
                onClick={() => navigate(`/mentors/${mentor.id}`)}
                className="hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white text-body font-semibold">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-text-primary mb-1">
                      {mentor.name}
                    </h4>
                    <p className="text-body-small text-text-secondary mb-2">
                      {mentor.title}
                    </p>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(mentor.rating))}
                      </div>
                      <span className="text-body-small text-text-secondary">
                        {mentor.rating}
                      </span>
                    </div>
                    <p className="text-body-small font-medium text-text-primary">
                      {mentor.sessionFee}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </StaggeredGrid>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;