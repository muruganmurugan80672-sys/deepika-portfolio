import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SectionHeading } from '../components/SectionHeading';
import { SkillGroup } from '../components/SkillGroup';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { Skill } from '../types';
import { getSkills } from '../services/api';

export const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkillsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (err: any) {
      setError('Could not fetch skills from API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="section-padding">
      <Container>
        <SectionHeading
          subtitle="TECHNICAL SKILLS"
          title="Technologies & tools I work with."
          description="A structured breakdown of my technical stack across frontend, backend, databases, languages, and developer workflows."
        />

        {loading ? (
          <LoadingState message="Fetching technical skills..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchSkillsData} />
        ) : (
          <Row className="g-4">
            {categories.map((category) => {
              const categorySkills = skills.filter((s) => s.category === category);
              return (
                <Col key={category} md={6} lg={4}>
                  <SkillGroup category={category} skills={categorySkills} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </section>
  );
};
