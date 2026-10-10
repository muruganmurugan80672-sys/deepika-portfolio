import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'An unexpected error occurred while loading data.',
  onRetry,
}) => {
  return (
    <div className="custom-card text-center py-5 my-4 mx-auto" style={{ maxWidth: '500px' }}>
      <div className="text-danger mb-3">
        <AlertTriangle size={40} />
      </div>
      <h4 className="h6 fw-bold mb-2">Failed to Load Content</h4>
      <p className="text-muted small mb-4">{message}</p>
      {onRetry && (
        <Button variant="secondary" icon={<RefreshCw size={16} />} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
