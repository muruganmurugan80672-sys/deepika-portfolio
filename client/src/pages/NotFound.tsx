import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { Button } from '../components/Button';

export const NotFound: React.FC = () => {
  return (
    <Container className="py-5 text-center my-5">
      <div className="custom-card p-5 mx-auto" style={{ maxWidth: '550px' }}>
        <div className="text-primary mb-3">
          <Compass size={54} />
        </div>
        <h1 className="display-4 font-heading fw-bold text-main mb-2">404</h1>
        <h2 className="h5 text-muted mb-4">Page Not Found</h2>
        <p className="text-subtle mb-4">
          The page or resource you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary" icon={<Home size={18} />}>
            Return to Homepage
          </Button>
        </Link>
      </div>
    </Container>
  );
};
