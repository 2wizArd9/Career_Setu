import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';

const SkillsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useAppData();

  const handleContinue = () => {
    navigate('/dashboard');
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  const { user } = data;

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-heading-1 font-bold text-text-primary mb-4">
            Your Skills Profile
          </h1>
          <p className="text-body-large text-text-secondary">
            Based on your resume analysis, we've identified these skills and experience levels
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card title="Current Skills">
            <div className="space-y-4">
              {user.skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-body font-medium text-text-primary">{skill}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-blue h-2 rounded-full"
                        style={{ width: `${(user.skillLevels[skill] || 5) * 10}%` }}
                      />
                    </div>
                    <span className="text-body-small text-text-secondary w-8">
                      {user.skillLevels[skill] || 5}/10
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Profile Summary">
            <div className="space-y-4">
              <div>
                <h4 className="text-body font-semibold text-text-primary mb-1">Current Role</h4>
                <p className="text-body text-text-secondary">{user.currentRole}</p>
              </div>
              <div>
                <h4 className="text-body font-semibold text-text-primary mb-1">Experience</h4>
                <p className="text-body text-text-secondary">{user.experience}</p>
              </div>
              <div>
                <h4 className="text-body font-semibold text-text-primary mb-1">Skills Count</h4>
                <p className="text-body text-text-secondary">{user.skills.length} identified skills</p>
              </div>
              <div>
                <h4 className="text-body font-semibold text-text-primary mb-1">Strongest Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(user.skillLevels)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 3)
                    .map(([skill]) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary-blue text-white text-body-small rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            className="px-8"
          >
            Continue to Dashboard
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-body-small text-text-secondary">
            Don't worry, you can always update your skills later in your profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;