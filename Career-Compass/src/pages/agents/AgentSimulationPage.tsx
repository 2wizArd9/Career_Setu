import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';

interface Agent {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'idle' | 'analyzing' | 'completed';
  progress: number;
  result?: {
    score: number;
    insights: string[];
    recommendations: string[];
  };
}

const AgentSimulationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'input' | 'simulation' | 'results'>('input');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [targetRole, setTargetRole] = useState('');
  const [experience, setExperience] = useState('');
  const [resumeFile, setResumeFile] = useState<string>('');
  
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'resume-analyzer', name: 'Resume Analyzer', icon: '�', description: 'Analyzing resume structure, keywords, and ATS compatibility', status: 'idle', progress: 0 },
    { id: 'skill-matcher', name: 'Skill Matcher', icon: '🎯', description: 'Matching skills with current market demand', status: 'idle', progress: 0 },
    { id: 'job-recommender', name: 'Job Recommender', icon: '💼', description: 'Finding best job opportunities for your profile', status: 'idle', progress: 0 },
    { id: 'career-advisor', name: 'Career Path Advisor', icon: '🗺', description: 'Mapping optimal career progression paths', status: 'idle', progress: 0 },
    { id: 'salary-predictor', name: 'Salary Predictor', icon: '�', description: 'Calculating market value and salary range', status: 'idle', progress: 0 },
    { id: 'interview-prep', name: 'Interview Prep AI', icon: '�', description: 'Generating personalized interview questions', status: 'idle', progress: 0 },
  ]);

  const availableSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'REST APIs', 'Machine Learning', 'Data Analysis', 'UI/UX Design', 'Agile', 'DevOps', 'C++'];

  const getAgentIcon = (agentId: string) => {
    const icons: Record<string, React.ReactElement> = {
      'resume-analyzer': <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      'skill-matcher': <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
      'job-recommender': <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      'career-advisor': <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
      'salary-predictor': <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      'interview-prep': <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
    };
    return icons[agentId] || icons['resume-analyzer'];
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setResumeFile(file.name); }
  };

  const startAnalysis = async () => {
    if (selectedSkills.length === 0 || !targetRole || !experience) {
      alert('Please fill in all required fields');
      return;
    }
    setCurrentStep('simulation');
    for (let i = 0; i < agents.length; i++) {
      setAgents(prev => prev.map((a, idx) => idx === i ? { ...a, status: 'analyzing' as const, progress: 0 } : a));
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setAgents(prev => prev.map((a, idx) => idx === i ? { ...a, progress } : a));
      }
      await new Promise(resolve => setTimeout(resolve, 300));
      setAgents(prev => prev.map((a, idx) => idx === i ? { ...a, status: 'completed' as const, result: generateMockResult(agents[i].id) } : a));
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentStep('results');
  };

  const generateMockResult = (agentId: string) => {
    const results: Record<string, { score: number; insights: string[]; recommendations: string[] }> = {
      'resume-analyzer': { score: 87, insights: ['ATS compatibility score is excellent', 'Strong use of action verbs and quantifiable achievements', 'Resume structure follows industry best practices'], recommendations: ['Add more technical certifications', 'Include links to GitHub projects', 'Expand on leadership experiences'] },
      'skill-matcher': { score: 92, insights: [`${selectedSkills.length} skills matched with high-demand roles`, 'Strong proficiency in modern tech stack', 'Well-balanced technical and soft skills'], recommendations: ['Consider learning cloud certifications (AWS/Azure)', 'Add system design knowledge', 'Explore emerging technologies like AI/ML'] },
      'job-recommender': { score: 95, insights: ['234 jobs match your profile', 'Top companies are actively hiring', 'Average salary range: $80K - $120K'], recommendations: ['Apply to senior positions at tech startups', 'Target companies with remote-first culture', 'Focus on product-based companies'] },
      'career-advisor': { score: 88, insights: ['Clear progression path identified', 'Ready for senior-level responsibilities', 'Strong potential for tech lead roles'], recommendations: ['Pursue team leadership opportunities', 'Consider specializing in architecture', 'Build your personal brand through blogging'] },
      'salary-predictor': { score: 91, insights: ['Current market value: $95,000 - $115,000', 'Top 15% in your experience bracket', 'Strong negotiation leverage'], recommendations: ['Target companies offering equity compensation', 'Negotiate for remote work benefits', 'Consider contract opportunities for higher rates'] },
      'interview-prep': { score: 89, insights: ['45 personalized interview questions generated', 'Common patterns identified from target companies', 'Behavioral question bank created'], recommendations: ['Practice system design interviews', 'Prepare STAR method responses', 'Review company-specific case studies'] }
    };
    return results[agentId];
  };

  const resetSimulation = () => {
    setCurrentStep('input');
    setSelectedSkills([]);
    setTargetRole('');
    setExperience('');
    setResumeFile('');
    setAgents(prev => prev.map(a => ({ ...a, status: 'idle' as const, progress: 0, result: undefined })));
  };

  const overallScore = agents.filter(a => a.result).length > 0 ? Math.round(agents.reduce((sum, a) => sum + (a.result?.score || 0), 0) / agents.filter(a => a.result).length) : 0;

  return (
    <Layout>
      <div className="min-h-screen bg-amber-50">
        <div className="bg-amber-50 border-b-2 border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Career Intelligence</h1>
              <p className="text-lg text-gray-600">Experience the power of 6 AI agents working together to accelerate your career</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {currentStep === 'input' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your Career Analysis</h2>
                  <p className="text-gray-600">Fill in your details to receive personalized insights from our AI agents</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Resume (Optional)</label>
                    <div className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors cursor-pointer bg-gray-50">
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" id="resume-upload" />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        {resumeFile ? <p className="text-emerald-700 font-medium">{resumeFile}</p> : <><p className="text-gray-700 font-medium">Click to upload your resume</p><p className="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX (Max 5MB)</p></>}
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Target Role *</label>
                    <input type="text" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="e.g., Full Stack Developer, Data Scientist, Product Manager" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level *</label>
                    <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all">
                      <option value="">Select your experience</option>
                      <option value="fresher">Fresher (0-1 years)</option>
                      <option value="junior">Junior (1-3 years)</option>
                      <option value="mid">Mid-level (3-5 years)</option>
                      <option value="senior">Senior (5-8 years)</option>
                      <option value="lead">Lead/Principal (8+ years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Select Your Skills * ({selectedSkills.length} selected)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {availableSkills.map(skill => (
                        <button key={skill} onClick={() => toggleSkill(skill)} className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors duration-200 ${selectedSkills.includes(skill) ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-400 hover:bg-gray-50'}`}>{skill}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={startAnalysis} className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors duration-200 shadow-md hover:shadow-lg">Start AI Analysis →</button>
                </div>
              </div>
            </div>
          )}
          {currentStep === 'simulation' && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Agents Are Analyzing Your Profile</h2>
                  <p className="text-gray-600">This will take about 15-20 seconds</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agents.map((agent) => (
                    <div key={agent.id} className={`border-2 rounded-xl p-6 transition-all duration-300 ${agent.status === 'analyzing' ? 'border-emerald-400 bg-emerald-50' : agent.status === 'completed' ? 'border-emerald-500 bg-emerald-100' : 'border-gray-300 bg-white'}`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-4xl">{getAgentIcon(agent.id)}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{agent.name}</h3>
                          <p className="text-sm text-gray-600">{agent.description}</p>
                        </div>
                        {agent.status === 'completed' && <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      {agent.status !== 'idle' && (
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div className={`h-full transition-all duration-500 ease-out ${agent.status === 'completed' ? 'bg-emerald-600' : 'bg-emerald-500'}`} style={{ width: `${agent.progress}%` }}></div>
                          </div>
                          <div className="text-right text-sm text-gray-600 mt-1">{agent.progress}%</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {currentStep === 'results' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-slate-800 rounded-xl shadow-lg p-8 text-white text-center border-2 border-slate-700">
                <h2 className="text-3xl font-bold mb-4">Your Career Intelligence Report</h2>
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div>
                    <div className="text-7xl font-bold text-emerald-400">{overallScore}</div>
                    <div className="text-xl mt-2 text-gray-200">Overall Score</div>
                  </div>
                  <div className="text-left space-y-2">
                    <div className="flex items-center gap-2"><svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span>Profile analyzed by 6 AI agents</span></div>
                    <div className="flex items-center gap-2"><svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span>{selectedSkills.length} skills evaluated</span></div>
                    <div className="flex items-center gap-2"><svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span>Personalized recommendations generated</span></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agents.map((agent) => agent.result && (
                  <div key={agent.id} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{agent.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{agent.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-2xl font-bold text-slate-700">{agent.result.score}</div>
                          <div className="text-sm text-gray-500">/100</div>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div className="absolute top-0 left-0 h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${agent.result.score}%` }}></div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Insights:</h4>
                      <ul className="space-y-1">
                        {agent.result.insights.map((insight, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-emerald-600 mt-0.5">●</span><span>{insight}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Recommendations:</h4>
                      <ul className="space-y-1">
                        {agent.result.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-slate-600 mt-0.5">→</span><span>{rec}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={resetSimulation} className="px-8 py-3 bg-white border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-200">← Try Again</button>
                <button className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 shadow-md">Download Full Report (PDF) →</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg hover:border-emerald-300 transition-all duration-200">
                  <svg className="w-12 h-12 mx-auto mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  <h3 className="font-bold text-gray-900 mb-2">Career Dashboard</h3>
                  <p className="text-sm text-gray-600 mb-4">Track your progress and goals</p>
                  <button className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">View Dashboard →</button>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg hover:border-emerald-300 transition-all duration-200">
                  <svg className="w-12 h-12 mx-auto mb-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <h3 className="font-bold text-gray-900 mb-2">Skill Courses</h3>
                  <p className="text-sm text-gray-600 mb-4">Recommended learning paths</p>
                  <button className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">Browse Courses →</button>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center hover:shadow-lg hover:border-emerald-300 transition-all duration-200">
                  <svg className="w-12 h-12 mx-auto mb-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <h3 className="font-bold text-gray-900 mb-2">Career Mentor</h3>
                  <p className="text-sm text-gray-600 mb-4">Connect with industry experts</p>
                  <button className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">Find Mentors →</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgentSimulationPage;
