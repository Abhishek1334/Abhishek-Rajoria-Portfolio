import React, { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 70;
const MOBILE_RADIUS_MIN = 1.5;
const MOBILE_RADIUS_MAX = 4.5;
const DESKTOP_RADIUS_MIN = 2.5;
const DESKTOP_RADIUS_MAX = 7;
const REPULSION_RADIUS = 100;
const REPULSION_STRENGTH = 0.18;

// Only the brightest neon colors for dark mode
const NEON_COLORS = [
  'rgba(0,255,255,1)',   // Cyan
  'rgba(255,0,255,1)',  // Magenta
  'rgba(0,255,128,1)',  // Lime
  'rgba(255,255,0,1)',  // Yellow
  'rgba(0,128,255,1)',  // Blue
  'rgba(255,64,129,1)', // Pink
  'rgba(255,255,255,1)',// White
  'rgba(128,0,255,1)',  // Purple
];
const PASTEL_COLORS = [
  'rgba(255, 99, 132, 0.55)',   // Pink
  'rgba(54, 162, 235, 0.55)',  // Blue
  'rgba(255, 206, 86, 0.55)',  // Yellow
  'rgba(75, 192, 192, 0.55)',  // Teal
  'rgba(153, 102, 255, 0.55)', // Purple
  'rgba(255, 159, 64, 0.55)',  // Orange
  'rgba(255, 255, 255, 0.45)', // White
  'rgba(0, 0, 0, 0.18)',       // Black (for contrast)
];

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; r: number; color: string }[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();
  const themeRef = useRef<'dark' | 'light'>('light');

  // Theme detection
  useEffect(() => {
    const updateTheme = () => {
      themeRef.current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Use larger radii for desktop
    const isDesktop = window.innerWidth >= 768;
    const minR = isDesktop ? DESKTOP_RADIUS_MIN : MOBILE_RADIUS_MIN;
    const maxR = isDesktop ? DESKTOP_RADIUS_MAX : MOBILE_RADIUS_MAX;

    // Choose palette based on theme
    const isDark = document.documentElement.classList.contains('dark');
    const palette = isDark ? NEON_COLORS : PASTEL_COLORS;

    // Create particles with random radius and color
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: Math.random() * (maxR - minR) + minR,
      color: palette[Math.floor(Math.random() * palette.length)],
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = themeRef.current === 'dark';
      for (const p of particles.current) {
        // Repulsion from mouse
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (REPULSION_RADIUS - dist) * REPULSION_STRENGTH;
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }
        // Move
        p.x += p.vx;
        p.y += p.vy;
        // Friction
        p.vx *= 0.96;
        p.vy *= 0.96;
        // Wrap around edges
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = isDark ? '#fff' : 'rgba(0,0,0,0.18)';
        ctx.shadowBlur = isDark ? 32 : 8;
        ctx.globalAlpha = 1;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handle);
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX;
        mouse.current.y = e.touches[0].clientY;
      }
    });
    return () => {
      window.removeEventListener('mousemove', handle);
    };
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground; 