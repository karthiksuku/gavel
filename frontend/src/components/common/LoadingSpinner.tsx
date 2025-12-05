import { Scale } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`spinner ${sizes[size]}`}></div>
      {message && <p className="mt-3 text-gray-500">{message}</p>}
    </div>
  );
}

export function FullPageLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 bg-gavel-600 rounded-2xl flex items-center justify-center animate-pulse">
        <Scale className="w-8 h-8 text-white" />
      </div>
      <p className="mt-4 text-lg text-gray-600">{message}</p>
    </div>
  );
}
