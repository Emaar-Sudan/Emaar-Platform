// components/ui/ErrorDisplay.tsx
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  retry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  message, 
  retry 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-600 text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {message}
        </h2>
        {retry && (
          <button
            onClick={retry}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};