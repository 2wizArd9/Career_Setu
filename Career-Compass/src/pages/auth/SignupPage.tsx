import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../components/common';
import { AnimatedSection } from '../../components/animations';
import logoImage from '../../assets/small_Gemini_Generated_Image_1vj5vl1vj5vl1vj5-removebg-preview.png';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    currentRole: '',
    experience: '',
    education: '',
    interests: [] as string[],
    careerGoals: [] as string[],
    preferredJobTypes: [] as string[],
    salaryExpectation: '',
    availability: '',
    linkedin: '',
    github: '',
    portfolio: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (step === 2) {
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Please select gender';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
    }

    if (step === 3) {
      if (!formData.currentRole.trim()) newErrors.currentRole = 'Current role is required';
      if (!formData.experience) newErrors.experience = 'Experience level is required';
      if (!formData.education.trim()) newErrors.education = 'Education is required';
    }

    if (step === 4) {
      if (formData.interests.length === 0) newErrors.interests = 'Please select at least one interest';
      if (formData.careerGoals.length === 0) newErrors.careerGoals = 'Please select at least one career goal';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to onboarding for additional data collection
      navigate('/onboarding');
    }
  };

  const interestOptions = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing', 'Design',
    'Engineering', 'Sales', 'Human Resources', 'Operations', 'Consulting', 'Research'
  ];

  const careerGoalOptions = [
    'Get a promotion', 'Change careers', 'Learn new skills', 'Start a business',
    'Become a manager', 'Work remotely', 'Increase salary', 'Find work-life balance'
  ];

  const jobTypeOptions = [
    'Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-heading-2 font-semibold text-text-primary mb-2">Create Your Account</h2>
        <p className="text-body text-text-secondary">Let's start with your basic information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-body font-medium text-text-primary mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
              errors.firstName ? 'border-red-500' : 'border-border-light'
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-body-small mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-body font-medium text-text-primary mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
              errors.lastName ? 'border-red-500' : 'border-border-light'
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 text-body-small mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
            errors.email ? 'border-red-500' : 'border-border-light'
          }`}
          placeholder="Enter your email address"
        />
        {errors.email && <p className="text-red-500 text-body-small mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
              errors.password ? 'border-red-500' : 'border-border-light'
            }`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-body-small mt-1">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
              errors.confirmPassword ? 'border-red-500' : 'border-border-light'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showConfirmPassword ? (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-body-small mt-1">{errors.confirmPassword}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-heading-2 font-semibold text-text-primary mb-2">Personal Information</h2>
        <p className="text-body text-text-secondary">Help us get to know you better</p>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
            errors.phone ? 'border-red-500' : 'border-border-light'
          }`}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && <p className="text-red-500 text-body-small mt-1">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-body font-medium text-text-primary mb-2">Date of Birth</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
              errors.dateOfBirth ? 'border-red-500' : 'border-border-light'
            }`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-body-small mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="block text-body font-medium text-text-primary mb-2">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
              errors.gender ? 'border-red-500' : 'border-border-light'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="text-red-500 text-body-small mt-1">{errors.gender}</p>}
        </div>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
            errors.location ? 'border-red-500' : 'border-border-light'
          }`}
          placeholder="City, Country"
        />
        {errors.location && <p className="text-red-500 text-body-small mt-1">{errors.location}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-heading-2 font-semibold text-text-primary mb-2">Professional Background</h2>
        <p className="text-body text-text-secondary">Tell us about your work experience</p>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Current Role</label>
        <input
          type="text"
          value={formData.currentRole}
          onChange={(e) => handleInputChange('currentRole', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
            errors.currentRole ? 'border-red-500' : 'border-border-light'
          }`}
          placeholder="e.g., Software Engineer, Marketing Manager"
        />
        {errors.currentRole && <p className="text-red-500 text-body-small mt-1">{errors.currentRole}</p>}
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Experience Level</label>
        <select
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
            errors.experience ? 'border-red-500' : 'border-border-light'
          }`}
        >
          <option value="">Select Experience Level</option>
          <option value="0-1">0-1 years (Entry Level)</option>
          <option value="1-3">1-3 years (Junior)</option>
          <option value="3-5">3-5 years (Mid Level)</option>
          <option value="5-10">5-10 years (Senior)</option>
          <option value="10+">10+ years (Expert)</option>
        </select>
        {errors.experience && <p className="text-red-500 text-body-small mt-1">{errors.experience}</p>}
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Education</label>
        <input
          type="text"
          value={formData.education}
          onChange={(e) => handleInputChange('education', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all duration-200 ${
            errors.education ? 'border-red-500' : 'border-border-light'
          }`}
          placeholder="e.g., Bachelor's in Computer Science, MBA"
        />
        {errors.education && <p className="text-red-500 text-body-small mt-1">{errors.education}</p>}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-heading-2 font-semibold text-text-primary mb-2">Career Preferences</h2>
        <p className="text-body text-text-secondary">Help us personalize your experience</p>
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Areas of Interest</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {interestOptions.map((interest) => (
            <label key={interest} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('interests', [...formData.interests, interest]);
                  } else {
                    handleInputChange('interests', formData.interests.filter(i => i !== interest));
                  }
                }}
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
              />
              <span className="text-body-small text-text-primary">{interest}</span>
            </label>
          ))}
        </div>
        {errors.interests && <p className="text-red-500 text-body-small mt-1">{errors.interests}</p>}
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
        {errors.careerGoals && <p className="text-red-500 text-body-small mt-1">{errors.careerGoals}</p>}
      </div>

      <div>
        <label className="block text-body font-medium text-text-primary mb-2">Preferred Job Types</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {jobTypeOptions.map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.preferredJobTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleInputChange('preferredJobTypes', [...formData.preferredJobTypes, type]);
                  } else {
                    handleInputChange('preferredJobTypes', formData.preferredJobTypes.filter(t => t !== type));
                  }
                }}
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
              />
              <span className="text-body-small text-text-primary">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-50 via-white to-blue-50" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative w-full max-w-2xl mx-auto px-4 py-16">
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
            Join CareerSetu
          </h1>
          <p className="text-body text-text-secondary">Start your personalized career journey</p>
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
            <div className="min-h-[400px]">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
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
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
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
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-primary-blue hover:underline font-medium transition-colors"
            >
              Sign In
            </button>
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SignupPage;
