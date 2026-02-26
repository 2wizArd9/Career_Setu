import { useState, useEffect, useCallback } from 'react';
import type { Agent, AgentMessage, AgentCollaboration, CareerAnalysis, AgentName, MessageType } from '../types/agents';
import { AGENT_TYPES } from '../types/agents';
import { useAppData } from './useAppData';

const AGENTS_DATA: Record<AgentName, Agent> = {
  Lead_Counselor: {
    id: AGENT_TYPES.LEAD_COUNSELOR,
    name: 'Dr. Sarah Chen',
    role: 'Lead Career Counselor',
    avatar: '👩‍💼',
    color: 'blue',
    isActive: false,
  },
  Skill_Analyst: {
    id: AGENT_TYPES.SKILL_ANALYST,
    name: 'Alex Rodriguez',
    role: 'AI Skill Analyst',
    avatar: '🤖',
    color: 'green',
    isActive: false,
  },
  Market_Forecaster: {
    id: AGENT_TYPES.MARKET_FORECASTER,
    name: 'Maya Patel',
    role: 'Market Intelligence Expert',
    avatar: '📊',
    color: 'purple',
    isActive: false,
  },
  Learning_Coach: {
    id: AGENT_TYPES.LEARNING_COACH,
    name: 'James Wilson',
    role: 'Learning Path Specialist',
    avatar: '🎓',
    color: 'orange',
    isActive: false,
  },
};

const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

