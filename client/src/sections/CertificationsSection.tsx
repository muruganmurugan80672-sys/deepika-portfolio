import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SectionHeading } from '../components/SectionHeading';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';
import { Certification } from '../types';
import { getCertifications } from '../services/api';
import { LoadingState } from '../components/LoadingState';

export const CertificationsSection: React.FC = () => {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await getCertifications();
        setCerts(data);
      } catch (err) {
        console.error('Failed to load certifications');
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  return (
    <section id="certifications" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Container>
        <SectionHeading
          subtitle="CONTINUOUS LEARNING"
          title="Certifications & Training"
          description="Courses and certifications verifying knowledge in full-stack web development and computer science."
        />

        {loading ? (
          <LoadingState message="Loading certifications..." />
        ) : certs.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">No certifications currently listed.</p>
          </div>
        ) : (
          <Row className="g-4">
            {certs.map((cert) => (
              <Col key={cert._id} md={6} lg={4}>
                <div className="custom-card h-100 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="p-2 rounded-3" style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--accent-primary)' }}>
                      <Award size={22} />
                    </div>
                    <span className="badge-custom">{cert.completionDate}</span>
                  </div>

                  <h3 className="h6 fw-bold text-main mb-2">{cert.title}</h3>
                  <p className="small text-muted mb-3 d-flex align-items-center gap-1">
                    <CheckCircle size={14} className="text-primary" /> {cert.issuer}
                  </p>

                  {cert.credentialUrl && (
                    <div className="mt-auto pt-3 border-top border-secondary border-opacity-25">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="small text-primary fw-semibold d-inline-flex align-items-center gap-1"
                      >
                        Verify Credential <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};
