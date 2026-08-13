import { useState, useEffect, useCallback } from 'react';
import { useMousePosition } from './hooks/useMousePosition';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import InteractiveBackground from './components/InteractiveBackground';
import CursorGlow from './components/CursorGlow';
import NoiseOverlay from './components/NoiseOverlay';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import MarqueeStrip from './components/MarqueeStrip';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const { position, isHovering } = useMousePosition();
  useSmoothScroll();

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <>
      {/* Dynamic interactive background layers */}
      <InteractiveBackground />
      <div className="bg-mesh" />
      <div className="bg-dot-grid" />
      <NoiseOverlay />

      {/* Interactive cursor spotlight & follower dot */}
      <CursorGlow x={position.x} y={position.y} isHovering={isHovering} />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main content */}
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Infinite running marquee strip */}
      <MarqueeStrip />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
