import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';
import { AnimatedSection, StaggeredGrid } from '../../components/animations';

interface InterviewQuestion {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  expectedAnswer: string;
  keywords: string[];
  followUpQuestions: string[];
  timeLimit: number;
  jobRole: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  skills: string[];
  interviewProcess: Array<{
    stage: string;
    duration: string;
    type: string;
    description: string;
  }>;
}

const InterviewPrepPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading } = useAppData();
  const [job, setJob] = useState<Job | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [prepProgress, setPrepProgress] = useState<Set<string>>(new Set());
  const [showAnswer, setShowAnswer] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load job data
        const jobResponse = await fetch('/src/data/mock-jobs.json');
        const jobsData = await jobResponse.json();
        const foundJob = jobsData.find((j: Job) => j.id === id);
        setJob(foundJob);

        // Load interview questions
        const questionsResponse = await fetch('/src/data/mock-interview-questions.json');
        const questionsData = await questionsResponse.json();
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, [id]);

  const togglePrepProgress = (questionId: string) => {
    const newProgress = new Set(prepProgress);
    if (newProgress.has(questionId)) {
      newProgress.delete(questionId);
    } else {
      newProgress.add(questionId);
    }
    setPrepProgress(newProgress);
  };

  const filteredQuestions = questions.filter(q => {
    const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getCategories = () => {
    return Array.from(new Set(questions.map(q => q.category)));
  };

  const getDifficulties = () => {
    return Array.from(new Set(questions.map(q => q.difficulty)));
  };

  const getPrepStats = () => {
    const total = questions.length;
    const completed = prepProgress.size;
    const percentage = Math.round((completed / total) * 100);
    return { total, completed, percentage };
  };

  const startMockInterview = () => {
    navigate(`/interview/${id}`);
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
  const stats = getPrepStats();

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <div className="text-center">
            <h1 className="text-heading-1 font-bold text-text-primary mb-2">
              🎯 Interview Preparation
            </h1>
            <p className="text-body-large text-text-secondary mb-4">
              Get ready for your {job.title} interview at {job.company}
            </p>
            <div className="flex items-center justify-center space-x-4 text-body-small text-text-secondary">
              <span>📅 Interview Process: {job.interviewProcess.length} stages</span>
              <span>⏱️ Estimated Duration: 3-4 hours</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Progress Overview */}
        <AnimatedSection animation="slideUp" delay={100} className="mb-8">
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-heading-2 font-bold text-primary-blue mb-2">
                  {stats.completed}/{stats.total}
                </div>
                <div className="text-body-small text-text-secondary">Questions Prepared</div>
              </div>
              <div className="text-center">
                <div className="text-heading-2 font-bold text-success mb-2">
                  {stats.percentage}%
                </div>
                <div className="text-body-small text-text-secondary">Preparation Progress</div>
              </div>
              <div className="text-center">
                <div className="text-heading-2 font-bold text-purple-600 mb-2">
                  {job.interviewProcess.length}
                </div>
                <div className="text-body-small text-text-secondary">Interview Stages</div>
              </div>
              <div className="text-center">
                <div className="text-heading-2 font-bold text-warning mb-2">
                  {job.skills.length}
                </div>
                <div className="text-body-small text-text-secondary">Key Skills</div>
              </div>
            </div>
          </Card>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card title="🔍 Filter Questions">
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-body font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {getCategories().map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-body font-medium text-text-primary mb-2">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="all">All Levels</option>
                    {getDifficulties().map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-border-light">
                  <h4 className="text-body font-medium text-text-primary mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      onClick={startMockInterview}
                      className="w-full"
                    >
                      🎤 Start Mock Interview
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/jobs/${id}`)}
                      className="w-full"
                    >
                      📄 View Job Details
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/mentors')}
                      className="w-full"
                    >
                      💬 Get Expert Help
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-2 font-semibold text-text-primary">
                Practice Questions ({filteredQuestions.length})
              </h2>
              <div className="text-body-small text-text-secondary">
                Showing {filteredQuestions.length} of {questions.length} questions
              </div>
            </div>

            <StaggeredGrid
              className="space-y-6"
              animation="slideUp"
              delay={150}
            >
              {filteredQuestions.map((question) => {
                const isCompleted = prepProgress.has(question.id);
                const isShowingAnswer = showAnswer === question.id;
                
                return (
                  <Card
                    key={question.id}
                    className={`transition-all duration-200 ${
                      isCompleted ? 'bg-green-50 border-success' : 'hover:shadow-lg'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Question Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-3 py-1 text-body-small rounded-full ${
                              question.category === 'Technical' ? 'bg-blue-100 text-blue-700' :
                              question.category === 'Behavioral' ? 'bg-green-100 text-green-700' :
                              question.category === 'System Design' ? 'bg-purple-100 text-purple-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {question.category}
                            </span>
                            <span className={`px-3 py-1 text-body-small rounded-full ${
                              question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                              question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {question.difficulty}
                            </span>
                            <span className="text-body-small text-text-secondary">
                              ⏱️ {Math.floor(question.timeLimit / 60)} min
                            </span>
                          </div>
                          <h3 className="text-heading-3 font-semibold text-text-primary mb-2">
                            {question.question}
                          </h3>
                        </div>
                        <button
                          onClick={() => togglePrepProgress(question.id)}
                          className={`p-2 rounded-full transition-colors ${
                            isCompleted 
                              ? 'bg-success text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>

                      {/* Keywords */}
                      <div>
                        <div className="text-body-small text-text-secondary mb-2">Key Topics:</div>
                        <div className="flex flex-wrap gap-2">
                          {question.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-text-secondary text-body-small rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Answer Section */}
                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowAnswer(isShowingAnswer ? null : question.id)}
                          className="w-full"
                        >
                          {isShowingAnswer ? 'Hide Answer' : 'Show Expected Answer'}
                        </Button>

                        {isShowingAnswer && (
                          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                            <h4 className="text-body font-semibold text-primary-blue">
                              Expected Answer:
                            </h4>
                            <p className="text-body text-text-primary">
                              {question.expectedAnswer}
                            </p>
                            {question.followUpQuestions.length > 0 && (
                              <div>
                                <h5 className="text-body-small font-semibold text-text-primary mb-2">
                                  Follow-up Questions:
                                </h5>
                                <ul className="space-y-1">
                                  {question.followUpQuestions.map((followUp, index) => (
                                    <li key={index} className="text-body-small text-text-secondary">
                                      • {followUp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Progress Indicator */}
                      {isCompleted && (
                        <div className="flex items-center space-x-2 text-success">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-body-small font-medium">Prepared ✓</span>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </StaggeredGrid>

            {/* No Results */}
            {filteredQuestions.length === 0 && (
              <AnimatedSection animation="slideUp" className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 2-1.5 2-2.5 0-.5-.5-1-1-1h-1c-1.5 0-3 1-3 3 0 1.5 1.5 3 3 3s3-1.5 3-3c0-1.5-1.5-3-3-3h-1c-.5 0-1 .5-1 1z" />
                  </svg>
                </div>
                <h3 className="text-heading-3 font-semibold text-text-primary mb-2">
                  No questions found
                </h3>
                <p className="text-body text-text-secondary">
                  Try adjusting your filters to see more questions
                </p>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewPrepPage;

