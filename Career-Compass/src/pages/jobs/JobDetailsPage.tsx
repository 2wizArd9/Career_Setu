import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';
import { AnimatedSection, StaggeredGrid } from '../../components/animations';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  remote: boolean;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience: string;
  description: string;
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
  applicants: number;
  views: number;
  recruiter: {
    name: string;
    title: string;
    email: string;
    linkedin: string;
    bio: string;
  };
  companyInfo: {
    size: string;
    industry: string;
    website: string;
    description: string;
  };
  interviewProcess: Array<{
    stage: string;
    duration: string;
    type: string;
    description: string;
  }>;
}

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading } = useAppData();
  const [job, setJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await fetch('/src/data/mock-jobs.json');
        const jobsData = await response.json();
        const foundJob = jobsData.find((j: Job) => j.id === id);
        setJob(foundJob);
      } catch (error) {
        console.error('Error loading job:', error);
      }
    };
    loadJob();
  }, [id]);

  const toggleSavedJob = (jobId: string) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
    } else {
      newSaved.add(jobId);
    }
    setSavedJobs(newSaved);
  };

  const handleApply = (jobId: string) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
    // In a real app, this would trigger an application flow
    alert('Application submitted successfully!');
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    const formatNumber = (num: number) => {
      if (num >= 100000) {
        return `${(num / 100000).toFixed(1)}L`;
      }
      return num.toLocaleString();
    };
    return `${formatNumber(salary.min)} - ${formatNumber(salary.max)} ${salary.currency}`;
  };

  const getSkillMatch = (jobSkills: string[], userSkills: string[]) => {
    const matched = jobSkills.filter(skill =>
      userSkills.some(userSkill =>
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    return {
      matched: matched.length,
      total: jobSkills.length,
      percentage: Math.round((matched.length / jobSkills.length) * 100)
    };
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
        </div>
      </Layout>
    );
  }

  if (!data || !job) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-body text-text-secondary">Job not found</p>
          <Button
            variant="primary"
            onClick={() => navigate('/jobs')}
            className="mt-4"
          >
            Back to Jobs
          </Button>
        </div>
      </Layout>
    );
  }

  const { user } = data;
  const skillMatch = getSkillMatch(job.skills, user.skills);
  const isSaved = savedJobs.has(job.id);
  const isApplied = appliedJobs.has(job.id);

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <AnimatedSection animation="slideUp" className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/jobs')}
            className="flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Jobs</span>
          </Button>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <AnimatedSection animation="slideUp">
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h1 className="text-heading-1 font-bold text-text-primary mb-2">
                        {job.title}
                      </h1>
                      <p className="text-body-large text-text-secondary mb-4">
                        {job.company} • {job.location} • {job.type}
                      </p>
                    <div className="flex items-center space-x-4 text-body-small text-text-secondary">
                      <span>📅 Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                      <span>👥 {job.applicants} applicants</span>
                      <span>👁️ {job.views} views</span>
                      {job.remote && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          Remote
                        </span>
                      )}
                    </div>
                    
                    {/* Company Links */}
                    <div className="flex items-center space-x-4 mt-3">
                      <a
                        href={job.companyInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary-blue hover:underline"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        <span>Company Website</span>
                      </a>
                      <a
                        href={job.recruiter.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 hover:underline"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>Recruiter LinkedIn</span>
                      </a>
                    </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSavedJob(job.id)}
                        className={`p-3 rounded-full transition-colors ${
                          isSaved 
                            ? 'bg-primary-blue text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-body-small text-text-secondary">Salary Range</div>
                      <div className="text-heading-3 font-bold text-primary-blue">
                        {formatSalary(job.salary)}
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-body-small text-text-secondary">Experience</div>
                      <div className="text-heading-3 font-bold text-success">
                        {job.experience}
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-body-small text-text-secondary">Your Match</div>
                      <div className="text-heading-3 font-bold text-purple-600">
                        {skillMatch.percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* Job Description */}
            <AnimatedSection animation="slideUp" delay={100}>
              <Card title="Job Description">
                <div className="prose max-w-none">
                  <p className="text-body text-text-primary leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </Card>
            </AnimatedSection>

            {/* Requirements */}
            <AnimatedSection animation="slideUp" delay={150}>
              <Card title="Requirements">
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-body text-text-primary">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </AnimatedSection>

            {/* Skills */}
            <AnimatedSection animation="slideUp" delay={200}>
              <Card title="Required Skills">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-body font-medium text-text-primary">
                      Skills Match ({skillMatch.matched}/{skillMatch.total})
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-blue h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skillMatch.percentage}%` }}
                        />
                      </div>
                      <span className="text-body-small text-text-secondary">
                        {skillMatch.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => {
                      const hasSkill = user.skills.some(userSkill =>
                        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                        skill.toLowerCase().includes(userSkill.toLowerCase())
                      );
                      return (
                        <span
                          key={index}
                          className={`px-3 py-2 text-body-small rounded-full ${
                            hasSkill
                              ? 'bg-success text-white'
                              : 'bg-gray-200 text-text-secondary'
                          }`}
                        >
                          {skill}
                          {hasSkill && ' ✓'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* Benefits */}
            <AnimatedSection animation="slideUp" delay={250}>
              <Card title="Benefits & Perks">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-body text-text-primary">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>

            {/* Interview Process */}
            <AnimatedSection animation="slideUp" delay={300}>
              <Card title="Interview Process">
                <div className="space-y-4">
                  {job.interviewProcess.map((stage, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-amber-200">
                      <div className="w-8 h-8 bg-primary-blue text-white rounded-full flex items-center justify-center text-body-small font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-body font-semibold text-text-primary mb-1">
                          {stage.stage}
                        </h4>
                        <p className="text-body-small text-text-secondary mb-2">
                          {stage.description}
                        </p>
                        <div className="flex items-center space-x-4 text-body-small text-text-secondary">
                          <span>⏱️ {stage.duration}</span>
                          <span>💻 {stage.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>

            {/* References & Resources */}
            <AnimatedSection animation="slideUp" delay={350}>
              <Card title="📋 References & Resources">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-body font-semibold text-text-primary mb-3">Company Resources</h4>
                    <div className="space-y-3">
                      <a
                        href={job.companyInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <svg className="w-5 h-5 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <div className="text-body font-medium text-text-primary">Company Website</div>
                          <div className="text-body-small text-text-secondary">{job.companyInfo.website}</div>
                        </div>
                      </a>
                      <a
                        href={job.recruiter.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <div>
                          <div className="text-body font-medium text-text-primary">Recruiter LinkedIn</div>
                          <div className="text-body-small text-text-secondary">Connect with {job.recruiter.name}</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-body font-semibold text-text-primary mb-3">Helpful Resources</h4>
                    <div className="space-y-2">
                      <a
                        href="#"
                        className="flex items-center space-x-3 p-2 text-primary-blue hover:bg-amber-100 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Interview Preparation Guide</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center space-x-3 p-2 text-primary-blue hover:bg-amber-100 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Company Culture Insights</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center space-x-3 p-2 text-primary-blue hover:bg-amber-100 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>Salary Negotiation Tips</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <AnimatedSection animation="slideUp" delay={100}>
              <Card>
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleApply(job.id)}
                    disabled={isApplied}
                    className="w-full"
                  >
                    {isApplied ? 'Applied ✓' : 'Apply Now'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/interview-prep/${job.id}`)}
                    className="w-full"
                  >
                    🎯 Interview Prep
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/mentors`)}
                    className="w-full"
                  >
                    💬 Get Expert Advice
                  </Button>
                </div>
              </Card>
            </AnimatedSection>

            {/* Company Info */}
            <AnimatedSection animation="slideUp" delay={150}>
              <Card title="About {job.company}">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-body font-semibold text-text-primary mb-2">
                      Company Size
                    </h4>
                    <p className="text-body-small text-text-secondary">
                      {job.companyInfo.size}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-text-primary mb-2">
                      Industry
                    </h4>
                    <p className="text-body-small text-text-secondary">
                      {job.companyInfo.industry}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-body font-semibold text-text-primary mb-2">
                      Description
                    </h4>
                    <p className="text-body-small text-text-secondary">
                      {job.companyInfo.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.open(job.companyInfo.website, '_blank')}
                    className="w-full"
                  >
                    Visit Website
                  </Button>
                </div>
              </Card>
            </AnimatedSection>

            {/* Recruiter Info */}
            <AnimatedSection animation="slideUp" delay={200}>
              <Card title="Recruiter">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-body font-semibold">
                        {job.recruiter.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h4 className="text-body font-semibold text-text-primary">
                      {job.recruiter.name}
                    </h4>
                    <p className="text-body-small text-text-secondary">
                      {job.recruiter.title}
                    </p>
                  </div>
                  <p className="text-body-small text-text-secondary">
                    {job.recruiter.bio}
                  </p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(`mailto:${job.recruiter.email}`)}
                      className="w-full"
                    >
                      📧 Email Recruiter
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(job.recruiter.linkedin, '_blank')}
                      className="w-full"
                    >
                      💼 LinkedIn
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

            {/* Missing Skills */}
            {skillMatch.percentage < 100 && (
              <AnimatedSection animation="slideUp" delay={250}>
                <Card title="Missing Skills">
                  <div className="space-y-4">
                    <p className="text-body-small text-text-secondary">
                      To improve your match for this role, consider learning:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills
                        .filter(skill => 
                          !user.skills.some(userSkill =>
                            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                            skill.toLowerCase().includes(userSkill.toLowerCase())
                          )
                        )
                        .slice(0, 5)
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-yellow-100 text-yellow-700 text-body-small rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/learning')}
                      className="w-full"
                    >
                      📚 Find Courses
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetailsPage;
