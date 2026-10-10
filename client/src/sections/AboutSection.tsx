import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SectionHeading } from '../components/SectionHeading';
import { Code, Database, Cpu, Brain, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: <Code size={20} className="text-primary" />,
      title: 'Frontend Engineering',
      desc: 'Building responsive, accessible interfaces with React, TypeScript, and modern CSS frameworks.',
    },
    {
      icon: <Cpu size={20} className="text-primary" />,
      title: 'Backend Systems & APIs',
      desc: 'Designing structured REST APIs with Express.js, TypeScript, authentication, and Swagger OpenAPI specs.',
    },
    {
      icon: <Database size={20} className="text-primary" />,
      title: 'Database & Data Modeling',
      desc: 'Managing structured and document databases using MongoDB, Mongoose, SQL, and relational design.',
    },
    {
      icon: <Brain size={20} className="text-primary" />,
      title: 'Python & Data Science',
      desc: 'Exploring algorithmic problem solving, Python scripting, data processing, and analytical modeling.',
    },
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Container>
        <SectionHeading
          subtitle="ABOUT ME"
          title="Driven by curiosity & clean engineering practices."
        />

        <Row className="gy-4 align-items-center">
          <Col lg={6}>
            <div className="pe-lg-4">
              <p className="lead mb-4" style={{ color: 'var(--text-main)', fontSize: '1.15rem' }}>
                I am a B.Tech Information Technology student with a strong passion for software architecture, web development, and problem solving.
              </p>

              <p className="text-muted mb-4">
                My journey in technology centers around understanding how complete digital systems work — from crafting intuitive frontend user interfaces to engineering secure backend APIs and data stores.
              </p>

              <p className="text-muted mb-4">
                In addition to core full-stack web technologies like React, Node.js, Express, and MongoDB, I actively cultivate knowledge in Java object-oriented programming, Python, and data science concepts. I believe in writing readable, maintainable code and building practical projects that solve real-world problems.
              </p>

              <div className="d-flex flex-column gap-2 mt-4">
                {[
                  'B.Tech Student in Information Technology',
                  'Focus on React, Node.js, TypeScript & MongoDB',
                  'Strong foundations in OOP, Data Structures & SQL',
                  'Interest in Python Data Analysis & Data Science',
                ].map((point, index) => (
                  <div key={index} className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    <span className="small font-weight-500 text-main">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <Row className="g-3">
              {highlights.map((item, index) => (
                <Col key={index} sm={6}>
                  <div className="custom-card h-100 p-4">
                    <div className="mb-3 p-2 rounded-3 d-inline-block" style={{ backgroundColor: 'var(--bg-elevated)' }}>
                      {item.icon}
                    </div>
                    <h3 className="h6 fw-bold text-main mb-2">{item.title}</h3>
                    <p className="small text-muted mb-0">{item.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
