import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/common';
import { useAppData } from '../../hooks/useAppData';
import Layout from '../../components/layout/Layout';
import { AnimatedSection } from '../../components/animations';

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
}

interface InterviewSession {
  id: string;
  jobId: string;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  answers: Array<{
    questionId: string;
    answer: string;
    timeSpent: number;
    score: number;
  }>;
  startTime: Date;
  endTime?: Date;
  totalScore: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

const InterviewSessionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading } = useAppData();
  const [job, setJob] = useState<Job | null>(null);
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);

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
        
        // Filter questions relevant to the job
        const relevantQuestions = questionsData.filter((q: InterviewQuestion) => 
          q.jobRole === 'General' || 
          job?.title.toLowerCase().includes(q.jobRole.toLowerCase()) ||
          job?.skills.some(skill => q.keywords.some(keyword => 
            skill.toLowerCase().includes(keyword.toLowerCase())
          ))
        ).slice(0, 5); // Limit to 5 questions for demo

        // Initialize session
        const newSession: InterviewSession = {
          id: `session-${Date.now()}`,
          jobId: id || '',
          questions: relevantQuestions,
          currentQuestionIndex: 0,
          answers: [],
          startTime: new Date(),
          totalScore: 0,
          status: 'not-started'
        };
        setSession(newSession);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, [id, job]);

  useEffect(() => {
    if (session && session.status === 'in-progress' && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && session?.status === 'in-progress') {
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeRemaining, session]);

  const startInterview = () => {
    if (session) {
      const updatedSession = { ...session, status: 'in-progress' as const };
      setSession(updatedSession);
      setTimeRemaining(session.questions[0].timeLimit);
      startTimeRef.current = new Date();
    }
  };

  const handleTimeUp = () => {
    if (session && startTimeRef.current) {
      const timeSpent = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
      const score = calculateScore(currentAnswer, session.questions[session.currentQuestionIndex]);
      
      const newAnswer = {
        questionId: session.questions[session.currentQuestionIndex].id,
        answer: currentAnswer,
        timeSpent,
        score
      };

      const updatedAnswers = [...session.answers, newAnswer];
      const updatedSession = {
        ...session,
        answers: updatedAnswers,
        totalScore: session.totalScore + score
      };

      setSession(updatedSession);
      setCurrentAnswer('');
      
      if (session.currentQuestionIndex < session.questions.length - 1) {
        // Move to next question
        const nextIndex = session.currentQuestionIndex + 1;
        setSession({ ...updatedSession, currentQuestionIndex: nextIndex });
        setTimeRemaining(session.questions[nextIndex].timeLimit);
        startTimeRef.current = new Date();
      } else {
        // Interview completed
        completeInterview(updatedSession);
      }
    }
  };

  const submitAnswer = () => {
    if (session && startTimeRef.current) {
      const timeSpent = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
      const score = calculateScore(currentAnswer, session.questions[session.currentQuestionIndex]);
      
      const newAnswer = {
        questionId: session.questions[session.currentQuestionIndex].id,
        answer: currentAnswer,
        timeSpent,
        score
      };

      const updatedAnswers = [...session.answers, newAnswer];
      const updatedSession = {
        ...session,
        answers: updatedAnswers,
        totalScore: session.totalScore + score
      };

      setSession(updatedSession);
      setCurrentAnswer('');
      
      if (session.currentQuestionIndex < session.questions.length - 1) {
        // Move to next question
        const nextIndex = session.currentQuestionIndex + 1;
        setSession({ ...updatedSession, currentQuestionIndex: nextIndex });
        setTimeRemaining(session.questions[nextIndex].timeLimit);
        startTimeRef.current = new Date();
      } else {
        // Interview completed
        completeInterview(updatedSession);
      }
    }
  };

  const completeInterview = async (finalSession: InterviewSession) => {
    const completedSession = {
      ...finalSession,
      status: 'completed' as const,
      endTime: new Date()
    };
    setSession(completedSession);
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = generateAIAnalysis(finalSession);
      setAiAnalysis(analysis);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const calculateScore = (answer: string, question: InterviewQuestion): number => {
    // Simple scoring based on keyword matches and answer length
    const keywords = question.keywords;
    const answerLower = answer.toLowerCase();
    const matchedKeywords = keywords.filter(keyword => 
      answerLower.includes(keyword.toLowerCase())
    ).length;
    
    const keywordScore = (matchedKeywords / keywords.length) * 60;
    const lengthScore = Math.min(answer.length / 100, 1) * 20;
    const completenessScore = answer.length > 50 ? 20 : answer.length * 0.4;
    
    return Math.round(keywordScore + lengthScore + completenessScore);
  };

  const generateAIAnalysis = (session: InterviewSession): string => {
    const avgScore = session.totalScore / session.answers.length;
    const totalTime = session.answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
    
    let analysis = `## Interview Analysis Report\n\n`;
    analysis += `**Overall Score: ${Math.round(avgScore)}/100**\n\n`;
    analysis += `**Total Time: ${Math.floor(totalTime / 60)} minutes ${totalTime % 60} seconds**\n\n`;
    
    if (avgScore >= 80) {
      analysis += `🎉 **Excellent Performance!** You demonstrated strong technical knowledge and communication skills. Your answers were comprehensive and well-structured.\n\n`;
    } else if (avgScore >= 60) {
      analysis += `👍 **Good Performance!** You showed solid understanding of the topics. Consider practicing more to improve your confidence and depth of answers.\n\n`;
    } else {
      analysis += `📚 **Room for Improvement** Your answers could be more detailed and structured. Focus on practicing common interview questions and improving your technical knowledge.\n\n`;
    }
    
    analysis += `### Strengths:\n`;
    analysis += `- Clear communication style\n`;
    analysis += `- Good time management\n`;
    analysis += `- Relevant examples provided\n\n`;
    
    analysis += `### Areas for Improvement:\n`;
    analysis += `- Practice more technical questions\n`;
    analysis += `- Provide more specific examples\n`;
    analysis += `- Work on structuring your answers better\n\n`;
    
    analysis += `### Recommendations:\n`;
    analysis += `1. Review the job requirements and practice related questions\n`;
    analysis += `2. Prepare specific examples from your experience\n`;
    analysis += `3. Practice explaining technical concepts clearly\n`;
    analysis += `4. Consider taking additional courses to strengthen weak areas\n`;
    
    return analysis;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  if (!data || !job || !session) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-body text-text-secondary">Session not found</p>
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

  const currentQuestion = session.questions[session.currentQuestionIndex];
  const progress = ((session.currentQuestionIndex + 1) / session.questions.length) * 100;

  return (
    <Layout>
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection animation="slideUp" className="mb-8">
          <div className="text-center">
            <h1 className="text-heading-1 font-bold text-text-primary mb-2">
              🎤 AI Interview Session
            </h1>
            <p className="text-body-large text-text-secondary mb-4">
              {job.title} at {job.company}
            </p>
            <div className="flex items-center justify-center space-x-4 text-body-small text-text-secondary">
              <span>📝 {session.questions.length} Questions</span>
              <span>⏱️ ~{Math.floor(session.questions.reduce((sum, q) => sum + q.timeLimit, 0) / 60)} minutes</span>
            </div>
          </div>
        </AnimatedSection>

        {session.status === 'not-started' && (
          <AnimatedSection animation="slideUp" delay={100}>
            <Card className="max-w-2xl mx-auto p-8 text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h2 className="text-heading-2 font-semibold text-text-primary">
                  Ready to Start Your Interview?
                </h2>
                <p className="text-body text-text-secondary">
                  This AI-powered interview will help you practice for your {job.title} position. 
                  You'll be asked {session.questions.length} questions with time limits for each.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-body font-semibold text-primary-blue mb-2">Interview Tips:</h3>
                  <ul className="text-body-small text-text-secondary space-y-1 text-left">
                    <li>• Speak clearly and take your time</li>
                    <li>• Provide specific examples from your experience</li>
                    <li>• Ask for clarification if needed</li>
                    <li>• Stay calm and confident</li>
                  </ul>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={startInterview}
                  className="px-8"
                >
                  Start Interview
                </Button>
              </div>
            </Card>
          </AnimatedSection>
        )}

        {session.status === 'in-progress' && (
          <AnimatedSection animation="slideUp" delay={100}>
            <Card className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-body font-medium text-text-primary">
                      Question {session.currentQuestionIndex + 1} of {session.questions.length}
                    </span>
                    <span className="text-body-small text-text-secondary">
                      {formatTime(timeRemaining)} remaining
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-blue h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-body-small rounded-full ${
                      currentQuestion.category === 'Technical' ? 'bg-blue-100 text-blue-700' :
                      currentQuestion.category === 'Behavioral' ? 'bg-green-100 text-green-700' :
                      currentQuestion.category === 'System Design' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {currentQuestion.category}
                    </span>
                    <span className={`px-3 py-1 text-body-small rounded-full ${
                      currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {currentQuestion.difficulty}
                    </span>
                  </div>
                  
                  <h2 className="text-heading-2 font-semibold text-text-primary">
                    {currentQuestion.question}
                  </h2>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-body font-semibold text-text-primary mb-2">Key Topics:</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white text-text-secondary text-body-small rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Answer Input */}
                <div className="space-y-4">
                  <label className="block text-body font-medium text-text-primary">
                    Your Answer:
                  </label>
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Type your answer here... (You can also speak your answer and it will be transcribed)"
                    className="w-full h-32 px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
                  />
                  
                  <div className="flex items-center space-x-4">
                    <Button
                      variant={isRecording ? "secondary" : "outline"}
                      onClick={() => setIsRecording(!isRecording)}
                      className="flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                      <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-border-light">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/interview-prep/${id}`)}
                  >
                    Back to Prep
                  </Button>
                  <Button
                    variant="primary"
                    onClick={submitAnswer}
                    disabled={!currentAnswer.trim()}
                  >
                    Submit Answer
                  </Button>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        )}

        {session.status === 'completed' && (
          <AnimatedSection animation="slideUp" delay={100}>
            <Card className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {isAnalyzing ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
                    <h2 className="text-heading-2 font-semibold text-text-primary mb-2">
                      Analyzing Your Performance...
                    </h2>
                    <p className="text-body text-text-secondary">
                      Our AI is reviewing your answers and generating personalized feedback
                    </p>
                  </div>
                ) : showResults ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h2 className="text-heading-2 font-semibold text-text-primary mb-2">
                        Interview Completed!
                      </h2>
                      <p className="text-body text-text-secondary">
                        Great job! Here's your detailed performance analysis
                      </p>
                    </div>

                    {/* Results Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-blue-50 p-6 rounded-lg text-center">
                        <div className="text-heading-2 font-bold text-primary-blue mb-2">
                          {Math.round(session.totalScore / session.answers.length)}/100
                        </div>
                        <div className="text-body-small text-text-secondary">Average Score</div>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg text-center">
                        <div className="text-heading-2 font-bold text-success mb-2">
                          {session.answers.length}
                        </div>
                        <div className="text-body-small text-text-secondary">Questions Answered</div>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-lg text-center">
                        <div className="text-heading-2 font-bold text-purple-600 mb-2">
                          {Math.floor(session.answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / 60)}m
                        </div>
                        <div className="text-body-small text-text-secondary">Total Time</div>
                      </div>
                    </div>

                    {/* AI Analysis */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-heading-3 font-semibold text-text-primary mb-4">
                        🤖 AI Analysis Report
                      </h3>
                      <div className="prose max-w-none">
                        <pre className="whitespace-pre-wrap text-body text-text-primary">
                          {aiAnalysis}
                        </pre>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/interview-prep/${id}`)}
                      >
                        Practice More
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/jobs/${id}`)}
                      >
                        View Job Details
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate('/jobs')}
                      >
                        Find More Jobs
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </Card>
          </AnimatedSection>
        )}
      </div>
    </Layout>
  );
};

export default InterviewSessionPage;

