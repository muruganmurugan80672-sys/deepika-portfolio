import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { Project } from '../types';
import { getProjects } from '../services/api';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err: any) {
      setError('Could not fetch portfolio projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="projects" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Container>
        <SectionHeading
          subtitle="ENGINEERING PORTFOLIO"
          title="Featured Projects & Systems"
          description="A showcase of full-stack web applications, database architectures, system tools, and responsive interfaces."
        />

        {/* Category Filters */}
        <div className="d-flex justify-content-center mb-5">
          <div className="glass-panel p-1.5 rounded-pill d-inline-flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold border-0 transition-all ${
                  activeCategory === cat
                    ? 'btn-primary-custom shadow-sm'
                    : 'text-muted bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingState message="Fetching projects from database..." />
        ) : error ? (
          <ErrorState message={error} onRetry={loadProjects} />
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No projects found in this category.</p>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProjects.map((project) => (
              <Col key={project._id} md={6} lg={6}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};
