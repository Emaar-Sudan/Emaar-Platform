import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-start justify-between">
            {/* Icon and Title Skeleton */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Status Badge Skeleton */}
            <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Details Grid Skeleton */}
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j}>
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};