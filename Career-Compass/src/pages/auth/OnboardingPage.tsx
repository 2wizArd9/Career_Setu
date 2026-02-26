import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/common';
import logoImage from '../../assets/small_Gemini_Generated_Image_1vj5vl1vj5vl1vj5-removebg-preview.png';

const OnboardingPage: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [projects, setProjects] = useState('');
  const navigate = useNavigate();

  const handleFileUpload = async () => {
    setIsUploading(true);
    
    // Simulate AI analysis with loading animation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsUploading(false);
    setUploadComplete(true);
    
    // Auto-navigate to skills page after brief delay
    setTimeout(() => {
      navigate('/skills');
    }, 1500);
  };

  const handleSkipUpload = () => {
    navigate('/dashboard');
  };

  const handleStartAgentAnalysis = () => {
    navigate('/agents');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#eef2ff_0,transparent_40%),radial-gradient(circle_at_80%_0,#ecfeff_0,transparent_35%),radial-gradient(circle_at_0_100%,#fef3c7_0,transparent_30%)]" />
      <div className="relative w-full max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={logoImage} 
              alt="CareerSetu Logo" 
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">
            Let’s get your profile ready
          </h1>
          <p className="text-body-large text-text-secondary">
            Upload your resume or share links so we can tailor your guidance
          </p>
        </div>

        <Card className="w-full text-left bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg">
          {!isUploading && !uploadComplete && (
            <>
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-heading-2 font-semibold text-text-primary mb-2 text-center">
                  Upload your resume
                </h2>
                <p className="text-body text-text-secondary mb-6 text-center">
                  We’ll extract your skills and experience to personalize your roadmap
                </p>
              </div>

              <div className="space-y-6 text-left">
                {/* Additional Links (optional) */}
                <div className="space-y-4">
                  <h3 className="text-heading-3 font-semibold text-text-primary">Additional Links (optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-body-small font-medium text-text-primary mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        placeholder="https://www.linkedin.com/in/your-handle"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-body-small font-medium text-text-primary mb-1">GitHub URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/your-handle"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-body-small font-medium text-text-primary mb-1">Portfolio/Website</label>
                      <input
                        type="url"
                        placeholder="https://your-portfolio.com"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-body-small font-medium text-text-primary mb-1">Projects (comma-separated URLs)</label>
                      <input
                        type="text"
                        placeholder="https://project1.com, https://project2.com"
                        value={projects}
                        onChange={(e) => setProjects(e.target.value)}
                        className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                  <p className="text-body-small text-text-secondary">We’ll use these links to better understand your work and tailor recommendations.</p>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleFileUpload}
                  className="w-full"
                >
                  Upload Your Resume
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-light" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-text-secondary">or</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleStartAgentAnalysis}
                         className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0"
                >
                  Start Analysis
                </Button>
                
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleSkipUpload}
                  className="w-full"
                >
                  Skip for Now
                </Button>
              </div>

              <p className="text-body-small text-text-secondary mt-4">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </>
          )}

          {isUploading && (
            <div className="py-12">
              <div className="w-16 h-16 mx-auto mb-6">
                <div className="loader-ring"></div>
              </div>
              <h2 className="text-heading-2 font-semibold text-text-primary mb-2">
                Analyzing your resume...
              </h2>
              <p className="text-body text-text-secondary">
                Extracting your skills and experience
              </p>
              <div className="mt-6 bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
                <div className="bg-primary-blue h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
          )}

          {uploadComplete && (
            <div className="py-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-success rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-heading-2 font-semibold text-text-primary mb-2">
                Analysis Complete!
              </h2>
              <p className="text-body text-text-secondary">
                We've identified your skills and experience. Redirecting to your profile...
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OnboardingPage;