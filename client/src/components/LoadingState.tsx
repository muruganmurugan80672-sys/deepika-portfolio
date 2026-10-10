import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading content...' }) => {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" style={{ width: '2.5rem', height: '2.5rem' }} />
      <p className="text-muted mt-3 mb-0 small">{message}</p>
    </div>
  );
};
