import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../common';

const AgentDemoCard: React.FC = () => {
  const navigate = useNavigate();

  const handleStartDemo = () => {
    navigate('/agents');
  };

  return (
    <Card className="p-6 bg-gray-50 border border-gray-200">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">🔍</div>
        <h3 className="text-heading-3 font-bold text-text-primary mb-2">
          Skills & Career Analysis
        </h3>
        <p className="text-body text-text-secondary">
          See how we analyze your profile and suggest next steps
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
            👩‍💼
          </div>
          <div>
            <div className="text-body-small font-medium text-text-primary">Lead Counselor</div>
            <div className="text-body-small text-text-secondary">Dr. Sarah Sharma</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
            🤖
          </div>
          <div>
            <div className="text-body-small font-medium text-text-primary">Skill Analyst</div>
            <div className="text-body-small text-text-secondary">Ankush Gupta</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm">
            📊
          </div>
          <div>
            <div className="text-body-small font-medium text-text-primary">Market Forecaster</div>
            <div className="text-body-small text-text-secondary">Maya Patel</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
            🎓
          </div>
          <div>
            <div className="text-body-small font-medium text-text-primary">Learning Coach</div>
            <div className="text-body-small text-text-secondary">Praveen Gupta</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleStartDemo}
          variant="primary"
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Start Analysis
        </Button>
        <p className="text-body-small text-text-secondary text-center">
          Get a quick overview and recommendations
        </p>
      </div>
    </Card>
  );
};

export default AgentDemoCard;

