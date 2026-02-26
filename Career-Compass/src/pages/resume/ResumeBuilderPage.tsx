import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import FileUpload from '../../components/common/FileUpload';
import { useAppData } from '../../hooks/useAppData';
import { useResumeAnalysis } from '../../hooks/useResumeAnalysis';
import Layout from '../../components/layout/Layout';
import { AnimatedSection, StaggeredGrid } from '../../components/animations';

const ResumeBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useAppData();
  const {
    isAnalyzing,
    analysisResult,
    linkedinAnalysis,
    githubAnalysis,
    error: analysisError,
    analyzeResume,
    resetAnalysis
  } = useResumeAnalysis();
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSections, setShowSections] = useState({
    summary: true,
    experience: true,
    skills: true,
    education: true,
    certifications: true,
    projects: false
  });

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
          <p className="text-body text-text-secondary">Failed to load user data</p>
        </div>
      </Layout>
    );
  }

  const { user } = data;

  const handleFileSelect = async (file: File, text: string) => {
    setUploadedFile(file);
    await analyzeResume(text);
  };

  const handleReset = () => {
    setUploadedFile(null);
    resetAnalysis();
  };

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <h1 className="text-heading-1 font-bold text-text-primary mb-2">
            📄 AI Resume Builder
          </h1>
          <p className="text-body-large text-text-secondary">
            Create a professional resume with AI-powered suggestions
          </p>
        </AnimatedSection>

        {/* File Upload Section */}
        {!uploadedFile && (
          <AnimatedSection animation="slideUp" className="mb-8">
            <Card>
              <div className="text-center">
                <h2 className="text-heading-2 font-bold text-text-primary mb-4">
                  📄 Upload Your Resume
                </h2>
                <p className="text-body-large text-text-secondary mb-6">
                  Get AI-powered analysis, skill extraction, and personalized recommendations
                </p>
                <FileUpload onFileSelect={handleFileSelect} />
              </div>
            </Card>
          </AnimatedSection>
        )}

        {/* Analysis Results */}
        {isAnalyzing && (
          <AnimatedSection animation="slideUp" className="mb-8">
            <Card>
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
                <h3 className="text-heading-3 font-semibold text-text-primary mb-2">
                  Analyzing Your Resume
                </h3>
                <p className="text-body text-text-secondary">
                  Extracting skills, analyzing career fit, and generating insights...
                </p>
              </div>
            </Card>
          </AnimatedSection>
        )}

        {analysisError && (
          <AnimatedSection animation="slideUp" className="mb-8">
            <Card>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-body text-red-600 font-semibold">Analysis Failed</p>
                </div>
                <p className="text-body-small text-red-600 mt-2">{analysisError}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={handleReset}
                >
                  Try Again
                </Button>
              </div>
            </Card>
          </AnimatedSection>
        )}

        {/* Analysis Results Display */}
        {analysisResult && !isAnalyzing && (
          <>
            {/* LinkedIn Analysis */}
            {linkedinAnalysis && (
              <AnimatedSection animation="slideUp" className="mb-8">
                <Card title="💼 LinkedIn Profile Analysis">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-heading-1 font-bold text-primary-blue mb-2">
                        {linkedinAnalysis.profileCompleteness}%
                      </div>
                      <p className="text-body-small text-text-secondary">Profile Completeness</p>
                    </div>
                    <div className="text-center">
                      <div className="text-heading-1 font-bold text-success mb-2">
                        {linkedinAnalysis.networkStrength}%
                      </div>
                      <p className="text-body-small text-text-secondary">Network Strength</p>
                    </div>
                    <div className="text-center">
                      <div className="text-heading-1 font-bold text-warning mb-2">
                        {linkedinAnalysis.activityScore}%
                      </div>
                      <p className="text-body-small text-text-secondary">Activity Score</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-body font-semibold text-text-primary mb-2">Recommendations</h4>
                      <ul className="space-y-1">
                        {linkedinAnalysis.recommendations.map((rec, index) => (
                          <li key={index} className="text-body-small text-text-secondary flex items-start space-x-2">
                            <span className="text-primary-blue mt-0.5">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-body font-semibold text-text-primary mb-2">Top Connections</h4>
                      <div className="space-y-2">
                        {linkedinAnalysis.topConnections.map((connection, index) => (
                          <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-amber-200">
                            <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                              <span className="text-body-small font-semibold text-white">
                                {connection.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="text-body-small font-semibold text-text-primary">{connection.name}</p>
                              <p className="text-body-small text-text-secondary">{connection.title} at {connection.company}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            )}

            {/* GitHub Analysis */}
            {githubAnalysis && (
              <AnimatedSection animation="slideUp" className="mb-8">
                <Card title="💻 GitHub Profile Analysis">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-heading-2 font-bold text-primary-blue mb-1">
                        {githubAnalysis.totalRepos}
                      </div>
                      <p className="text-body-small text-text-secondary">Total Repos</p>
                    </div>
                    <div className="text-center">
                      <div className="text-heading-2 font-bold text-yellow-600 mb-1">
                        {githubAnalysis.starsReceived}
                      </div>
                      <p className="text-body-small text-text-secondary">Stars Received</p>
                    </div>
                    <div className="text-center">
                      <div className="text-heading-2 font-bold text-green-600 mb-1">
                        {githubAnalysis.followers}
                      </div>
                      <p className="text-body-small text-text-secondary">Followers</p>
                    </div>
                    <div className="text-center">
                      <div className="text-heading-2 font-bold text-orange-600 mb-1">
                        {githubAnalysis.contributionStreak}
                      </div>
                      <p className="text-body-small text-text-secondary">Day Streak</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-body font-semibold text-text-primary mb-3">Top Languages</h4>
                      <div className="space-y-2">
                        {githubAnalysis.topLanguages.map((lang, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-body-small text-text-primary">{lang.language}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-primary-blue h-2 rounded-full"
                                  style={{ width: `${lang.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-body-small text-text-secondary">{lang.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-body font-semibold text-text-primary mb-3">Recent Activity</h4>
                      <ul className="space-y-2">
                        {githubAnalysis.recentActivity.map((activity, index) => (
                          <li key={index} className="text-body-small text-text-secondary flex items-start space-x-2">
                            <span className="text-green-600 mt-0.5">•</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            )}
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Resume Preview - Takes 3 columns */}
          <div className="lg:col-span-3">
            <Card title="Resume Preview">
              <div className="bg-white border border-border-light rounded-lg p-8 shadow-sm" style={{ fontFamily: 'serif' }}>
                {/* Header */}
                <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  <p className="text-lg text-gray-600 mb-2">{user.currentRole}</p>
                  <div className="text-sm text-gray-500">
                    <span>{user.email}</span> • <span>+91 98765 43210</span> • <span>Mumbai, India</span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Results-driven {user.currentRole} with {user.experience} of experience in data analysis, 
                    statistical modeling, and business intelligence. Proficient in Python, SQL, and data visualization 
                    tools. Proven track record of transforming complex datasets into actionable business insights 
                    that drive strategic decision-making and operational improvements.
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    PROFESSIONAL EXPERIENCE
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">{user.currentRole}</h3>
                          <p className="text-sm text-gray-600">TechCorp Solutions Pvt Ltd</p>
                        </div>
                        <span className="text-sm text-gray-500">2022 - Present</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4">
                        <li>• Analyzed customer behavior data to identify trends, resulting in 15% increase in user engagement</li>
                        <li>• Developed automated reporting dashboards using Tableau, reducing manual reporting time by 60%</li>
                        <li>• Collaborated with cross-functional teams to implement data-driven solutions for business challenges</li>
                        <li>• Performed statistical analysis on large datasets to support strategic business decisions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">Data Analyst Intern</h3>
                          <p className="text-sm text-gray-600">DataInsights Inc</p>
                        </div>
                        <span className="text-sm text-gray-500">2021 - 2022</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1 ml-4">
                        <li>• Assisted in data cleaning and preprocessing for machine learning models</li>
                        <li>• Created visualizations and reports to communicate findings to stakeholders</li>
                        <li>• Supported senior analysts in conducting market research and competitive analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    TECHNICAL SKILLS
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Programming & Analytics</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {analysisResult ? (
                          analysisResult.extracted_skills.technical.slice(0, 5).map((skill, index) => (
                            <li key={index}>• {skill}</li>
                          ))
                        ) : (
                          user.skills.slice(0, 5).map((skill, index) => (
                            <li key={index}>• {skill}</li>
                          ))
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Tools & Technologies</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {analysisResult ? (
                          analysisResult.extracted_skills.technical.slice(5, 10).concat(
                            analysisResult.extracted_skills.certifications.slice(0, 3)
                          ).map((skill, index) => (
                            <li key={index}>• {skill}</li>
                          ))
                        ) : (
                          <>
                            <li>• Microsoft Office Suite</li>
                            <li>• Google Analytics</li>
                            <li>• Jupyter Notebooks</li>
                            <li>• Git/GitHub</li>
                            <li>• AWS (Basic)</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    EDUCATION
                  </h2>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Bachelor of Technology in Computer Science</h3>
                        <p className="text-sm text-gray-600">Mumbai University</p>
                      </div>
                      <span className="text-sm text-gray-500">2018 - 2022</span>
                    </div>
                    <p className="text-sm text-gray-700">CGPA: 8.2/10 • Relevant Coursework: Data Structures, Statistics, Database Management</p>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                    CERTIFICATIONS
                  </h2>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Google Data Analytics Professional Certificate (2022)</li>
                    <li>• Microsoft Excel Expert Certification (2021)</li>
                    <li>• Tableau Desktop Specialist (2023)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Suggestions Sidebar */}
          <div className="space-y-6">
            <Card title="🤖 AI Suggestions">
              <div className="space-y-4">
                {analysisResult ? (
                  <>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-success mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <h4 className="text-body-small font-semibold text-success">Skills Extracted Successfully!</h4>
                          <p className="text-body-small text-gray-600">
                            Found {analysisResult.extracted_skills.technical.length} technical skills and {analysisResult.extracted_skills.soft.length} soft skills.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-primary-blue mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <div>
                          <h4 className="text-body-small font-semibold text-primary-blue">Top Career Match</h4>
                          <p className="text-body-small text-gray-600">
                            {analysisResult.career_forecast[0].role} ({analysisResult.career_forecast[0].fit_percentage}% fit)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                          <h4 className="text-body-small font-semibold text-purple-600">Learning Recommendation</h4>
                          <p className="text-body-small text-gray-600">
                            {analysisResult.learning_plan[0].step}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-warning mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="text-body-small font-semibold text-warning">Personalized Insight</h4>
                          <p className="text-body-small text-gray-600">
                            {analysisResult.personalized_insight.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-success mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <h4 className="text-body-small font-semibold text-success">Great use of action verbs!</h4>
                          <p className="text-body-small text-gray-600">Your experience section uses strong action words like "analyzed" and "developed".</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-primary-blue mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h4 className="text-body-small font-semibold text-primary-blue">Add quantified achievements</h4>
                          <p className="text-body-small text-gray-600">Consider adding more specific metrics to showcase your impact.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-warning mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                          <h4 className="text-body-small font-semibold text-warning">Consider adding projects</h4>
                          <p className="text-body-small text-gray-600">A projects section could showcase your practical skills.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <div>
                          <h4 className="text-body-small font-semibold text-purple-600">Skills alignment</h4>
                          <p className="text-body-small text-gray-600">Your skills match well with Data Scientist roles!</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            <Card title="📊 Resume Score">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-heading-1 font-bold text-success mb-2">85/100</div>
                  <p className="text-body-small text-text-secondary">Overall Score</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-body-small mb-1">
                      <span>Content Quality</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-body-small mb-1">
                      <span>Formatting</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-body-small mb-1">
                      <span>Keywords</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="🎯 Quick Actions">
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full">
                  Edit Resume
                </Button>
                {uploadedFile && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleReset}
                  >
                    Upload New Resume
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/careers')}
                >
                  Find Matching Jobs
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/mentors')}
                >
                  Get Expert Review
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeBuilderPage;