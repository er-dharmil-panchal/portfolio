import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '../data/portfolioData';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const maxScroll = trackWidth - windowWidth + 96;
        setTranslateX(Math.max(0, maxScroll));
      }
    };

    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -translateX]);

  return (
    <section id="projects" className="projects-section-container">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="heading-sm">Featured Work</div>
          <h2 className="heading-lg">Projects</h2>
          <p className="section-desc">
            Real-world applications I've built — from full-stack platforms 
            to real-time trading simulators.
          </p>
          <div className="section-divider" />
        </div>
      </div>

      <div ref={containerRef} className="projects-scroll-space">
        <div className="projects-sticky-viewport">
          <motion.div
            ref={trackRef}
            className="projects-horizontal-track"
            style={{ x }}
          >
            {projects.map((project, index) => (
              <div key={project.title} className="horizontal-card-wrapper">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
