export interface AgentMessage {
  id: string;
  agentId: string;
  agentName: string;
  message: string;
  timestamp: Date;
  type: 'thinking' | 'action' | 'result' | 'collaboration' | 'final_report';
  status: 'processing' | 'completed' | 'error';
  metadata?: {
    skill?: string;
    confidence?: number;
    marketData?: any;
    learningPath?: any;
  };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  isActive: boolean;
  currentTask?: string;
  progress?: number;
}

export type AgentName = 'Lead_Counselor' | 'Skill_Analyst' | 'Market_Forecaster' | 'Learning_Coach';
export type MessageType = 'thinking' | 'action' | 'result' | 'collaboration' | 'final_report';

export interface AgentCollaboration {
  id: string;
  fromAgent: string;
  toAgent: string;
  task: string;
  status: 'pending' | 'in_progress' | 'completed';
  result?: any;
}

export interface CareerAnalysis {
  skills: {
    current: string[];
    missing: string[];
    recommendations: string[];
  };
  marketInsights: {
    highGrowthRoles: string[];
    salaryProjections: any;
    marketTrends: string[];
  };
  learningPath: {
    courses: any[];
    timeline: string;
    milestones: string[];
  };
  careerForecast: {
    recommendedRole: string;
    confidence: number;
    timeline: string;
    nextSteps: string[];
  };
}

export const AGENT_TYPES = {
  LEAD_COUNSELOR: 'lead_counselor',
  SKILL_ANALYST: 'skill_analyst',
  MARKET_FORECASTER: 'market_forecaster',
  LEARNING_COACH: 'learning_coach',
} as const;

export type AgentType = typeof AGENT_TYPES[keyof typeof AGENT_TYPES];
