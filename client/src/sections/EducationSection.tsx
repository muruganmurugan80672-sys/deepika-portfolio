import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SectionHeading } from '../components/SectionHeading';
import { GraduationCap, Calendar, Building, BookOpen } from 'lucide-react';
import { Education } from '../types';
import { getEducation } from '../services/api';
import { LoadingState } from '../components/LoadingState';

export const EducationSection: React.FC = () => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        const data = await getEducation();
        setEducationList(data);
      } catch (err) {
        console.error('Failed to load education data');
      } finally {
        setLoading(false);
      }
    };
    fetchEdu();
  }, []);

  return (
    <section id="education" className="section-padding">
      <Container>
        <SectionHeading
          subtitle="ACADEMIC BACKGROUND"
          title="Education & Foundations"
          description="Academic qualifications supporting my full-stack engineering journey."
        />

        {loading ? (
          <LoadingState message="Loading education history..." />
        ) : (
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="position-relative ps-4" style={{ borderLeft: '2px solid var(--border-color)' }}>
                {educationList.map((item, index) => (
                  <div key={item._id || index} className="mb-5 position-relative">
                    {/* Timeline Node Icon */}
                    <div
                      className="position-absolute rounded-circle p-2 d-flex align-items-center justify-content-center"
                      style={{
                        left: '-41px',
                        top: '0',
                        backgroundColor: 'var(--bg-primary)',
                        border: '2px solid var(--accent-primary)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      <GraduationCap size={18} />
                    </div>

                    <div className="custom-card p-4">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                        <span className="badge-custom badge-accent d-inline-flex align-items-center gap-1">
                          <Calendar size={12} /> {item.startYear} – {item.endYear}
                        </span>
                        <span className="small text-subtle font-monospace">{item.department}</span>
                      </div>

                      <h3 className="h5 fw-bold text-main mb-1">{item.degree}</h3>
                      <h4 className="h6 text-primary mb-3 d-flex align-items-center gap-1.5 fw-normal">
                        <Building size={16} /> {item.institution}
                      </h4>

                      {item.description && (
                        <p className="text-muted small mb-0 d-flex align-items-start gap-2">
                          <BookOpen size={16} className="text-primary flex-shrink-0 mt-1" />
                          <span>{item.description}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};