export const useAgentSimulation = () => {
  const { data: appData } = useAppData();
  const [simulationState, setSimulationState] = useState({
    currentPhase: 0,
    totalPhases: 5,
    messages: [] as AgentMessage[],
    activeAgents: [] as AgentName[],
    collaborations: [] as AgentCollaboration[],
    isSimulationRunning: false,
    simulationComplete: false,
    finalReport: null as CareerAnalysis | null,
  });

  const addMessage = useCallback((sender: AgentName, content: string, type: MessageType, recipient?: AgentName) => {
    setSimulationState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, { 
        id: generateUniqueId(), 
        agentId: AGENTS_DATA[sender].id,
        agentName: AGENTS_DATA[sender].name,
        message: content,
        timestamp: new Date(),
        type,
        status: 'completed'
      }],
    }));
  }, []);

  const updateCollaboration = useCallback((from: AgentName, to: AgentName, status: 'pending' | 'completed' | 'active', task?: string) => {
    setSimulationState(prevState => {
      const fromAgentId = AGENTS_DATA[from].id;
      const toAgentId = AGENTS_DATA[to].id;
      const existingIndex = prevState.collaborations.findIndex(c => c.fromAgent === fromAgentId && c.toAgent === toAgentId);
      if (existingIndex !== -1) {
        const newCollaborations = [...prevState.collaborations];
        newCollaborations[existingIndex] = { ...newCollaborations[existingIndex], status, ...(task && { task }) };
        return { ...prevState, collaborations: newCollaborations };
      } else {
        return {
          ...prevState,
          collaborations: [...prevState.collaborations, { 
            id: generateUniqueId(),
            fromAgent: fromAgentId, 
            toAgent: toAgentId, 
            task: task || '', 
            status 
          }],
        };
      }
    });
  }, []);

  const startSimulation = useCallback(async () => {
    setSimulationState({
      currentPhase: 0,
      totalPhases: 5,
      messages: [],
      activeAgents: [],
      collaborations: [],
      isSimulationRunning: true,
      simulationComplete: false,
      finalReport: null,
    });

    addMessage('Lead_Counselor', 'Welcome! Your AI Career Advisory Board is now active. Let\'s analyze your profile.', 'thinking');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Phase 1: Initial Data Submission
    setSimulationState(prevState => ({ ...prevState, currentPhase: 1, activeAgents: ['Lead_Counselor'] }));
    addMessage('Lead_Counselor', 'Processing initial user data and resume...', 'action');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 2: Skill Analysis
    setSimulationState(prevState => ({ ...prevState, currentPhase: 2, activeAgents: ['Lead_Counselor', 'Skill_Analyst'] }));
    addMessage('Lead_Counselor', 'Delegating to Skill Analyst for detailed skill extraction.', 'collaboration', 'Skill_Analyst');
    updateCollaboration('Lead_Counselor', 'Skill_Analyst', 'active', 'Extracting skills');
    await new Promise(resolve => setTimeout(resolve, 2000));
    addMessage('Skill_Analyst', `Analyzing ${appData?.user.name}'s resume to identify core competencies.`, 'thinking');
    await new Promise(resolve => setTimeout(resolve, 3000));
    const userSkills = appData?.user.skills.join(', ') || 'Python, SQL, Data Analysis';
    addMessage('Skill_Analyst', `Identified key skills: ${userSkills}.`, 'result');
    updateCollaboration('Lead_Counselor', 'Skill_Analyst', 'completed');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 3: Market Forecasting
    setSimulationState(prevState => ({ ...prevState, currentPhase: 3, activeAgents: ['Lead_Counselor', 'Market_Forecaster'] }));
    addMessage('Lead_Counselor', 'Consulting Market Forecaster for high-growth career paths.', 'collaboration', 'Market_Forecaster');
    updateCollaboration('Lead_Counselor', 'Market_Forecaster', 'active', 'Researching market trends');
    await new Promise(resolve => setTimeout(resolve, 2000));
    addMessage('Market_Forecaster', 'Analyzing current job market trends and future growth projections.', 'thinking');
    await new Promise(resolve => setTimeout(resolve, 3500));
    const topCareer = appData?.careers[0]?.title || 'Data Scientist';
    addMessage('Market_Forecaster', `Identified high-growth role: ${topCareer} with strong demand.`, 'result');
    updateCollaboration('Lead_Counselor', 'Market_Forecaster', 'completed');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 4: Learning Plan Generation
    setSimulationState(prevState => ({ ...prevState, currentPhase: 4, activeAgents: ['Lead_Counselor', 'Learning_Coach'] }));
    addMessage('Lead_Counselor', 'Based on skill gaps and market demand, Learning Coach will craft a personalized plan.', 'collaboration', 'Learning_Coach');
    updateCollaboration('Lead_Counselor', 'Learning_Coach', 'active', 'Developing learning plan');
    await new Promise(resolve => setTimeout(resolve, 2000));
    addMessage('Learning_Coach', 'Generating a tailored learning roadmap to bridge skill gaps for target roles.', 'thinking');
    await new Promise(resolve => setTimeout(resolve, 3000));
    const nextCourse = appData?.courses[0]?.title || 'Advanced Python for Data Science';
    addMessage('Learning_Coach', `Recommended course: "${nextCourse}" to enhance relevant skills.`, 'result');
    updateCollaboration('Lead_Counselor', 'Learning_Coach', 'completed');
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Phase 5: Final Report Synthesis
    setSimulationState(prevState => ({ ...prevState, currentPhase: 5, activeAgents: ['Lead_Counselor'] }));
    addMessage('Lead_Counselor', 'Synthesizing all insights into your personalized career forecast.', 'thinking');
    await new Promise(resolve => setTimeout(resolve, 2500));
    const finalReportContent: CareerAnalysis = {
      skills: {
        current: appData?.user.skills || ['Python', 'SQL'],
        missing: ['Machine Learning', 'Cloud Platforms'],
        recommendations: ['Deep Learning', 'Big Data Technologies'],
      },
      marketInsights: {
        highGrowthRoles: [topCareer, 'AI Engineer'],
        salaryProjections: { [topCareer]: '$120,000' },
        marketTrends: ['AI adoption', 'Data-driven decision making'],
      },
      learningPath: {
        courses: (appData?.courses || []).slice(0, 2),
        timeline: '6-12 months',
        milestones: ['Complete advanced ML course', 'Build portfolio projects'],
      },
      careerForecast: {
        recommendedRole: topCareer,
        confidence: 0.9,
        timeline: '1-2 years',
        nextSteps: ['Enroll in recommended courses', 'Network with mentors'],
      },
    };
    addMessage('Lead_Counselor', 'Final career forecast generated.', 'final_report');
    await new Promise(resolve => setTimeout(resolve, 2000));

    setSimulationState(prevState => ({
      ...prevState,
      isSimulationRunning: false,
      simulationComplete: true,
      activeAgents: [],
      finalReport: finalReportContent,
    }));
  }, [addMessage, updateCollaboration, appData]);

  return { simulationState, startSimulation, AGENTS_DATA };
};