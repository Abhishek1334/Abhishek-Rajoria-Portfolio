'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript,
  SiNodedotjs, SiExpress, SiJsonwebtokens, SiMongodb,
  SiPostgresql, SiGit, SiGithub, SiDocker, SiVercel, SiVite
} from 'react-icons/si';
import {
  Globe, Database, Component, Wand2, Smartphone, Rocket,
  Leaf, Layers, Boxes, CreditCard, FlaskConical, TestTube, Lock
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: string[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const SkillsConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1400, height: 800 });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [draggedSkill, setDraggedSkill] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileCategory, setMobileCategory] = useState('frontend');

  // Add a debug panel (only in dev mode)
  const isDev = import.meta.env?.MODE === 'development';

  // Skills data
  const allSkills: Omit<Skill, 'x' | 'y' | 'vx' | 'vy' | 'connections'>[] = useMemo(() => [
    { id: 'typescript', name: 'TypeScript', level: 9, category: 'frontend', icon: SiTypescript },
    { id: 'javascript', name: 'JavaScript', level: 9, category: 'frontend', icon: SiJavascript },
    { id: 'nextjs', name: 'Next.js', level: 8, category: 'frontend', icon: SiNextdotjs },
    { id: 'react', name: 'React', level: 9, category: 'frontend', icon: SiReact },
    { id: 'vite', name: 'Vite', level: 8, category: 'frontend', icon: SiVite },
    { id: 'tailwind', name: 'Tailwind CSS', level: 9, category: 'frontend', icon: SiTailwindcss },
    { id: 'shadcn', name: 'shadcn/ui', level: 8, category: 'frontend', icon: Component },
    { id: 'framer', name: 'Framer Motion', level: 8, category: 'frontend', icon: Wand2 },
    { id: 'reactnative', name: 'React Native', level: 7, category: 'frontend', icon: Smartphone },
    { id: 'expo', name: 'Expo', level: 7, category: 'frontend', icon: Rocket },

    { id: 'nodejs', name: 'Node.js', level: 8, category: 'backend', icon: SiNodedotjs },
    { id: 'express', name: 'Express.js', level: 8, category: 'backend', icon: SiExpress },
    { id: 'restapi', name: 'REST API', level: 8, category: 'backend', icon: Globe },
    { id: 'jwt', name: 'JWT', level: 8, category: 'backend', icon: SiJsonwebtokens },
    { id: 'bcrypt', name: 'Bcrypt.js', level: 7, category: 'backend', icon: Lock },

    { id: 'postgresql', name: 'PostgreSQL', level: 7, category: 'database', icon: SiPostgresql },
    { id: 'mongodb', name: 'MongoDB', level: 8, category: 'database', icon: SiMongodb },
    { id: 'mongoose', name: 'Mongoose', level: 8, category: 'database', icon: Leaf },
    { id: 'mysql', name: 'MySQL', level: 6, category: 'database', icon: Database },

    { id: 'git', name: 'Git', level: 8, category: 'tools', icon: SiGit },
    { id: 'github', name: 'GitHub', level: 8, category: 'tools', icon: SiGithub },
    { id: 'vercel', name: 'Vercel', level: 8, category: 'tools', icon: SiVercel },
    { id: 'docker', name: 'Docker', level: 6, category: 'tools', icon: SiDocker },
    { id: 'tanstack', name: 'TanStack Query', level: 8, category: 'tools', icon: Layers },
    { id: 'zustand', name: 'Zustand', level: 8, category: 'tools', icon: Boxes },
    { id: 'stripe', name: 'Stripe', level: 7, category: 'tools', icon: CreditCard },
    { id: 'vitest', name: 'Vitest', level: 7, category: 'tools', icon: FlaskConical },
    { id: 'playwright', name: 'Playwright', level: 7, category: 'tools', icon: TestTube },
  ], []);

  const initialSkills: Skill[] = useMemo(() => [
    { id: 'typescript', name: 'TypeScript', level: 9, category: 'frontend', icon: SiTypescript, x: 150, y: 420, vx: 0, vy: 0, connections: ['javascript', 'react', 'nodejs'] },
    { id: 'javascript', name: 'JavaScript', level: 9, category: 'frontend', icon: SiJavascript, x: 290, y: 440, vx: 0, vy: 0, connections: ['react', 'nodejs', 'typescript'] },
    { id: 'nextjs', name: 'Next.js', level: 8, category: 'frontend', icon: SiNextdotjs, x: 350, y: 200, vx: 0, vy: 0, connections: ['react', 'typescript', 'vercel'] },
    { id: 'react', name: 'React', level: 9, category: 'frontend', icon: SiReact, x: 250, y: 300, vx: 0, vy: 0, connections: ['javascript', 'typescript', 'nextjs', 'vite', 'tailwind'] },
    { id: 'vite', name: 'Vite', level: 8, category: 'frontend', icon: SiVite, x: 130, y: 320, vx: 0, vy: 0, connections: ['react', 'vercel'] },
    { id: 'tailwind', name: 'Tailwind', level: 9, category: 'frontend', icon: SiTailwindcss, x: 180, y: 210, vx: 0, vy: 0, connections: ['react', 'shadcn'] },
    { id: 'shadcn', name: 'shadcn/ui', level: 8, category: 'frontend', icon: Component, x: 380, y: 330, vx: 0, vy: 0, connections: ['tailwind', 'framer'] },
    { id: 'framer', name: 'Framer Motion', level: 8, category: 'frontend', icon: Wand2, x: 320, y: 560, vx: 0, vy: 0, connections: ['react', 'shadcn'] },
    { id: 'reactnative', name: 'React Native', level: 7, category: 'frontend', icon: Smartphone, x: 200, y: 560, vx: 0, vy: 0, connections: ['react', 'expo'] },
    { id: 'expo', name: 'Expo', level: 7, category: 'frontend', icon: Rocket, x: 410, y: 470, vx: 0, vy: 0, connections: ['reactnative', 'vercel'] },

    { id: 'nodejs', name: 'Node.js', level: 8, category: 'backend', icon: SiNodedotjs, x: 700, y: 300, vx: 0, vy: 0, connections: ['javascript', 'express', 'mongodb', 'restapi'] },
    { id: 'express', name: 'Express.js', level: 8, category: 'backend', icon: SiExpress, x: 850, y: 250, vx: 0, vy: 0, connections: ['nodejs', 'jwt', 'restapi', 'bcrypt'] },
    { id: 'restapi', name: 'REST API', level: 8, category: 'backend', icon: Globe, x: 800, y: 400, vx: 0, vy: 0, connections: ['nodejs', 'express'] },
    { id: 'jwt', name: 'JWT', level: 8, category: 'backend', icon: SiJsonwebtokens, x: 700, y: 460, vx: 0, vy: 0, connections: ['express', 'bcrypt'] },
    { id: 'bcrypt', name: 'Bcrypt.js', level: 7, category: 'backend', icon: Lock, x: 880, y: 470, vx: 0, vy: 0, connections: ['jwt', 'express'] },

    { id: 'postgresql', name: 'PostgreSQL', level: 7, category: 'database', icon: SiPostgresql, x: 1120, y: 210, vx: 0, vy: 0, connections: ['mysql'] },
    { id: 'mongodb', name: 'MongoDB', level: 8, category: 'database', icon: SiMongodb, x: 1000, y: 300, vx: 0, vy: 0, connections: ['nodejs', 'mongoose'] },
    { id: 'mongoose', name: 'Mongoose', level: 8, category: 'database', icon: Leaf, x: 1180, y: 330, vx: 0, vy: 0, connections: ['mongodb'] },
    { id: 'mysql', name: 'MySQL', level: 6, category: 'database', icon: Database, x: 1020, y: 150, vx: 0, vy: 0, connections: ['postgresql'] },

    { id: 'git', name: 'Git', level: 8, category: 'tools', icon: SiGit, x: 450, y: 620, vx: 0, vy: 0, connections: ['github', 'vercel'] },
    { id: 'github', name: 'GitHub', level: 8, category: 'tools', icon: SiGithub, x: 600, y: 660, vx: 0, vy: 0, connections: ['git', 'vercel'] },
    { id: 'vercel', name: 'Vercel', level: 8, category: 'tools', icon: SiVercel, x: 760, y: 650, vx: 0, vy: 0, connections: ['github', 'nextjs', 'vite'] },
    { id: 'docker', name: 'Docker', level: 6, category: 'tools', icon: SiDocker, x: 900, y: 600, vx: 0, vy: 0, connections: ['nodejs'] },
    { id: 'tanstack', name: 'TanStack Query', level: 8, category: 'tools', icon: Layers, x: 1050, y: 560, vx: 0, vy: 0, connections: ['react', 'restapi'] },
    { id: 'zustand', name: 'Zustand', level: 8, category: 'tools', icon: Boxes, x: 520, y: 540, vx: 0, vy: 0, connections: ['react'] },
    { id: 'stripe', name: 'Stripe', level: 7, category: 'tools', icon: CreditCard, x: 1180, y: 620, vx: 0, vy: 0, connections: ['express'] },
    { id: 'vitest', name: 'Vitest', level: 7, category: 'tools', icon: FlaskConical, x: 1080, y: 690, vx: 0, vy: 0, connections: ['playwright'] },
    { id: 'playwright', name: 'Playwright', level: 7, category: 'tools', icon: TestTube, x: 950, y: 690, vx: 0, vy: 0, connections: ['vitest'] },
  ], []);

  const categories = useMemo(() => ({
    frontend: { name: 'Frontend', color: '#06B6D4', count: initialSkills.filter(s => s.category === 'frontend').length },
    backend: { name: 'Backend', color: '#8B5CF6', count: initialSkills.filter(s => s.category === 'backend').length },
    database: { name: 'Database', color: '#10B981', count: initialSkills.filter(s => s.category === 'database').length },
    tools: { name: 'Tools', color: '#F59E0B', count: initialSkills.filter(s => s.category === 'tools').length },
  }), [initialSkills]);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSkills(mobile
        ? allSkills.map(skill => ({ ...skill, x: 0, y: 0, vx: 0, vy: 0, connections: [] }))
        : initialSkills
      );
    };
    checkMobile();
    const resizeHandler = () => {
      const win = window as Window & { resizeTimeout?: number };
      if (win.resizeTimeout) clearTimeout(win.resizeTimeout);
      win.resizeTimeout = window.setTimeout(checkMobile, 100);
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      const win = window as Window & { resizeTimeout?: number };
      if (win.resizeTimeout) clearTimeout(win.resizeTimeout);
    };
  }, [allSkills, initialSkills]);

  const createParticle = useCallback((x: number, y: number, color: string) => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 40,
      maxLife: 40,
      color,
    };
  }, []);

  const handleSkillClick = useCallback((skill: Skill) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newParticles = Array.from({ length: 8 }, () => 
      createParticle(skill.x, skill.y, categories[skill.category].color)
    );
    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, createParticle, categories]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
      const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent, skill: Skill) => {
    e.preventDefault();
    setDraggedSkill(skill.id);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - skill.x,
        y: e.clientY - rect.top - skill.y
      });
    }
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDraggedSkill(null);
    };
    
    const handleGlobalTouchEnd = () => {
      setDraggedSkill(null);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, []);

  // Animation loop for desktop constellation
  useEffect(() => {
    if (isMobile) return;

    const animate = (currentTime: number) => {
      if (!canvasRef.current || !containerRef.current) return;
      
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

      const deltaTime = currentTime - lastFrameTime.current;
      lastFrameTime.current = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prev => {
        const updated = prev
          .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
            life: particle.life - 1
          }))
          .filter(particle => particle.life > 0);

        updated.forEach(particle => {
          const alpha = particle.life / particle.maxLife;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        return updated;
      });

      const filteredSkills = selectedCategory 
        ? skills.filter(skill => skill.category === selectedCategory)
        : skills;

      filteredSkills.forEach(skill => {
        skill.connections.forEach(connectionId => {
            const connectedSkill = skills.find(s => s.id === connectionId);
          if (connectedSkill && 
              (!selectedCategory || connectedSkill.category === selectedCategory)) {
            const dx = connectedSkill.x - skill.x;
            const dy = connectedSkill.y - skill.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
              const alpha = Math.max(0, 1 - distance / 200);
              ctx.save();
              ctx.globalAlpha = alpha * 0.3;
              ctx.strokeStyle = categories[skill.category].color;
              ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(skill.x, skill.y);
            ctx.lineTo(connectedSkill.x, connectedSkill.y);
            ctx.stroke();
              ctx.restore();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, skills, selectedCategory, categories, particles]);

  const filteredSkills = useMemo(() => {
    return selectedCategory 
      ? skills.filter(skill => skill.category === selectedCategory)
      : skills;
  }, [skills, selectedCategory]);

  // --- Mobile Section Tabs ---
  const mobileCategories = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'database', label: 'Database' },
    { key: 'tools', label: 'Tools' },
  ];

  // --- Mobile Skills Grid with Tabs ---
  const MobileSkillsGrid = () => {
    const groupedSkills = useMemo(() => {
      const groups: Record<string, Skill[]> = {
        frontend: [],
        backend: [],
        database: [],
        tools: []
      };
      skills.forEach(skill => {
        groups[skill.category].push(skill);
      });
      return groups;
    }, []);

    return (
      <div className="w-full space-y-6">
        <motion.div 
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold text-gradient-primary mb-2">Tech Arsenal</h2>
          <p className="text-foreground-muted text-xs">My technical skills organized by category</p>
        </motion.div>
        <div className="flex justify-center gap-2 mb-2">
          {mobileCategories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setMobileCategory(cat.key)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-200 ${
                mobileCategory === cat.key
                  ? 'bg-primary text-primary-foreground border-primary shadow'
                  : 'bg-background-secondary text-foreground-muted border-border hover:bg-muted hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <motion.div 
          className="grid grid-cols-3 gap-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {groupedSkills[mobileCategory].map((skill, skillIndex) => (
            <motion.div
              key={skill.id}
              className="group relative bg-muted rounded-lg p-2 border border-border transition-all duration-200"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: skillIndex * 0.03 }}
              viewport={{ once: true }}
              style={{ boxShadow: `0 2px 8px ${categories[skill.category].color}15` }}
            >
              <div className="flex items-center justify-center mb-1">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${categories[skill.category].color}FF, ${categories[skill.category].color}AA)`,
                    boxShadow: `0 0 10px ${categories[skill.category].color}40`
                  }}
                >
                  <skill.icon className="w-4 h-4 text-foreground" />
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-xs text-foreground mb-1">{skill.name}</h4>
                <div className="flex items-center justify-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full transition-all duration-200"
                        style={{
                          backgroundColor: i < skill.level ? categories[skill.category].color : 'rgba(0,0,0,0.08)',
                          boxShadow: i < skill.level ? `0 0 2px ${categories[skill.category].color}60` : 'none'
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-foreground-muted font-medium ml-1">{skill.level}/10</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  };

  // --- Tab color logic ---
  const getTabClass = (active: boolean) =>
    active
      ? 'bg-primary/10 text-primary border-primary border-2'
      : 'bg-background-secondary text-foreground-muted border-border hover:bg-muted hover:text-foreground';

  // --- Node label style ---
  const nodeLabelClass =
    'absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded bg-background-secondary text-foreground text-xs shadow border border-border z-10';

  if (isMobile) {
    return (
      <section className="py-6 relative overflow-hidden">
        <div className="container mx-auto px-2">
          <MobileSkillsGrid />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
            Interactive Tech Universe
          </h2>
          <p className="text-foreground-muted max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Navigate through my technical constellation. Each star represents a technology I've mastered. 
            Hover to reveal connections, click for cosmic effects, and drag to explore the universe.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 text-sm rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
              selectedCategory === null 
                ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-500/25' 
                : 'bg-white/5 border-white/20 text-foreground-muted hover:bg-white/10 hover:border-white/30'
            }`}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            All ({skills.length})
          </motion.button>
          
          {Object.entries(categories).map(([key, category]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
              className={`px-6 py-3 text-sm rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                selectedCategory === key 
                  ? 'border-2 shadow-lg text-white' 
                  : 'bg-white/5 border-white/20 text-foreground-muted hover:bg-white/10 hover:border-white/30'
              }`}
              style={{
                backgroundColor: selectedCategory === key ? category.color + '30' : undefined,
                borderColor: selectedCategory === key ? category.color : undefined,
                color: selectedCategory === key ? category.color : undefined,
                boxShadow: selectedCategory === key ? `0 0 25px ${category.color}40` : undefined,
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              {`${category.name} (${category.count})`}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          ref={containerRef}
          className="relative w-full mx-auto rounded-2xl overflow-hidden h-[700px] md:h-[800px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.03) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%)',
            boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.3)'
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          onMouseMove={handleMouseMove}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
          
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className="absolute cursor-pointer group select-none"
                style={{ 
                  left: skill.x - 35, 
                  top: skill.y - 35,
                  zIndex: hoveredSkill === skill.id ? 50 : 10,
                  willChange: 'transform'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 25
                }}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                onMouseDown={(e) => handleMouseDown(e, skill)}
                onClick={() => handleSkillClick(skill)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div 
                  className="absolute inset-0 rounded-full opacity-40 animate-pulse"
                  style={{ 
                    background: `radial-gradient(circle, ${categories[skill.category].color}40, transparent)`,
                    width: '70px',
                    height: '70px',
                    filter: 'blur(8px)',
                    animationDuration: '3s'
                  }}
                />

                <div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-200 border-2 backdrop-blur-sm"
                  style={{ 
                    background: `radial-gradient(circle at 30% 30%, ${categories[skill.category].color}FF, ${categories[skill.category].color}AA)`,
                    borderColor: hoveredSkill === skill.id ? '#FFFFFF' : categories[skill.category].color + 'AA',
                    boxShadow: hoveredSkill === skill.id 
                      ? `0 0 25px ${categories[skill.category].color}AA, inset 0 0 15px rgba(255,255,255,0.3)`
                      : `0 0 15px ${categories[skill.category].color}60, inset 0 0 10px rgba(255,255,255,0.2)`,
                    color: '#fff',
                    textShadow: '0 0 8px rgba(0,0,0,0.8)',
                    cursor: draggedSkill === skill.id ? 'grabbing' : 'grab'
                  }}
                >
                  <span className="w-7 h-7 mb-1 flex items-center justify-center" style={{ color: '#fff' }}>
                    <skill.icon className="w-7 h-7" />
                  </span>
                </div>

                <div className="absolute inset-0 w-14 h-14">
                  {[0, 90, 180, 270].map((angle, i) => (
                    <div
                      key={i}
                      className="absolute bg-white transition-all duration-200"
                      style={{
                        width: '2px',
                        height: hoveredSkill === skill.id ? '16px' : '10px',
                        left: '50%',
                        top: '50%',
                        transformOrigin: '50% 50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${hoveredSkill === skill.id ? '28px' : '22px'})`,
                        filter: `drop-shadow(0 0 4px ${categories[skill.category].color})`,
                        opacity: hoveredSkill === skill.id ? 0.8 : 0.5,
                        borderRadius: '1px'
                      }}
                    />
                  ))}
                </div>

                <svg className="absolute inset-0 w-14 h-14" style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="28"
                    cy="28"
                    r="26"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="26"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeDasharray={`${skill.level * 16.34} 163.4`}
                    className="transition-all duration-500"
                    style={{
                      filter: `drop-shadow(0 0 4px ${categories[skill.category].color})`
                    }}
                  />
                </svg>

                <div 
                  className={nodeLabelClass}
                >
                  {skill.name}
                </div>

                {hoveredSkill === skill.id && !draggedSkill && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 backdrop-blur-md rounded-lg border pointer-events-none"
                    style={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      borderColor: categories[skill.category].color + '40',
                      boxShadow: `0 10px 25px rgba(0,0,0,0.3), 0 0 15px ${categories[skill.category].color}30`
                    }}
                  >
                    <div className="p-3 text-center">
                      <p className="font-semibold text-sm mb-2 text-white">
                        {skill.name}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full transition-all duration-200"
                              style={{
                                backgroundColor: i < skill.level 
                                  ? categories[skill.category].color 
                                  : 'rgba(255,255,255,0.2)',
                                boxShadow: i < skill.level 
                                  ? `0 0 6px ${categories[skill.category].color}80` 
                                  : 'none'
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-white font-bold ml-1">
                          {skill.level}/10
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {Object.entries(categories).map(([key, category]) => (
            <motion.div 
              key={key} 
              className="text-center bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 min-w-[120px]"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255,255,255,0.1)',
                boxShadow: `0 20px 40px ${category.color}20`
              }}
              style={{
                boxShadow: `0 0 30px ${category.color}15, inset 0 0 20px rgba(255,255,255,0.05)`
              }}
            >
              <div 
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ 
                  color: category.color,
                  textShadow: `0 0 20px ${category.color}60`
                }}
              >
                {category.count}
              </div>
              <div className="text-foreground-muted text-sm font-medium tracking-wider">
                {category.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsConstellation;