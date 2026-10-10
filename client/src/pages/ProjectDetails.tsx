import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { ArrowLeft, Github, ExternalLink, Calendar, Star, Layers } from 'lucide-react';
import { Project } from '../types';
import { getProjectById } from '../services/api';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { Button } from '../components/Button';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getProjectById(id);
      if (data) {
        setProject(data);
      } else {
        setError('Project not found.');
      }
    } catch (err: any) {
      setError('Error retrieving project details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (loading) return <Container className="py-5"><LoadingState message="Fetching project details..." /></Container>;
  if (error || !project) return <Container className="py-5"><ErrorState message={error || 'Project not found.'} /></Container>;

  return (
    <section className="section-padding">
      <Container>
        <div className="mb-4">
          <Link to="/#projects" className="text-muted small d-inline-flex align-items-center gap-1">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>

        <Row className="gy-4">
          <Col lg={8}>
            <div className="custom-card p-4 mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge-custom badge-accent">{project.category}</span>
                {project.featured && (
                  <span className="badge-custom badge-accent d-flex align-items-center gap-1">
                    <Star size={12} /> Featured
                  </span>
                )}
              </div>

              <h1 className="h2 fw-bold text-main mb-3">{project.title}</h1>

              {project.imageUrl && (
                <div className="rounded overflow-hidden mb-4" style={{ maxHeight: '400px' }}>
                  <img src={project.imageUrl} alt={project.title} className="w-100 h-100 object-fit-cover" />
                </div>
              )}

              <h3 className="h6 fw-bold text-primary text-uppercase mb-2">Overview</h3>
              <p className="text-muted lead mb-4" style={{ fontSize: '1.05rem' }}>
                {project.description}
              </p>

              {project.longDescription && (
                <>
                  <h3 className="h6 fw-bold text-primary text-uppercase mb-2">Detailed Specification</h3>
                  <p className="text-muted mb-4">{project.longDescription}</p>
                </>
              )}

              <h3 className="h6 fw-bold text-primary text-uppercase mb-3">Technologies Employed</h3>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="badge-custom p-2">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className="custom-card p-4 position-sticky" style={{ top: '100px' }}>
              <h3 className="h6 fw-bold text-main mb-3">Project Metadata</h3>

              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-center gap-2 text-muted small">
                  <Layers size={16} className="text-primary" />
                  <span>Category: <strong className="text-main">{project.category}</strong></span>
                </div>
                <div className="d-flex align-items-center gap-2 text-muted small">
                  <Calendar size={16} className="text-primary" />
                  <span>Added: <strong className="text-main">{new Date(project.createdAt).toLocaleDateString()}</strong></span>
                </div>
              </div>

              <div className="d-grid gap-2">
                {project.githubUrl && (
                  <Button variant="primary" icon={<Github size={18} />} href={project.githubUrl} target="_blank">
                    View Repository
                  </Button>
                )}
                {project.liveDemoUrl && (
                  <Button variant="secondary" icon={<ExternalLink size={18} />} href={project.liveDemoUrl} target="_blank">
                    Live Preview
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
