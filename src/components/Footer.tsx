import { socialLinks, personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="content-wrapper">
        <div className="footer-top">
          {/* Column 1: Brand & Role */}
          <div className="footer-brand">
            <a href="#hero" className="footer-logo" onClick={(e) => handleNavClick(e, '#hero')}>
              {personalInfo.shortName}<span className="logo-dot">.</span>
            </a>
            <p className="footer-tagline">
              {personalInfo.role}
            </p>
            <p className="footer-location">
              📍 {personalInfo.location}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-nav-col">
            <div className="footer-nav-title">Quick Links</div>
            <div className="footer-nav-links">
              <a href="#hero" className="footer-nav-link" onClick={(e) => handleNavClick(e, '#hero')}>Home</a>
              <a href="#skills" className="footer-nav-link" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a>
              <a href="#projects" className="footer-nav-link" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a>
              <a href="#education" className="footer-nav-link" onClick={(e) => handleNavClick(e, '#education')}>Education</a>
              <a href="#contact" className="footer-nav-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
            </div>
          </div>

          {/* Column 3: Social Links & Availability Status */}
          <div className="footer-social-col">
            <div className="footer-nav-title">Connect</div>
            <div className="footer-socials">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Dharmil Panchal's Official GitHub Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Dharmil Panchal's Official LinkedIn Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href={`mailto:${socialLinks.email}`} className="footer-social-link" title="Contact Dharmil Panchal via Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </a>
            </div>
            <div className="footer-status-pill">
              <span className="status-dot" /> {personalInfo.status}
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <p className="footer-built">Designed & Developed with Precision ◈ Ahmedabad, India</p>
        </div>
      </div>
    </footer>
  );
}
