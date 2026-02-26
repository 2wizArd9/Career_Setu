import React from 'react';
import { useAppData } from '../../hooks/useAppData';
import { Card, Button, ProgressBar } from '../../components/common';

const ProfilePage: React.FC = () => {
  const { data } = useAppData();

  if (!data?.user) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-1 font-bold text-text-primary mb-4">
            Please log in to view your profile
          </h1>
        </div>
      </div>
    );
  }

  const { user } = data;

  return (
    <div className="min-h-screen bg-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-heading-1 font-bold text-text-primary mb-2">
            My Profile
          </h1>
          <p className="text-body text-text-secondary">
            Manage your account settings and view your career progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information Card */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-heading-2 font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-heading-2 font-semibold text-text-primary mb-1">
                  {user.name}
                </h2>
                <p className="text-body text-text-secondary mb-2">
                  {user.currentRole}
                </p>
                <p className="text-body-small text-text-secondary">
                  {user.experience} experience
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-body-small font-medium text-text-secondary mb-1">
                    Email
                  </label>
                  <p className="text-body text-text-primary">{user.email}</p>
                </div>
                
                <div>
                  <label className="block text-body-small font-medium text-text-secondary mb-1">
                    Current Role
                  </label>
                  <p className="text-body text-text-primary">{user.currentRole}</p>
                </div>

                <div>
                  <label className="block text-body-small font-medium text-text-secondary mb-1">
                    Experience
                  </label>
                  <p className="text-body text-text-primary">{user.experience}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border-light">
                <Button variant="outline" size="md" className="w-full">
                  Edit Profile
                </Button>
              </div>
            </Card>
          </div>

          {/* Skills and Progress Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-heading-3 font-semibold text-text-primary mb-6">
                Skills & Progress
              </h3>
              
              <div className="space-y-6">
                {Object.entries(user.skillLevels).map(([skill, level]) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-body font-medium text-text-primary">
                        {skill}
                      </span>
                      <span className="text-body-small text-text-secondary">
                        {level}/10
                      </span>
                    </div>
                    <ProgressBar 
                      current={level} 
                      total={10} 
                      label={skill}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border-light">
                <h4 className="text-heading-4 font-semibold text-text-primary mb-4">
                  Quick Actions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" size="md" className="w-full">
                    Update Skills
                  </Button>
                  <Button variant="outline" size="md" className="w-full">
                    Download Resume
                  </Button>
                  <Button variant="outline" size="md" className="w-full">
                    View Career Path
                  </Button>
                  <Button variant="outline" size="md" className="w-full">
                    Book Mentor Session
                  </Button>
                </div>
              </div>
            </Card>

            {/* Career Goals Card */}
            <Card className="p-6 mt-6">
              <h3 className="text-heading-3 font-semibold text-text-primary mb-4">
                Career Goals
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                  <span className="text-body text-text-primary">
                    Advance to Senior Data Analyst within 2 years
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                  <span className="text-body text-text-primary">
                    Master Machine Learning and AI technologies
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                  <span className="text-body text-text-primary">
                    Lead data-driven projects and mentor junior analysts
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="primary" size="md" className="w-full">
                  Set New Goals
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
