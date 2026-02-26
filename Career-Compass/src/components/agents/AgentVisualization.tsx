import React from 'react';
import type { AgentName, AgentCollaboration, Agent } from '../../types/agents';

interface AgentVisualizationProps {
  agents: Agent[]; // full list of agents
  activeAgents: Agent[]; // active agents (full agent objects)
  collaborations: AgentCollaboration[]; // uses agent ids in fromAgent/toAgent
}

const AgentVisualization: React.FC<AgentVisualizationProps> = ({ agents, activeAgents, collaborations }) => {
  const idToPosition: Record<string, string> = {
    'lead_counselor': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'skill_analyst': 'top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2',
    'market_forecaster': 'top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2',
    'learning_coach': 'bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2',
  };

  const getAgentColorClass = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return 'bg-gray-400';
    return `bg-${agent.color}-500`;
  };

  const getLineColorClass = (status: 'pending' | 'completed' | 'active') => {
    switch (status) {
      case 'active': return 'border-blue-500 animate-pulse';
      case 'completed': return 'border-green-500';
      case 'pending': return 'border-gray-400';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="relative w-full h-64 bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
      {/* Lines for collaborations */}
      {collaborations.map((collab, index) => {
        const fromAgent = agents.find(a => a.id === collab.fromAgent);
        const toAgent = agents.find(a => a.id === collab.toAgent);
        if (!fromAgent || !toAgent) return null;

        // Simple line drawing (conceptual, for visual effect)
        // In a real implementation, you'd calculate actual positions for SVG lines
        return (
          <div
            key={index}
            className={`absolute border-t-2 ${getLineColorClass(collab.status)}`}
            style={{
              // These are placeholder styles. Real line drawing would be more complex.
              width: '50%',
              transform: `rotate(${index * 45}deg)`,
              transformOrigin: 'left',
              left: '25%',
              top: '50%',
            }}
          ></div>
        );
      })}

      {/* Agents */}
      {agents.map((agent) => (
        <div
          key={agent.id}
          className={`absolute w-24 h-24 rounded-full flex flex-col items-center justify-center text-white text-4xl font-bold shadow-lg transition-all duration-300
            ${getAgentColorClass(agent.id)}
            ${activeAgents.some(a => a.id === agent.id) ? 'ring-4 ring-offset-2 ring-blue-400 scale-110' : ''}
            ${idToPosition[agent.id]}
          `}
        >
          {agent.avatar}
          <span className="text-xs mt-1">{agent.name.split(' ')[0]}</span>
        </div>
      ))}
    </div>
  );
};

export default AgentVisualization;