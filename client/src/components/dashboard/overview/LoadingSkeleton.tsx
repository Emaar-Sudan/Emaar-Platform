
import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
          <div className="w-10 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-2 bg-gray-200 rounded w-1/4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};