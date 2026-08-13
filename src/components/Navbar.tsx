import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'skills', 'projects', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="content-wrapper nav-container">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          {personalInfo.shortName}<span>.</span>
        </a>

        <nav className="nav-links">
          <a
            href="#skills"
            className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '#skills')}
          >
            Skills
          </a>
          <a
            href="#projects"
            className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '#projects')}
          >
            Projects
          </a>
          <a
            href="#education"
            className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '#education')}
          >
            Education
          </a>
          <a
            href="#contact"
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <a
            href={personalInfo.resumeUrl}
            className="btn-resume"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </a>

          <button
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a
          href="#skills"
          className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, '#skills')}
        >
          Skills
        </a>
        <a
          href="#projects"
          className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, '#projects')}
        >
          Projects
        </a>
        <a
          href="#education"
          className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, '#education')}
        >
          Education
        </a>
        <a
          href="#contact"
          className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Contact
        </a>
      </div>
    </header>
  );
}
