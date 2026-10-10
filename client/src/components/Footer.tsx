import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 0 2rem 0',
      }}
    >
      <Container>
        <Row className="align-items-center gy-4">
          <Col md={6} className="text-center text-md-start">
            <h5 className="font-heading fw-bold mb-1" style={{ color: 'var(--text-main)' }}>
              DEEPIKA
            </h5>
            <p className="mb-0 text-muted small">
              Full-Stack Developer & B.Tech IT Student building impactful, intuitive web applications.
            </p>
          </Col>

          <Col md={6} className="d-flex justify-content-center justify-content-md-end align-items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-toggle-btn"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-toggle-btn"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:deepika.dev@example.com"
              className="theme-toggle-btn"
              aria-label="Email Deepika"
              title="Email"
            >
              <Mail size={18} />
            </a>
            <button
              onClick={scrollToTop}
              className="theme-toggle-btn"
              aria-label="Back to top"
              title="Back to Top"
            >
              <ArrowUp size={18} />
            </button>
          </Col>
        </Row>

        <hr className="my-4" style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />

        <Row>
          <Col className="text-center">
            <p className="small text-muted mb-0">
              © {currentYear} Deepika. All rights reserved. Designed with Midnight Executive styling.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
