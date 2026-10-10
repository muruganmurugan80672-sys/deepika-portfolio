import React, { useState, useEffect } from 'react';
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap';
import { Sun, Moon, Code, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/#hero' },
    { name: 'About', path: '/#about' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Education', path: '/#education' },
    { name: 'Certifications', path: '/#certifications' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleNavClick = (path: string) => {
    setExpanded(false);
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <BsNavbar
      expand="lg"
      sticky="top"
      expanded={expanded}
      className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="brand-logo">
          <Code className="text-primary" size={26} />
          DEEPIKA<span>.</span>
        </BsNavbar.Brand>

        <div className="d-flex align-items-center gap-2 d-lg-none">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle light or dark theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="theme-toggle-btn"
            onClick={() => setExpanded(!expanded)}
            aria-label="Toggle navigation menu"
          >
            {expanded ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-1">
            {navLinks.map((link) => (
              <Nav.Link
                key={link.name}
                as={Link}
                to={link.path}
                className={`nav-link-custom ${
                  location.pathname === '/' && location.hash === `#${link.path.split('#')[1]}`
                    ? 'active'
                    : ''
                }`}
                onClick={() => handleNavClick(link.path)}
              >
                {link.name}
              </Nav.Link>
            ))}
            <div className="d-none d-lg-block ms-3">
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};
