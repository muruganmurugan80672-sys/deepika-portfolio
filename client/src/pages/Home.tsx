import React from 'react';
import { Hero } from '../sections/Hero';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { EducationSection } from '../sections/EducationSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { ContactSection } from '../sections/ContactSection';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
};
