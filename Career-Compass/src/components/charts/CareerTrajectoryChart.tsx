import React, { useState } from 'react';
import type { CareerTrajectoryLevel } from '../../types';

interface CareerTrajectoryChartProps {
  trajectory: CareerTrajectoryLevel[];
  className?: string;
}

const CareerTrajectoryChart: React.FC<CareerTrajectoryChartProps> = ({ 
  trajectory, 
  className = '' 
}) => {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-border-light"></div>
        
        {/* Timeline Nodes */}
        <div className="space-y-8">
          {trajectory.map((level, index) => (
            <div 
              key={index}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredLevel(index)}
              onMouseLeave={() => setHoveredLevel(null)}
            >
              {/* Timeline Node */}
              <div className={`
                relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-200
                ${index === 0 ? 'bg-success border-success' : 'bg-white border-primary-blue'}
                ${hoveredLevel === index ? 'scale-125 shadow-lg' : ''}
              `}>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
                )}
              </div>

              {/* Content */}
              <div className="ml-6 flex-1">
                <div className={`
                  bg-white border border-border-light rounded-lg p-4 transition-all duration-200
                  ${hoveredLevel === index ? 'shadow-lg border-primary-blue' : 'hover:shadow-md'}
                `}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-body font-semibold text-text-primary mb-1">
                        {level.level}
                      </h4>
                      <p className="text-body-small text-text-secondary mb-2">
                        Experience: {level.years}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-body-small text-text-secondary">Salary Range:</span>
                          <span className="text-body font-medium text-success">
                            {level.salary}
                          </span>
                        </div>
                        {index === 0 && (
                          <span className="px-2 py-1 bg-success text-white text-body-small rounded-full">
                            Current Level
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="ml-4 text-right">
                      <div className="text-body-small text-text-secondary mb-1">
                        Step {index + 1} of {trajectory.length}
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-primary-blue h-1 rounded-full transition-all duration-300"
                          style={{ width: `${((index + 1) / trajectory.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover Details */}
                  {hoveredLevel === index && (
                    <div className="mt-3 pt-3 border-t border-border-light">
                      <div className="grid grid-cols-2 gap-4 text-body-small">
                        <div>
                          <span className="text-text-secondary">Typical Duration:</span>
                          <div className="font-medium text-text-primary">{level.years}</div>
                        </div>
                        <div>
                          <span className="text-text-secondary">Growth Potential:</span>
                          <div className="font-medium text-success">
                            {index < trajectory.length - 1 ? 'High' : 'Leadership'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Projection Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full">
            <svg className="w-4 h-4 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-body-small font-medium text-text-primary">
              5-10 Year Career Projection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerTrajectoryChart;