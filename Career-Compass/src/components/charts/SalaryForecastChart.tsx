import React from 'react';
import type { CareerTrajectoryLevel } from '../../types';

interface SalaryForecastChartProps {
  trajectory: CareerTrajectoryLevel[];
  className?: string;
}

const SalaryForecastChart: React.FC<SalaryForecastChartProps> = ({ 
  trajectory, 
  className = '' 
}) => {
  // Extract salary numbers for visualization
  const salaryData = trajectory.map((level, index) => {
    // Extract the lower bound of salary range for consistent comparison
    const salaryText = level.salary.replace(/[₹,]/g, '');
    const salaryMatch = salaryText.match(/(\d+)/);
    const salary = salaryMatch ? parseInt(salaryMatch[1]) : 0;
    
    return {
      level: level.level,
      years: level.years,
      salary: salary,
      salaryText: level.salary,
      position: index
    };
  });

  const maxSalary = Math.max(...salaryData.map(d => d.salary));

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-heading-3 font-semibold text-text-primary mb-6 text-center">
          📈 Salary Growth Projection
        </h3>
        
        {/* Chart Area */}
        <div className="relative h-64 mb-6">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-body-small text-text-secondary">
            <span>{maxSalary}+ LPA</span>
            <span>{Math.round(maxSalary * 0.75)} LPA</span>
            <span>{Math.round(maxSalary * 0.5)} LPA</span>
            <span>{Math.round(maxSalary * 0.25)} LPA</span>
            <span>0 LPA</span>
          </div>

          {/* Chart content */}
          <div className="ml-16 h-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0">
              {[0, 25, 50, 75, 100].map((percent) => (
                <div
                  key={percent}
                  className="absolute w-full border-t border-gray-200"
                  style={{ top: `${100 - percent}%` }}
                />
              ))}
            </div>

            {/* Salary bars */}
            <div className="relative h-full flex items-end justify-between px-4">
              {salaryData.map((data, index) => {
                const height = (data.salary / maxSalary) * 100;
                
                return (
                  <div key={index} className="flex flex-col items-center group">
                    {/* Bar */}
                    <div className="relative mb-2">
                      <div
                        className={`
                          w-12 rounded-t-lg transition-all duration-500 delay-${index * 100}
                          ${index === 0 ? 'bg-success' : 'bg-blue-400'}
                          group-hover:shadow-lg group-hover:scale-105
                        `}
                        style={{ height: `${height * 2}px` }}
                      />
                      
                      {/* Salary tooltip on hover */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-text-primary text-white px-2 py-1 rounded text-body-small whitespace-nowrap">
                        {data.salaryText}
                      </div>
                    </div>

                    {/* Level label */}
                    <div className="text-center">
                      <div className="text-body-small font-medium text-text-primary mb-1">
                        {data.level.split(' ').slice(-2).join(' ')}
                      </div>
                      <div className="text-body-small text-text-secondary">
                        {data.years}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Growth trend line */}
            <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={salaryData.map((data, index) => 
                  `${(index / (salaryData.length - 1)) * 100},${100 - (data.salary / maxSalary) * 100}`
                ).join(' ')}
                fill="none"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            </svg>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-heading-3 font-bold text-success">
              {salaryData[0]?.salaryText || 'N/A'}
            </div>
            <div className="text-body-small text-text-secondary">Starting Salary</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-heading-3 font-bold text-primary-blue">
              {salaryData[salaryData.length - 1]?.salaryText || 'N/A'}
            </div>
            <div className="text-body-small text-text-secondary">Peak Salary</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-heading-3 font-bold text-purple-600">
              {Math.round(((salaryData[salaryData.length - 1]?.salary || 0) / (salaryData[0]?.salary || 1)) * 100)}%
            </div>
            <div className="text-body-small text-text-secondary">Growth Potential</div>
          </div>
        </div>

        {/* Growth insights */}
        <div className="mt-4 p-4 bg-white rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-body font-semibold text-text-primary">Growth Insights</span>
          </div>
          <p className="text-body-small text-text-secondary">
            This career path shows strong earning potential with consistent growth opportunities. 
            The salary progression reflects increasing responsibility and expertise over time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalaryForecastChart;