import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education } from '../data/portfolioData';

export default function Education() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="education" ref={sectionRef}>
      <div className="content-wrapper">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="heading-sm">Academic Background</div>
          <h2 className="heading-lg">Education</h2>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          className="education-card"
          initial={{ opacity: 0, y: 40, x: -20 }}
          animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="education-icon">🎓</div>
          <div className="education-info">
            <h3>{education.degree}</h3>
            <div className="education-institution">
              {education.institution}
            </div>
            <div className="education-details">
              <div className="education-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {education.period}
              </div>
              <div className="education-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {education.location}
              </div>
              <div className="education-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                {education.cpi}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
