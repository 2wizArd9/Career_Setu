import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';

interface CareerPath {
  id: string;
  title: string;
  currentRole: string;
  targetRole: string;
  timeline: string;
  steps: Array<{
    year: number;
    role: string;
    salary: number;
    skills: string[];
    completed: boolean;
  }>;
}

interface Simulation {
  id: string;
  name: string;
  description: string;
  duration: string;
  progress: number;
  status: 'idle' | 'running' | 'completed';
}

const CareerGuidancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pathway' | 'simulation' | 'mentor' | 'roadmap'>('pathway');
  const [selectedCareer, setSelectedCareer] = useState<string>('software-engineer');
  const [simulationRunning, setSimulationRunning] = useState<string | null>(null);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [careerScore, setCareerScore] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);

  const careerPaths: Record<string, CareerPath> = {
    'software-engineer': {
      id: 'software-engineer',
      title: 'Software Engineer Career Path',
      currentRole: 'Junior Developer',
      targetRole: 'Engineering Manager',
      timeline: '8-10 years',
      steps: [
        {
          year: 1,
          role: 'Junior Developer',
          salary: 600000,
          skills: ['HTML', 'CSS', 'JavaScript', 'React'],
          completed: true,
        },
        {
          year: 2,
          role: 'Mid-Level Developer',
          salary: 1200000,
          skills: ['Node.js', 'APIs', 'Databases', 'Git'],
          completed: false,
        },
        {
          year: 4,
          role: 'Senior Developer',
          salary: 2500000,
          skills: ['System Design', 'Architecture', 'Leadership', 'AWS'],
          completed: false,
        },
        {
          year: 6,
          role: 'Tech Lead',
          salary: 4000000,
          skills: ['Team Management', 'Project Planning', 'Mentoring'],
          completed: false,
        },
        {
          year: 8,
          role: 'Engineering Manager',
          salary: 6000000,
          skills: ['Strategy', 'People Management', 'Hiring', 'Budgeting'],
          completed: false,
        },
      ],
    },
    'data-scientist': {
      id: 'data-scientist',
      title: 'Data Scientist Career Path',
      currentRole: 'Data Analyst',
      targetRole: 'Chief Data Officer',
      timeline: '10-12 years',
      steps: [
        {
          year: 1,
          role: 'Data Analyst',
          salary: 700000,
          skills: ['SQL', 'Excel', 'Python', 'Statistics'],
          completed: true,
        },
        {
          year: 3,
          role: 'Data Scientist',
          salary: 1800000,
          skills: ['Machine Learning', 'Deep Learning', 'TensorFlow'],
          completed: false,
        },
        {
          year: 5,
          role: 'Senior Data Scientist',
          salary: 3500000,
          skills: ['MLOps', 'Big Data', 'Spark', 'Model Deployment'],
          completed: false,
        },
        {
          year: 8,
          role: 'Lead Data Scientist',
          salary: 5500000,
          skills: ['Research', 'Team Leadership', 'Business Strategy'],
          completed: false,
        },
        {
          year: 10,
          role: 'Chief Data Officer',
          salary: 10000000,
          skills: ['Data Strategy', 'C-Suite Communication', 'Innovation'],
          completed: false,
        },
      ],
    },
  };

  const simulations: Simulation[] = [
    {
      id: 'interview',
      name: 'Mock Interview Simulation',
      description: 'Practice real interview scenarios with AI feedback',
      duration: '30 mins',
      progress: 0,
      status: 'idle',
    },
    {
      id: 'salary',
      name: 'Salary Negotiation Sim',
      description: 'Learn negotiation tactics with real scenarios',
      duration: '20 mins',
      progress: 0,
      status: 'idle',
    },
    {
      id: 'leadership',
      name: 'Leadership Challenge',
      description: 'Handle team conflicts and make decisions',
      duration: '25 mins',
      progress: 0,
      status: 'idle',
    },
    {
      id: 'presentation',
      name: 'Presentation Skills',
      description: 'Present to stakeholders and executives',
      duration: '15 mins',
      progress: 0,
      status: 'idle',
    },
  ];

  const [activeSimulations, setActiveSimulations] = useState<Simulation[]>(simulations);

  const runSimulation = (simId: string) => {
    setSimulationRunning(simId);
    setSimulationProgress(0);

    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulationRunning(null);
          setShowResults(true);
          setCareerScore(Math.floor(Math.random() * 20) + 75);
          
          setActiveSimulations((sims) =>
            sims.map((sim) =>
              sim.id === simId ? { ...sim, status: 'completed' as const, progress: 100 } : sim
            )
          );
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const currentPath = careerPaths[selectedCareer];

  useEffect(() => {
    let score = 0;
    const interval = setInterval(() => {
      score += 1;
      setCareerScore(score);
      if (score >= 78) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-amber-50">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">Your Career Journey Starts Here</h1>
              <p className="text-xl text-blue-100 mb-8">
                AI-Powered Career Guidance with Interactive Simulations
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[140px]">
                  <div className="text-4xl font-bold">{careerScore}%</div>
                  <div className="text-sm text-blue-100">Career Readiness</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[140px]">
                  <div className="text-4xl font-bold">500+</div>
                  <div className="text-sm text-blue-100">Career Paths</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[140px]">
                  <div className="text-4xl font-bold">24/7</div>
                  <div className="text-sm text-blue-100">AI Mentorship</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-2xl shadow-2xl p-2 flex gap-2 overflow-x-auto">
            {[
              { id: 'pathway', label: 'Career Pathway', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              )},
              { id: 'simulation', label: 'Live Simulations', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
              { id: 'mentor', label: 'AI Mentor', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              )},
              { id: 'roadmap', label: 'Skill Roadmap', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              )},
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'pathway' | 'simulation' | 'mentor' | 'roadmap')}
                className={`flex-1 px-4 py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Career Pathway Tab */}
          {activeTab === 'pathway' && (
            <div className="space-y-8">
              {/* Career Selector */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Career Path</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.values(careerPaths).map((path) => (
                    <button
                      key={path.id}
                      onClick={() => setSelectedCareer(path.id)}
                      className={`p-6 rounded-xl border-4 transition-all duration-300 text-left ${
                        selectedCareer === path.id
                          ? 'border-blue-600 bg-blue-50 shadow-xl'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
                      }`}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{path.title}</h3>
                      <p className="text-gray-600 mb-4">
                        From {path.currentRole} to {path.targetRole}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold">
                          {path.timeline}
                        </span>
                        <span className="text-gray-600">{path.steps.length} stages</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Career Progression Visualization */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Career Progression</h2>
                
                {/* Timeline */}
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-16 top-0 bottom-0 w-1 bg-blue-200"></div>

                  {/* Steps */}
                  <div className="space-y-12">
                    {currentPath.steps.map((step, index) => (
                      <div key={index} className="relative flex items-start gap-8">
                        {/* Timeline Node */}
                        <div className="flex-shrink-0 relative z-10">
                          <div
                            className={`w-32 h-32 rounded-2xl flex flex-col items-center justify-center border-4 transition-all duration-500 ${
                              step.completed
                                ? 'bg-emerald-600 border-emerald-500 shadow-lg'
                                : index === 1
                                ? 'bg-blue-600 border-blue-500 shadow-lg'
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            <div className={`text-3xl font-bold ${step.completed || index === 1 ? 'text-white' : 'text-gray-400'}`}>
                              Y{step.year}
                            </div>
                            {step.completed && (
                              <svg className="w-8 h-8 text-white absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            {index === 1 && !step.completed && (
                              <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                                CURRENT
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Step Details */}
                        <div className={`flex-1 p-6 rounded-xl border-2 transition-all duration-500 ${
                          step.completed
                            ? 'bg-emerald-50 border-emerald-300'
                            : index === 1
                            ? 'bg-blue-50 border-blue-400 shadow-lg'
                            : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                            <h3 className="text-2xl font-bold text-gray-900">{step.role}</h3>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-emerald-600">
                                ₹{(step.salary / 100000).toFixed(1)}L
                              </div>
                              <div className="text-sm text-gray-600">Expected Salary</div>
                            </div>
                          </div>

                          {/* Skills Required */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h4>
                            <div className="flex flex-wrap gap-2">
                              {step.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                    step.completed
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : index === 1
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-200 text-gray-700'
                                  }`}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {index === 1 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg">
                                View Learning Path
                              </button>
                              <button className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                                Find Jobs
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Career Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-600">
                  <svg className="w-12 h-12 mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Growth Rate</h3>
                  <p className="text-3xl font-bold mb-1 text-blue-600">247%</p>
                  <p className="text-sm text-gray-600">Avg. salary increase</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-600">
                  <svg className="w-12 h-12 mb-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Time to Goal</h3>
                  <p className="text-3xl font-bold mb-1 text-purple-600">6.5 yrs</p>
                  <p className="text-sm text-gray-600">Average timeline</p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-emerald-600">
                  <svg className="w-12 h-12 mb-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Success Rate</h3>
                  <p className="text-3xl font-bold mb-1 text-emerald-600">89%</p>
                  <p className="text-sm text-gray-600">Of guided users</p>
                </div>
              </div>
            </div>
          )}

          {/* Simulation Tab */}
          {activeTab === 'simulation' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Interactive Career Simulations</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Practice real-world scenarios and build confidence before the actual interview
                </p>

                {/* Simulation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeSimulations.map((sim) => (
                    <div
                      key={sim.id}
                      className={`relative rounded-2xl border-4 overflow-hidden transition-all duration-500 ${
                        simulationRunning === sim.id
                          ? 'border-blue-500 bg-blue-50 shadow-2xl'
                          : sim.status === 'completed'
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-xl'
                      }`}
                    >
                      {/* Running Progress Bar */}
                      {simulationRunning === sim.id && (
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200">
                          <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${simulationProgress}%` }}
                          ></div>
                        </div>
                      )}

                      <div className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          {sim.status === 'completed' && (
                            <div className="bg-emerald-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Completed
                            </div>
                          )}
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{sim.name}</h3>
                        <p className="text-gray-600 mb-4">{sim.description}</p>

                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{sim.duration}</span>
                          </div>
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-semibold">
                            AI Powered
                          </span>
                        </div>

                        {simulationRunning === sim.id ? (
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="text-5xl font-bold text-blue-600 mb-2">
                                {simulationProgress}%
                              </div>
                              <p className="text-gray-600 font-medium">
                                Simulation in progress...
                              </p>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => runSimulation(sim.id)}
                            disabled={simulationRunning !== null}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                              sim.status === 'completed'
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
                          >
                            {sim.status === 'completed' ? 'Retry Simulation' : 'Start Simulation'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Modal */}
              {showResults && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
                    <div className="text-center mb-8">
                      <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-2">Simulation Complete!</h2>
                      <p className="text-lg text-gray-600">Here's your performance analysis</p>
                    </div>

                    {/* Score */}
                    <div className="bg-blue-50 rounded-2xl p-8 mb-6">
                      <div className="text-center mb-6">
                        <div className="text-7xl font-bold text-blue-600 mb-2">
                          {careerScore}%
                        </div>
                        <p className="text-xl text-gray-700 font-semibold">Overall Score</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-white rounded-xl">
                          <div className="text-3xl font-bold text-blue-600">92%</div>
                          <div className="text-sm text-gray-600 mt-1">Communication</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl">
                          <div className="text-3xl font-bold text-emerald-600">88%</div>
                          <div className="text-sm text-gray-600 mt-1">Problem Solving</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl">
                          <div className="text-3xl font-bold text-purple-600">85%</div>
                          <div className="text-sm text-gray-600 mt-1">Confidence</div>
                        </div>
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-3 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                        <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-700">
                          <strong>Strength:</strong> Excellent communication skills and clear articulation of ideas
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                        <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-gray-700">
                          <strong>Improvement:</strong> Work on handling pressure situations with more composure
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowResults(false)}
                        className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                      >
                        Close
                      </button>
                      <button className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
                        Download Report
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI Mentor Tab */}
          {activeTab === 'mentor' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">AI Career Mentor</h2>
                  <p className="text-lg text-gray-600">Get personalized guidance 24/7</p>
                </div>
              </div>

              {/* Chat Interface */}
              <div className="border-2 border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-blue-600 p-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                    <span className="font-semibold">AI Mentor is online</span>
                  </div>
                </div>

                <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {/* AI Messages */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-md">
                        <p className="text-gray-800">
                          Hi! I'm your AI Career Mentor. I can help you with career planning, skill development,
                          interview preparation, and more. What would you like to discuss today?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button className="px-4 py-2 bg-white border-2 border-blue-300 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                      Career Switch Advice
                    </button>
                    <button className="px-4 py-2 bg-white border-2 border-purple-300 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                      Skill Gap Analysis
                    </button>
                    <button className="px-4 py-2 bg-white border-2 border-emerald-300 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
                      Resume Review
                    </button>
                    <button className="px-4 py-2 bg-white border-2 border-yellow-300 text-yellow-600 rounded-xl font-semibold hover:bg-yellow-50 transition-colors">
                      Salary Negotiation
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white border-t-2 border-gray-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Ask me anything about your career..."
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skill Roadmap Tab */}
          {activeTab === 'roadmap' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Personalized Skill Roadmap</h2>
              
              <div className="space-y-6">
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level, idx) => (
                  <div key={level} className="relative">
                    <div className="flex items-center gap-6 mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl ${
                        idx === 0 ? 'bg-emerald-500 text-white' : idx === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{level}</h3>
                        <p className="text-gray-600">{idx === 0 ? 'Completed' : idx === 1 ? 'In Progress - 65%' : 'Locked'}</p>
                      </div>
                    </div>

                    <div className={`ml-20 p-6 rounded-xl border-2 ${
                      idx === 0 ? 'bg-emerald-50 border-emerald-300' : idx === 1 ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['HTML', 'CSS', 'JavaScript', 'Git'].map((skill) => (
                          <div key={skill} className={`p-3 rounded-lg text-center font-semibold ${
                            idx === 0 ? 'bg-emerald-100 text-emerald-700' : idx === 1 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CareerGuidancePage;
