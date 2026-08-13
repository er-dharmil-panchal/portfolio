import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  angle: number;
  speed: number;
}

interface EnergyPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface MouseTrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    let pulses: EnergyPulse[] = [];
    let trail: MouseTrailPoint[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Stretched cursor trail
      trail.push({ x: e.clientX, y: e.clientY, alpha: 0.6 });
      if (trail.length > 25) trail.shift();
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = Math.abs(currentScroll - lastScrollY);
      lastScrollY = currentScroll;
    };

    const handleClick = (e: MouseEvent) => {
      pulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 280,
        alpha: 0.8,
      });

      // Scatter nearby nodes gently
      for (const p of particles) {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          const force = (1 - dist / 220) * 4;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    // Particle Setup (Fluid & Serene)
    const particleCount = Math.min(Math.floor((width * height) / 12000), 95);
    let particles: Particle[] = [];

    const baseColors = [
      { r: 32, g: 200, b: 191 },  // Teal
      { r: 248, g: 224, b: 124 }, // Gold
      { r: 99, g: 102, b: 241 },  // Indigo
    ];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const colorObj = baseColors[Math.floor(Math.random() * baseColors.length)];
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: Math.random() * 2.2 + 0.8,
          alpha: Math.random() * 0.4 + 0.15,
          color: `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, `,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.007 + 0.002,
        });
      }
    };

    initParticles();

    // Main Render Loop
    const render = () => {
      // Smooth cursor lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      scrollVelocity *= 0.93;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Stretched Cursor Path Line Trail (First Version)
      if (trail.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);
        for (let t = 1; t < trail.length; t++) {
          const xc = (trail[t].x + trail[t - 1].x) / 2;
          const yc = (trail[t].y + trail[t - 1].y) / 2;
          ctx.quadraticCurveTo(trail[t - 1].x, trail[t - 1].y, xc, yc);
          trail[t].alpha *= 0.93;
        }
        ctx.strokeStyle = `rgba(32, 200, 191, 0.18)`;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
      }

      // 2. Render Click Energy Shockwave Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.radius += (pulse.maxRadius - pulse.radius) * 0.07 + 2;
        pulse.alpha *= 0.94;

        if (pulse.alpha > 0.01) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(32, 200, 191, ${pulse.alpha * 0.75})`;
          ctx.lineWidth = Math.max(1, 3 * (1 - pulse.radius / pulse.maxRadius));
          ctx.stroke();

          // Radial glow fill
          const aura = ctx.createRadialGradient(
            pulse.x, pulse.y, Math.max(0, pulse.radius - 25),
            pulse.x, pulse.y, pulse.radius
          );
          aura.addColorStop(0, 'rgba(32, 200, 191, 0)');
          aura.addColorStop(1, `rgba(248, 224, 124, ${pulse.alpha * 0.12})`);
          ctx.fillStyle = aura;
          ctx.fill();
          ctx.restore();
        } else {
          pulses.splice(p, 1);
        }
      }

      // 3. Update & Draw Fluid Constellation Mesh
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Fluid drift motion
        p1.angle += p1.speed + scrollVelocity * 0.0005;
        p1.x += p1.vx + Math.cos(p1.angle) * 0.22;
        p1.y += p1.vy + Math.sin(p1.angle) * 0.22;

        // Screen boundary wrap
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Gentle orbital attraction toward cursor
        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const gravityRadius = 200;

        if (dist < gravityRadius) {
          const force = (1 - dist / gravityRadius);
          const angle = Math.atan2(dy, dx);
          
          p1.x += Math.cos(angle + Math.PI / 2) * force * 0.7;
          p1.y += Math.sin(angle + Math.PI / 2) * force * 0.7;
          p1.x += Math.cos(angle) * force * 0.3;
          p1.y += Math.sin(angle) * force * 0.3;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.fill();

        // Connect nearby nodes with glowing constellation lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const lx = p1.x - p2.x;
          const ly = p1.y - p2.y;
          const ldist = Math.sqrt(lx * lx + ly * ly);

          if (ldist < 140) {
            const lineAlpha = (1 - ldist / 140) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(32, 200, 191, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // 4. Cursor Spotlight Core Glow
      if (mouse.x > 0 && mouse.y > 0) {
        const spotlight = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 270
        );
        spotlight.addColorStop(0, 'rgba(32, 200, 191, 0.08)');
        spotlight.addColorStop(0.4, 'rgba(248, 224, 124, 0.03)');
        spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 270, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-canvas"
      aria-hidden="true"
    />
  );
}
