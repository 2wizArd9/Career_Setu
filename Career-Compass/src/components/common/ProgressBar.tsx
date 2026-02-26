import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
  showPercentage?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = true,
  className = '',
}) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-body text-text-primary font-medium">{label}</span>
        {showPercentage && (
          <span className="text-body-small text-text-secondary">
            {current}/{total} ({percentage}%)
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-blue h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;