import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/common';
import { AnimatedSection, StaggeredGrid } from '../../components/animations';
import logoImage from '../../assets/small_Gemini_Generated_Image_1vj5vl1vj5vl1vj5-removebg-preview.png';

const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Professional Information
    currentCompany: '',
    jobTitle: '',
    industry: '',
    workExperience: '',
    education: '',
    certifications: [] as string[],
    
    // Skills and Interests
    technicalSkills: [] as string[],
    softSkills: [] as string[],
    interests: [] as string[],
    languages: [] as string[],
    
    // Career Goals
    careerGoals: [] as string[],
    targetRoles: [] as string[],
    salaryExpectation: '',
    preferredLocation: '',
    workArrangement: [] as string[],
    
    // Additional Information
    linkedin: '',
    github: '',
    portfolio: '',
    projects: [] as string[],
    achievements: [] as string[],
    volunteerWork: [] as string[],
    
    // Preferences
    learningStyle: '',
    communicationPreference: '',
    mentorshipInterest: false,
    networkingInterest: false,
    jobAlerts: true,
    newsletter: true
  });

  const totalSteps = 5;

  const handleInputChange = (field: string, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const technicalSkillsOptions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
    'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Project Management',
    'Agile', 'DevOps', 'Cybersecurity', 'Cloud Computing'
  ];

  const softSkillsOptions = [
    'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Time Management',
    'Adaptability', 'Creativity', 'Critical Thinking', 'Emotional Intelligence',
    'Negotiation', 'Public Speaking', 'Mentoring', 'Conflict Resolution'
  ];

  const industryOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail',
    'Consulting', 'Government', 'Non-profit', 'Media', 'Real Estate', 'Transportation'
  ];

  const careerGoalOptions = [
    'Get promoted', 'Change careers', 'Start a business', 'Become a manager',
    'Work remotely', 'Increase salary', 'Learn new skills', 'Find work-life balance',
    'Become an expert', 'Mentor others', 'Travel for work', 'Work internationally'
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-heading-2 font-semibold text-text-primary mb-2">Professional Background</h2>
        <p className="text-body text-text-secondary">Tell us about your current work situation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-body font-medium text-text-primary mb-2">Current Company</label>
          <input
            type="text"
            value={formData.currentCompany}
            onChange={(e) => handleInputChange('currentCompany', e.target.value)}
            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
            placeholder="e.g., Google, Microsoft, Startup Inc."
          />
        </div>

        <div>
          <label className="block text-body font-medium text-text-primary mb-2">Job Title</label>
          <input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
            placeholder="e.g., Software Engineer, Marketing Manager"
          />
        </div>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Industry</label>
        <select
          value={formData.industry}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
        >
          <option value="">Select Industry</option>
          {industryOptions.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Work Experience</label>
        <select
          value={formData.workExperience}
          onChange={(e) => handleInputChange('workExperience', e.target.value)}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
        >
          <option value="">Select Experience Level</option>
          <option value="0-1">0-1 years (Entry Level)</option>
          <option value="1-3">1-3 years (Junior)</option>
          <option value="3-5">3-5 years (Mid Level)</option>
          <option value="5-10">5-10 years (Senior)</option>
          <option value="10+">10+ years (Expert)</option>
        </select>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Education</label>
        <input
          type="text"
          value={formData.education}
          onChange={(e) => handleInputChange('education', e.target.value)}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
          placeholder="e.g., Bachelor's in Computer Science, MBA"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-heading-2 font-semibold text-text-primary mb-2">Skills & Expertise</h2>
        <p className="text-body text-text-secondary">What are your key skills and areas of expertise?</p>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Technical Skills</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {technicalSkillsOptions.map((skill) => (
            <label key={skill} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.technicalSkills.includes(skill)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('technicalSkills', [...formData.technicalSkills, skill]);
                  } else {
                    handleInputChange('technicalSkills', formData.technicalSkills.filter(s => s !== skill));
                  }
                }}
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
              />
              <span className="text-body-small text-text-primary">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Soft Skills</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {softSkillsOptions.map((skill) => (
            <label key={skill} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.softSkills.includes(skill)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('softSkills', [...formData.softSkills, skill]);
                  } else {
                    handleInputChange('softSkills', formData.softSkills.filter(s => s !== skill));
                  }
                }}
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
              />
              <span className="text-body-small text-text-primary">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Languages</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Hindi', 'Arabic'].map((language) => (
            <label key={language} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.languages.includes(language)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('languages', [...formData.languages, language]);
                  } else {
                    handleInputChange('languages', formData.languages.filter(l => l !== language));
                  }
                }}
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
              />
              <span className="text-body-small text-text-primary">{language}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-heading-2 font-semibold text-text-primary mb-2">Career Goals</h2>
        <p className="text-body text-text-secondary">What are your career aspirations?</p>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Career Goals</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {careerGoalOptions.map((goal) => (
            <label key={goal} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.careerGoals.includes(goal)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('careerGoals', [...formData.careerGoals, goal]);
                  } else {
                    handleInputChange('careerGoals', formData.careerGoals.filter(g => g !== goal));
                  }
                }}
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
              />
              <span className="text-body-small text-text-primary">{goal}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-body font-medium text-text-primary mb-2">Salary Expectation</label>
          <select
            value={formData.salaryExpectation}
            onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
          >
            <option value="">Select Range</option>
            <option value="0-30k">$0 - $30k</option>
            <option value="30k-50k">$30k - $50k</option>
            <option value="50k-75k">$50k - $75k</option>
            <option value="75k-100k">$75k - $100k</option>
            <option value="100k-150k">$100k - $150k</option>
            <option value="150k+">$150k+</option>
          </select>
        </div>

        <div>
          <label className="block text-body font-medium text-text-primary mb-2">Preferred Location</label>
          <input
            type="text"
            value={formData.preferredLocation}
            onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
            placeholder="e.g., San Francisco, Remote, New York"
          />
        </div>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Work Arrangement</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {['Remote', 'Hybrid', 'On-site', 'Flexible', 'Part-time', 'Contract'].map((arrangement) => (
            <label key={arrangement} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.workArrangement.includes(arrangement)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('workArrangement', [...formData.workArrangement, arrangement]);
                  } else {
                    handleInputChange('workArrangement', formData.workArrangement.filter(a => a !== arrangement));
                  }
                }}
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
              />
              <span className="text-body-small text-text-primary">{arrangement}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-heading-2 font-semibold text-text-primary mb-2">Online Presence</h2>
        <p className="text-body text-text-secondary">Share your professional profiles and projects</p>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">LinkedIn Profile</label>
        <input
          type="url"
          value={formData.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">GitHub Profile</label>
        <input
          type="url"
          value={formData.github}
          onChange={(e) => handleInputChange('github', e.target.value)}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
          placeholder="https://github.com/yourusername"
        />
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Portfolio Website</label>
        <input
          type="url"
          value={formData.portfolio}
          onChange={(e) => handleInputChange('portfolio', e.target.value)}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
          placeholder="https://yourportfolio.com"
        />
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Key Projects</label>
        <textarea
          value={formData.projects.join('\n')}
          onChange={(e) => handleInputChange('projects', e.target.value.split('\n').filter(p => p.trim()))}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 h-24"
          placeholder="List your key projects, one per line"
        />
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Achievements</label>
        <textarea
          value={formData.achievements.join('\n')}
          onChange={(e) => handleInputChange('achievements', e.target.value.split('\n').filter(a => a.trim()))}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 h-24"
          placeholder="List your achievements, one per line"
        />
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-heading-2 font-semibold text-text-primary mb-2">Preferences</h2>
        <p className="text-body text-text-secondary">How would you like to use CareerSetu?</p>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Learning Style</label>
        <select
          value={formData.learningStyle}
          onChange={(e) => handleInputChange('learningStyle', e.target.value)}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
        >
          <option value="">Select Learning Style</option>
          <option value="visual">Visual (Videos, Infographics)</option>
          <option value="auditory">Auditory (Podcasts, Webinars)</option>
          <option value="kinesthetic">Hands-on (Projects, Practice)</option>
          <option value="reading">Reading (Articles, Books)</option>
        </select>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Communication Preference</label>
        <select
          value={formData.communicationPreference}
          onChange={(e) => handleInputChange('communicationPreference', e.target.value)}
          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200"
        >
          <option value="">Select Preference</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="video">Video Call</option>
          <option value="in-person">In-Person</option>
        </select>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.mentorshipInterest}
            onChange={(e) => handleInputChange('mentorshipInterest', e.target.checked)}
            className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
          />
          <span className="text-body text-text-primary">I'm interested in mentoring others</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.networkingInterest}
            onChange={(e) => handleInputChange('networkingInterest', e.target.checked)}
            className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
          />
          <span className="text-body text-text-primary">I'm interested in networking events</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.jobAlerts}
            onChange={(e) => handleInputChange('jobAlerts', e.target.checked)}
            className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
          />
          <span className="text-body text-text-primary">Send me job alerts</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => handleInputChange('newsletter', e.target.checked)}
            className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
          />
          <span className="text-body text-text-primary">Subscribe to newsletter</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-green-50 via-white to-blue-50" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative w-full max-w-4xl mx-auto px-4 py-16">
        <AnimatedSection animation="slideUp" className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={logoImage}
                alt="CareerSetu Logo"
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain animate-pulse"
              />
              <div className="absolute inset-0 bg-primary-blue/20 rounded-full blur-xl"></div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-2 tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-body text-text-secondary">Help us personalize your career journey</p>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={100}>
          <Card className="w-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-small text-text-secondary">Step {currentStep} of {totalSteps}</span>
                <span className="text-body-small text-text-secondary">{Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-blue h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Content */}
            <div className="min-h-[500px]">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border-light">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleNext}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Setting up profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Setup</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={200} className="mt-8 text-center">
          <p className="text-body-small text-text-secondary">
            You can always update this information later in your profile settings
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
