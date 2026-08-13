import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/portfolioData';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={sectionRef}>
      <div className="content-wrapper">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="heading-sm">What I Work With</div>
          <h2 className="heading-lg">Technical Skills</h2>
          <p className="section-desc">
            From REST API development and full-stack architecture to data 
            analytics and real-time web apps — here's my toolkit.
          </p>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="skill-category"
              variants={cardVariants}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  '--mouse-x',
                  `${e.clientX - rect.left}px`
                );
                e.currentTarget.style.setProperty(
                  '--mouse-y',
                  `${e.clientY - rect.top}px`
                );
              }}
            >
              <h3 className="skill-category-title">{category.title}</h3>
              <p className="skill-category-subtitle">{category.subtitle}</p>
              <motion.div
                className="skill-tags"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    variants={tagVariants}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
