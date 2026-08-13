import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dharmilPhoto from '../assets/Dharmil-Panchal-Full-Stack-Developer-Ahmedabad.png';
import { personalInfo, socialLinks } from '../data/portfolioData';

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const yParallax = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const rotateParallax = useTransform(scrollYProgress, [0, 0.5], [0, 90]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    card.style.setProperty('--photo-mouse-x', `${x}px`);
    card.style.setProperty('--photo-mouse-y', `${y}px`);
  };

  const handleCardMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section className="hero" id="hero">
      <div className="content-wrapper">
        <div className="hero-grid">
          {/* Left Column: Text & CTAs */}
          <div className="hero-content">
            <motion.div
              className="hero-overline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {personalInfo.headline}
            </motion.div>

            <motion.h1
              className="heading-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Hi, I'm{' '}
              <em className="text-gradient">{personalInfo.name}</em>
              <span className="hero-icon-badge">◈</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {personalInfo.description}
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <a href="#projects" className="btn-primary" onClick={(e) => handleNavClick(e, '#projects')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                View Projects
              </a>
              <a href="#contact" className="btn-outline" onClick={(e) => handleNavClick(e, '#contact')}>
                Contact Me
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </motion.div>

            <motion.div
              className="hero-social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link" title="Dharmil Panchal's Official GitHub Profile">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="Dharmil Panchal's Official LinkedIn Profile">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a href={`mailto:${socialLinks.email}`} className="social-link" title="Contact Dharmil Panchal via Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                Email
              </a>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Interactive Photo Section with SEO Keyword Alt */}
          <motion.div
            className="hero-photo-wrapper"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div
              ref={cardRef}
              className="hero-photo-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="photo-card-glow" />

              <div className="photo-frame">
                <img
                  src={dharmilPhoto}
                  alt="Dharmil Panchal — Full-Stack & Python Developer in Ahmedabad, Gujarat, India"
                  title="Dharmil Panchal — Official Profile Photo"
                  loading="eager"
                  decoding="async"
                  width="400"
                  height="500"
                  className="photo-img"
                />

                <div className="photo-scanline" />
                <div className="photo-badge-status">
                  <span className="status-dot" />
                  {personalInfo.status}
                </div>
              </div>

              {/* Floating Interactive Tech Pills */}
              <motion.div
                className="floating-pill pill-top-left"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                🐍 Python & Django
              </motion.div>

              <motion.div
                className="floating-pill pill-top-right"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                ⚡ React & Node.js
              </motion.div>

              <motion.div
                className="floating-pill pill-bottom-left"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                🎓 CPI: {personalInfo.cpi}
              </motion.div>

              <motion.div
                className="floating-pill pill-bottom-right"
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                📍 Ahmedabad, India
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="hero-decorations" aria-hidden="true">
          <motion.div className="hero-shape hero-shape-1" style={{ y: yParallax }} />
          <motion.div className="hero-shape hero-shape-2" style={{ y: yParallax, rotate: rotateParallax }} />
        </div>
      </div>
    </section>
  );
}
