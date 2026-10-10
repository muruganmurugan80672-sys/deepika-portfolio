import React from 'react';

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  centered = false,
}) => {
  return (
    <div className={`mb-5 ${centered ? 'text-center' : ''}`}>
      <span className="section-subtitle">{subtitle}</span>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className={`lead mb-0 ${centered ? 'mx-auto' : ''}`} style={{ maxWidth: centered ? '650px' : '100%', color: 'var(--text-muted)' }}>
          {description}
        </p>
      )}
    </div>
  );
};
