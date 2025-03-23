import React from 'react';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizes[size]} border-4 border-t-transparent border-primary rounded-full animate-spin`} />
    </div>
  );
};

export const LoadingScreen: React.FC<{ message?: string }> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <LoadingIndicator size="lg" />
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};