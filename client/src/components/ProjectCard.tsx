import React from 'react';
import { Github, ExternalLink, ArrowRight, Star, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="custom-card h-100 d-flex flex-column">
      {/* Custom Mockup Window Header */}
      <div className="project-preview-window mb-3">
        <div className="project-preview-bar">
          <span className="preview-dot bg-danger" />
          <span className="preview-dot bg-warning" />
          <span className="preview-dot bg-success" />
          <span className="ms-auto small font-monospace text-subtle" style={{ fontSize: '0.7rem' }}>
            {project.category}
          </span>
        </div>

        {project.imageUrl && (
          <div className="overflow-hidden" style={{ height: '220px', backgroundColor: '#060A14' }}>
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-100 h-100 object-fit-cover transition-transform"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="badge-custom badge-accent">{project.category}</span>
        {project.featured && (
          <span className="badge-custom badge-accent d-flex align-items-center gap-1 text-warning">
            <Star size={12} fill="currentColor" /> Featured
          </span>
        )}
      </div>

      <h3 className="h5 fw-bold mb-2 text-main">{project.title}</h3>
      <p className="text-muted small mb-4 flex-grow-1" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
        {project.description}
      </p>

      {/* Technology pills */}
      <div className="d-flex flex-wrap gap-1.5 mb-4">
        {project.technologies.map((tech, idx) => (
          <span key={idx} className="badge-custom">
            {tech}
          </span>
        ))}
      </div>

      {/* Action Footer */}
      <div className="d-flex align-items-center justify-content-between pt-3 border-top border-secondary border-opacity-25 mt-auto">
        <Link to={`/projects/${project._id}`} className="text-primary fw-semibold small d-inline-flex align-items-center gap-1">
          Explore Details <ArrowRight size={14} />
        </Link>

        <div className="d-flex align-items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-toggle-btn"
              style={{ width: '34px', height: '34px' }}
              title="GitHub Repository"
            >
              <Github size={16} />
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-toggle-btn"
              style={{ width: '34px', height: '34px' }}
              title="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
