import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRight, Mail, Github, Linkedin, Sparkles, Code2, Server, Database, FileCode } from 'lucide-react';
import { Button } from '../components/Button';
import { ThreeOrb } from '../components/ThreeOrb';

const roles = [
  'Full Stack Developer',
  'Frontend Developer',
  'React Developer',
  'Software Developer',
  'UI/UX Enthusiast',
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedText === currentRole) {
      typingSpeed = 2000; // Pause at full word
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 300;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="section-padding position-relative overflow-hidden pt-5 pb-6">
      {/* Background Glowing Ambient Orbs */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x rounded-circle pointer-events-none"
        style={{
          width: '750px',
          height: '750px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, rgba(232, 121, 249, 0.08) 50%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />
      <div
        className="position-absolute bottom-0 end-0 rounded-circle pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(232, 121, 249, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="align-items-center gy-5">
          {/* Left Column: Heading, Animated Typing Effect & Call to Actions */}
          <Col lg={7}>
            <div className="d-inline-flex align-items-center gap-2 badge-custom badge-accent mb-3 py-2 px-3">
              <span className="pulse-dot-purple" />
              <span className="fw-semibold text-uppercase tracking-wider" style={{ fontSize: '0.8rem', color: '#E879F9' }}>
                WELCOME TO MY PORTFOLIO
              </span>
            </div>

            <h1 className="display-3 fw-extrabold mb-3 text-main" style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Hi, I’m Deepika 👋
            </h1>

            <h2 className="h2 fw-bold mb-4" style={{ minHeight: '50px' }}>
              <span className="text-muted fw-normal">I’m a </span>
              <span className="text-gradient-purple">{displayedText}</span>
              <span className="typing-cursor" />
            </h2>

            <p className="lead mb-4 pe-lg-4" style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              I build modern, responsive, and user-friendly digital experiences.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-5">
              <Button
                variant="primary"
                icon={<ArrowRight size={18} />}
                onClick={() => scrollToSection('projects')}
              >
                View My Projects
              </Button>
              <Button
                variant="secondary"
                icon={<Mail size={18} />}
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </Button>
            </div>

            {/* Quick Tech Highlights */}
            <div className="d-flex flex-wrap align-items-center gap-3 pt-3 border-top border-secondary border-opacity-25">
              <span className="small text-subtle text-uppercase fw-semibold" style={{ letterSpacing: '0.1em' }}>
                Core Focus:
              </span>
              <span className="badge-custom badge-accent">Full-Stack MERN</span>
              <span className="badge-custom badge-accent">RESTful APIs</span>
              <span className="badge-custom badge-accent">B.Tech IT '26</span>
            </div>
          </Col>

          {/* Right Column: 3D Visual Orb & Floating Tech Badges */}
          <Col lg={5} className="position-relative text-center">
            {/* 3D WebGL Canvas Orb */}
            <div className="mx-auto position-relative" style={{ maxWidth: '420px' }}>
              <ThreeOrb />

              {/* Floating Technology Badges around the 3D Orb */}
              <div
                className="position-absolute floating-badge bg-glass px-3 py-1.5 rounded-pill shadow-lg border border-purple d-flex align-items-center gap-1.5"
                style={{ top: '10%', left: '-20px', zIndex: 3 }}
              >
                <Code2 size={16} className="text-lavender" />
                <span className="small fw-semibold text-main">React</span>
              </div>

              <div
                className="position-absolute floating-badge-delayed bg-glass px-3 py-1.5 rounded-pill shadow-lg border border-purple d-flex align-items-center gap-1.5"
                style={{ top: '25%', right: '-15px', zIndex: 3 }}
              >
                <Code2 size={16} className="text-pink" />
                <span className="small fw-semibold text-main">TypeScript</span>
              </div>

              <div
                className="position-absolute floating-badge bg-glass px-3 py-1.5 rounded-pill shadow-lg border border-purple d-flex align-items-center gap-1.5"
                style={{ bottom: '25%', left: '-10px', zIndex: 3 }}
              >
                <FileCode size={16} className="text-warning" />
                <span className="small fw-semibold text-main">JavaScript</span>
              </div>

              <div
                className="position-absolute floating-badge-delayed bg-glass px-3 py-1.5 rounded-pill shadow-lg border border-purple d-flex align-items-center gap-1.5"
                style={{ bottom: '10%', right: '10px', zIndex: 3 }}
              >
                <Server size={16} className="text-lavender" />
                <span className="small fw-semibold text-main">Node.js</span>
              </div>

              <div
                className="position-absolute floating-badge bg-glass px-3 py-1.5 rounded-pill shadow-lg border border-purple d-flex align-items-center gap-1.5"
                style={{ top: '65%', left: '30%', zIndex: 3 }}
              >
                <Database size={16} className="text-success" />
                <span className="small fw-semibold text-main">MongoDB</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
