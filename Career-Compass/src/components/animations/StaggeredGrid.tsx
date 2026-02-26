import React from 'react';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';

interface StaggeredGridProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn';
  delay?: number;
}

const StaggeredGrid: React.FC<StaggeredGridProps> = ({
  children,
  className = '',
  animation = 'slideUp',
  delay = 100
}) => {
  const childrenArray = React.Children.toArray(children);
  const { ref, visibleItems } = useStaggeredAnimation(childrenArray.length, delay);

  const getAnimationClasses = (index: number) => {
    const baseClasses = 'transition-all duration-700 ease-out';
    const isVisible = visibleItems[index];
    
    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'scaleIn':
          return `${baseClasses} opacity-0 scale-95`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 scale-100`;
  };

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => (
        <div key={index} className={getAnimationClasses(index)}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggeredGrid;
