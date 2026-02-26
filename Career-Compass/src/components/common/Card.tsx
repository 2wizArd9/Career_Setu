import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = '',
  clickable = false,
  onClick,
}) => {
  const baseClasses = 'bg-white rounded-lg border border-border-light shadow-sm';
  const clickableClasses = clickable ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' : '';
  
  return (
    <div
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={clickable ? onClick : undefined}
    >
      {title && (
        <div className="px-6 py-4 border-b border-border-light">
          <h3 className="text-heading-3 font-semibold text-text-primary">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;