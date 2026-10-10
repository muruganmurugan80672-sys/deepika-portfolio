import React from 'react';
import {
  Code,
  Palette,
  FileCode,
  Atom,
  FileCheck,
  LayoutGrid,
  Server,
  Cpu,
  Network,
  FileText,
  Database,
  Layers,
  Table,
  HardDrive,
  Coffee,
  Terminal,
  GitBranch,
  Github,
  Code2,
  Package,
  Send,
} from 'lucide-react';
import { Skill } from '../types';

interface SkillGroupProps {
  category: string;
  skills: Skill[];
}

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code size={18} />,
  Palette: <Palette size={18} />,
  FileCode: <FileCode size={18} />,
  Atom: <Atom size={18} />,
  FileCheck: <FileCheck size={18} />,
  LayoutGrid: <LayoutGrid size={18} />,
  Server: <Server size={18} />,
  Cpu: <Cpu size={18} />,
  Network: <Network size={18} />,
  FileText: <FileText size={18} />,
  Database: <Database size={18} />,
  Layers: <Layers size={18} />,
  Table: <Table size={18} />,
  HardDrive: <HardDrive size={18} />,
  Coffee: <Coffee size={18} />,
  Terminal: <Terminal size={18} />,
  GitBranch: <GitBranch size={18} />,
  Github: <Github size={18} />,
  Code2: <Code2 size={18} />,
  Package: <Package size={18} />,
  Send: <Send size={18} />,
};

export const SkillGroup: React.FC<SkillGroupProps> = ({ category, skills }) => {
  return (
    <div className="custom-card h-100">
      <h3 className="h6 fw-bold text-uppercase text-primary mb-3 pb-2 border-bottom border-secondary border-opacity-25">
        {category}
      </h3>
      <div className="d-flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill._id || skill.name}
            className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            <span className="text-primary">{iconMap[skill.icon || 'Code'] || <Code size={18} />}</span>
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
