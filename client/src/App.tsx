import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/components.css';

import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { ProjectsPage } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { AboutPage } from './pages/About';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
