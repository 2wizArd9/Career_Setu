import React, { useEffect, useRef } from 'react';
import { useAgentSimulation } from '../../hooks/useAgentSimulation';
import { Card, Button } from '../common';
import type { AgentMessage, MessageType } from '../../types/agents';
import AgentVisualization from './AgentVisualization';

const AgentSimulation: React.FC = () => {
  const { simulationState, startSimulation, AGENTS_DATA } = useAgentSimulation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [simulationState.messages]);

  const getAgentColorClass = (agentId: string) => {
    const agent = Object.values(AGENTS_DATA).find(a => a.id === agentId);
    if (!agent) return 'text-gray-700';
    return `text-${agent.color}-600`;
  };

  const getMessageTypeClass = (type: MessageType) => {
    switch (type) {
      case 'thinking': return 'bg-blue-50 text-blue-800';
      case 'action': return 'bg-green-50 text-green-800';
      case 'result': return 'bg-purple-50 text-purple-800';
      case 'collaboration': return 'bg-yellow-50 text-yellow-800';
      case 'final_report': return 'bg-indigo-50 text-indigo-800 font-bold';
      default: return 'bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-5xl p-8">
        <h2 className="text-heading-2 font-bold text-text-primary text-center mb-6">
          AI Career Advisory Board in Action
        </h2>
        <p className="text-body text-text-secondary text-center mb-8">
          Watch as our specialized AI agents collaborate to analyze your profile and generate your personalized career forecast.
        </p>

        {!simulationState.isSimulationRunning && !simulationState.simulationComplete && (
          <div className="text-center">
            <div className="mx-auto mb-6 loader-ring" />
            <p className="text-body text-text-secondary mb-4">Ready when you are</p>
            <Button onClick={startSimulation} variant="primary" size="lg">
              Start Analysis
            </Button>
          </div>
        )}

        {simulationState.isSimulationRunning && (
          <div className="space-y-8">
            {/* Active Agents */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {Object.values(AGENTS_DATA).map(agent => (
                <div key={agent.id} className={`tag border ${simulationState.activeAgents.some(a => a === agent.id || (a as any).id === agent.id) ? 'bg-blue-50 border-blue-200 text-blue-700 pulse-ring' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  <span className="text-lg">{agent.avatar}</span>
                  <span className="font-medium">{agent.name}</span>
                </div>
              ))}
            </div>

            {/* Agent Visualization */}
            <AgentVisualization
              agents={Object.values(AGENTS_DATA)}
              activeAgents={simulationState.activeAgents}
              collaborations={simulationState.collaborations}
            />

            {/* Timeline */}
            <div className="space-y-3">
              {[ 'Processing Data', 'Skill Analysis', 'Market Forecasting', 'Learning Plan', 'Final Report' ].map((label, idx) => {
                const step = idx + 1;
                const isDone = simulationState.currentPhase > step;
                const isActive = simulationState.currentPhase === step;
                return (
                  <div key={label} className={`flex items-center gap-3 p-3 rounded-lg border ${isActive ? 'bg-blue-50 border-blue-200' : isDone ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${isDone ? 'bg-green-500' : isActive ? 'bg-blue-600' : 'bg-gray-400'}`}>
                      {isDone ? '✓' : step}
                    </div>
                    <div className="flex-1 text-body font-medium text-text-primary">{label}</div>
                  </div>
                );
              })}
            </div>

            {/* Message Log */}
            <div className="border border-border-light rounded-lg p-4 h-80 overflow-y-auto bg-white">
              {simulationState.messages.map(msg => (
                <div key={msg.id} className="mb-3 last:mb-0">
                  <span className={`font-semibold ${getAgentColorClass(msg.agentId)}`}>
                    {Object.values(AGENTS_DATA).find(a => a.id === msg.agentId)?.avatar} {msg.agentName}:
                  </span>{' '}
                  <span className={`inline-block px-2 py-1 rounded-md text-body-small ${getMessageTypeClass(msg.type)}`}>
                    {msg.message}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {simulationState.simulationComplete && simulationState.finalReport && (
          <div className="mt-8">
            <h3 className="text-heading-3 font-bold text-text-primary mb-4 text-center">
              ✅ Analysis Complete! Your Personalized Career Forecast:
            </h3>
            <Card className="bg-blue-50 border-blue-200 p-6">
              <div className="space-y-4 text-body text-text-primary">
                <p><strong>Recommended Role:</strong> {simulationState.finalReport.careerForecast.recommendedRole}</p>
                <p><strong>Confidence:</strong> {(simulationState.finalReport.careerForecast.confidence * 100).toFixed(0)}%</p>
                <p><strong>Current Skills:</strong> {simulationState.finalReport.skills.current.join(', ')}</p>
                <p><strong>Missing Skills:</strong> {simulationState.finalReport.skills.missing.join(', ')}</p>
                <p><strong>Learning Recommendations:</strong> {simulationState.finalReport.learningPath.courses.map(c => c.title).join(', ')}</p>
                <p><strong>Next Steps:</strong> {simulationState.finalReport.careerForecast.nextSteps.join(', ')}</p>
              </div>
            </Card>
            <div className="text-center mt-6">
              <Button onClick={() => alert('Navigate to Dashboard with results!')} variant="primary" size="lg">
                View Full Dashboard
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AgentSimulation;