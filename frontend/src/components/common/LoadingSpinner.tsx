import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullHeight?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading data...',
  fullHeight = false
}) => {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4'
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${fullHeight ? 'min-h-[50vh]' : ''}`}>
      <div
        className={`animate-spin rounded-full border-slate-200 border-t-orange-600 ${sizeClasses}`}
        role="status"
        aria-label="Loading"
      />
      {message && <p className="mt-3 text-sm font-medium text-slate-500">{message}</p>}
    </div>
  );
};
