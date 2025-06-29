'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, 
  SiHtml5, SiCss3, SiRedux, SiNodedotjs, SiExpress, 
  SiPython, SiFastapi, SiJsonwebtokens, SiMongodb, 
  SiPostgresql, SiSupabase, SiFirebase, SiGit, SiGithub, 
  SiDocker, SiVercel, SiGraphql, SiVite
} from 'react-icons/si';
import { Globe, Key, Code2, Database } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number; // 1-10
  category: 'frontend' | 'backend' | 'database' | 'tools';
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: string[];
  isDragging?: boolean;
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

  // Memoized skills data to prevent recreation
  const allSkills: Omit<Skill, 'x' | 'y' | 'vx' | 'vy' | 'connections'>[] = useMemo(() => [
    { id: 'react', name: 'React', level: 8, category: 'frontend', icon: SiReact },
    { id: 'nextjs', name: 'Next.js', level: 4, category: 'frontend', icon: SiNextdotjs },
    { id: 'typescript', name: 'TypeScript', level: 4, category: 'frontend', icon: SiTypescript },
    { id: 'tailwind', name: 'Tailwind CSS', level: 8, category: 'frontend', icon: SiTailwindcss },
    { id: 'javascript', name: 'JavaScript', level: 8, category: 'frontend', icon: SiJavascript },
    { id: 'html', name: 'HTML5', level: 9, category: 'frontend', icon: SiHtml5 },
    { id: 'css', name: 'CSS3', level: 9, category: 'frontend', icon: SiCss3 },
    { id: 'redux', name: 'Redux', level: 6, category: 'frontend', icon: SiRedux },
    { id: 'zustand', name: 'Zustand', level: 7, category: 'frontend', icon: Database },
    
    { id: 'nodejs', name: 'Node.js', level: 8, category: 'backend', icon: SiNodedotjs },
    { id: 'express', name: 'Express.js', level: 8, category: 'backend', icon: SiExpress },
    { id: 'python', name: 'Python', level: 4, category: 'backend', icon: SiPython },
    { id: 'fastapi', name: 'FastAPI', level: 2, category: 'backend', icon: SiFastapi },
    { id: 'jwt', name: 'JWT', level: 7, category: 'backend', icon: SiJsonwebtokens },
    { id: 'oauth', name: 'OAuth', level: 7, category: 'backend', icon: Key },
    { id: 'restapi', name: 'REST API', level: 8, category: 'backend', icon: Globe },
    { id: 'graphql', name: 'GraphQL', level: 5, category: 'backend', icon: SiGraphql },
    
    { id: 'mongodb', name: 'MongoDB', level: 7, category: 'database', icon: SiMongodb },
    { id: 'postgresql', name: 'PostgreSQL', level: 7, category: 'database', icon: SiPostgresql },
    { id: 'supabase', name: 'Supabase', level: 6, category: 'database', icon: SiSupabase },
    { id: 'firebase', name: 'Firebase', level: 6, category: 'database', icon: SiFirebase },
    
    { id: 'git', name: 'Git', level: 7, category: 'tools', icon: SiGit },
    { id: 'github', name: 'GitHub', level: 7, category: 'tools', icon: SiGithub },
    { id: 'docker', name: 'Docker', level: 5, category: 'tools', icon: SiDocker },
    { id: 'vscode', name: 'VS Code', level: 8, category: 'tools', icon: Code2 },
    { id: 'vercel', name: 'Vercel', level: 6, category: 'tools', icon: SiVercel },
  ], []);

  const initialSkills: Skill[] = useMemo(() => [
    // Frontend cluster (left side, well spaced)
    { id: 'react', name: 'React', level: 8, category: 'frontend', icon: SiReact, x: 250, y: 300, vx: 0, vy: 0, connections: ['javascript', 'typescript', 'nextjs', 'redux', 'zustand'] },
    { id: 'nextjs', name: 'Next.js', level: 4, category: 'frontend', icon: SiNextdotjs, x: 350, y: 200, vx: 0, vy: 0, connections: ['react', 'typescript', 'vercel'] },
    { id: 'typescript', name: 'TypeScript', level: 4, category: 'frontend', icon: SiTypescript, x: 150, y: 400, vx: 0, vy: 0, connections: ['javascript', 'react', 'nodejs', 'zustand'] },
    { id: 'tailwind', name: 'Tailwind', level: 8, category: 'frontend', icon: SiTailwindcss, x: 180, y: 200, vx: 0, vy: 0, connections: ['css', 'react'] },
    { id: 'javascript', name: 'JavaScript', level: 8, category: 'frontend', icon: SiJavascript, x: 280, y: 450, vx: 0, vy: 0, connections: ['react', 'nodejs', 'typescript', 'redux'] },
    { id: 'html', name: 'HTML5', level: 9, category: 'frontend', icon: SiHtml5, x: 120, y: 300, vx: 0, vy: 0, connections: ['css', 'javascript'] },
    { id: 'css', name: 'CSS3', level: 9, category: 'frontend', icon: SiCss3, x: 150, y: 500, vx: 0, vy: 0, connections: ['html', 'tailwind'] },
    { id: 'redux', name: 'Redux', level: 6, category: 'frontend', icon: SiRedux, x: 380, y: 350, vx: 0, vy: 0, connections: ['react', 'javascript'] },
    { id: 'zustand', name: 'Zustand', level: 7, category: 'frontend', icon: Database, x: 320, y: 280, vx: 0, vy: 0, connections: ['react', 'typescript'] },
    
    // Backend cluster (center-right, well distributed)
    { id: 'nodejs', name: 'Node.js', level: 8, category: 'backend', icon: SiNodedotjs, x: 700, y: 300, vx: 0, vy: 0, connections: ['javascript', 'express', 'mongodb', 'restapi'] },
    { id: 'express', name: 'Express.js', level: 8, category: 'backend', icon: SiExpress, x: 850, y: 250, vx: 0, vy: 0, connections: ['nodejs', 'jwt', 'mongodb', 'restapi', 'oauth'] },
    { id: 'python', name: 'Python', level: 4, category: 'backend', icon: SiPython, x: 600, y: 450, vx: 0, vy: 0, connections: ['fastapi'] },
    { id: 'fastapi', name: 'FastAPI', level: 2, category: 'backend', icon: SiFastapi, x: 650, y: 550, vx: 0, vy: 0, connections: ['python', 'restapi'] },
    { id: 'jwt', name: 'JWT', level: 7, category: 'backend', icon: SiJsonwebtokens, x: 780, y: 400, vx: 0, vy: 0, connections: ['express', 'nodejs', 'oauth'] },
    { id: 'oauth', name: 'OAuth', level: 7, category: 'backend', icon: Key, x: 750, y: 180, vx: 0, vy: 0, connections: ['jwt', 'express', 'firebase'] },
    { id: 'restapi', name: 'REST API', level: 8, category: 'backend', icon: Globe, x: 820, y: 350, vx: 0, vy: 0, connections: ['nodejs', 'express', 'fastapi', 'graphql'] },
    { id: 'graphql', name: 'GraphQL', level: 5, category: 'backend', icon: SiGraphql, x: 900, y: 400, vx: 0, vy: 0, connections: ['restapi', 'nodejs'] },
    
    // Database cluster (top-right, spread out)
    { id: 'mongodb', name: 'MongoDB', level: 7, category: 'database', icon: SiMongodb, x: 1000, y: 300, vx: 0, vy: 0, connections: ['nodejs', 'express'] },
    { id: 'postgresql', name: 'PostgreSQL', level: 7, category: 'database', icon: SiPostgresql, x: 1100, y: 200, vx: 0, vy: 0, connections: ['supabase'] },
    { id: 'supabase', name: 'Supabase', level: 6, category: 'database', icon: SiSupabase, x: 1200, y: 150, vx: 0, vy: 0, connections: ['postgresql', 'firebase'] },
    { id: 'firebase', name: 'Firebase', level: 6, category: 'database', icon: SiFirebase, x: 950, y: 150, vx: 0, vy: 0, connections: ['oauth', 'supabase'] },
    
    // Tools cluster (bottom, well spaced)
    { id: 'git', name: 'Git', level: 7, category: 'tools', icon: SiGit, x: 450, y: 600, vx: 0, vy: 0, connections: ['github', 'vscode'] },
    { id: 'github', name: 'GitHub', level: 7, category: 'tools', icon: SiGithub, x: 600, y: 650, vx: 0, vy: 0, connections: ['git', 'vercel'] },
    { id: 'docker', name: 'Docker', level: 5, category: 'tools', icon: SiDocker, x: 850, y: 550, vx: 0, vy: 0, connections: ['nodejs'] },
    { id: 'vscode', name: 'VS Code', level: 8, category: 'tools', icon: Code2, x: 350, y: 650, vx: 0, vy: 0, connections: ['git'] },
    { id: 'vercel', name: 'Vercel', level: 6, category: 'tools', icon: SiVercel, x: 750, y: 650, vx: 0, vy: 0, connections: ['github', 'nextjs'] },
  ], []);

  const categories = useMemo(() => ({
    frontend: { name: 'Frontend', color: '#06B6D4', count: initialSkills.filter(s => s.category === 'frontend').length },
    backend: { name: 'Backend', color: '#8B5CF6', count: initialSkills.filter(s => s.category === 'backend').length },
    database: { name: 'Database', color: '#10B981', count: initialSkills.filter(s => s.category === 'database').length },
    tools: { name: 'Tools', color: '#F59E0B', count: initialSkills.filter(s => s.category === 'tools').length },
  }), [initialSkills]);

  // Check for mobile screen size - optimized to prevent frequent updates
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setSkills(mobile ? allSkills.map(skill => ({ ...skill, x: 0, y: 0, vx: 0, vy: 0, connections: [] })) : initialSkills);
      }
    };

    checkMobile();
    const resizeHandler = () => {
      // Debounce resize events
      clearTimeout((window as any).resizeTimeout);
      (window as any).resizeTimeout = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      clearTimeout((window as any).resizeTimeout);
    };
  }, [isMobile, allSkills, initialSkills]);

  const createParticle = useCallback((x: number, y: number, color: string) => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2, // Reduced velocity for better performance
      vy: (Math.random() - 0.5) * 2,
      life: 40, // Reduced lifetime
      maxLife: 40,
      color,
    };
  }, []);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const baseWidth = isMobile ? 420 : 1400;
      const baseHeight = isMobile ? 520 : 800;
      const newDimensions = { 
        width: Math.min(rect.width, baseWidth), 
        height: baseHeight 
      };
      
      // Only update if dimensions actually changed
      if (newDimensions.width !== dimensions.width || newDimensions.height !== dimensions.height) {
        setDimensions(newDimensions);
      }
    }
  }, [isMobile, dimensions]);

  useEffect(() => {
    updateDimensions();
    const resizeHandler = () => {
      // Debounce resize events
      clearTimeout((window as any).dimensionTimeout);
      (window as any).dimensionTimeout = setTimeout(updateDimensions, 100);
    };
    
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      clearTimeout((window as any).dimensionTimeout);
    };
  }, [updateDimensions]);

  // Optimized animation loop with reduced frequency on mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const animate = (currentTime: number) => {
      // Reduced FPS on mobile for better performance
      const targetFPS = isMobile ? 15 : (draggedSkill ? 20 : 30);
      const frameInterval = 1000 / targetFPS;
      
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime.current = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Skip background stars during drag for performance
      if (!draggedSkill && !isMobile) {
        const time = Date.now() * 0.001;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 15; i++) { // Reduced star count
          const x = (i * 147.83) % canvas.width;
          const y = (i * 97.23) % canvas.height;
          const opacity = 0.3 + 0.4 * Math.sin(time + i);
          ctx.globalAlpha = opacity;
          ctx.fillRect(x, y, 1, 1);
        }
        ctx.globalAlpha = 1;
      }

      // Update and draw particles
      setParticles(prev => {
        const updated = prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 1
          }))
          .filter(particle => particle.life > 0);

        // Draw particles
        updated.forEach(particle => {
          const alpha = particle.life / particle.maxLife;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x, particle.y, 2, 2);
        });
        ctx.globalAlpha = 1;

        return updated;
      });

      // Draw connections only if not dragging and not on mobile
      if (!draggedSkill && !isMobile) {
        filteredSkills.forEach(skill => {
          skill.connections.forEach(connectionId => {
            const connectedSkill = skills.find(s => s.id === connectionId);
            if (connectedSkill) {
              const distance = Math.sqrt(
                Math.pow(skill.x - connectedSkill.x, 2) + 
                Math.pow(skill.y - connectedSkill.y, 2)
              );
              
              if (distance < 200) {
                const opacity = Math.max(0, 1 - distance / 200) * 0.3;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(skill.x, skill.y);
                ctx.lineTo(connectedSkill.x, connectedSkill.y);
                ctx.stroke();
              }
            }
          });
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    setIsAnimating(true);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsAnimating(false);
    };
  }, [dimensions, draggedSkill, isMobile, skills, filteredSkills]);

  // Optimized mouse move handler with throttling
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newMousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    
    // Update mouse position ref instead of state to prevent re-renders
    mousePosRef.current = newMousePos;

    // Only update skills state if dragging
    if (draggedSkill) {
      const newX = newMousePos.x - dragOffset.x;
      const newY = newMousePos.y - dragOffset.y;
      
      const margin = isMobile ? 30 : 40;
      const boundedX = Math.max(margin, Math.min(dimensions.width - margin, newX));
      const boundedY = Math.max(margin, Math.min(dimensions.height - margin, newY));
      
      setSkills(prev => prev.map(skill => 
        skill.id === draggedSkill 
          ? { ...skill, x: boundedX, y: boundedY }
          : skill
      ));
    }
  }, [draggedSkill, dragOffset, dimensions, isMobile]);

  const handleMouseDown = useCallback((e: React.MouseEvent, skill: Skill) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    setDraggedSkill(skill.id);
    setDragOffset({
      x: mouseX - skill.x,
      y: mouseY - skill.y
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    setDraggedSkill(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  // Optimized touch event handlers
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDraggedSkill(null);
      setDragOffset({ x: 0, y: 0 });
    };

    const handleGlobalTouchEnd = () => {
      setDraggedSkill(null);
      setDragOffset({ x: 0, y: 0 });
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, []);

  const handleSkillClick = useCallback((skill: Skill) => {
    if (!draggedSkill) {
      // Reduced particle count for better performance
      const particleCount = isMobile ? 6 : 10;
      const newParticles = Array.from({ length: particleCount }, (_, i) => {
        const angle = (i / particleCount) * Math.PI * 2;
        const speed = isMobile ? 1 + Math.random() : 1.5 + Math.random() * 1.5;
        const radius = isMobile ? 6 + Math.random() * 2 : 8 + Math.random() * 3;
        return createParticle(
          skill.x + Math.cos(angle) * radius,
          skill.y + Math.sin(angle) * radius,
          categories[skill.category].color
        );
      });
      setParticles(prev => [...prev, ...newParticles]);
    }
  }, [draggedSkill, createParticle, categories, isMobile]);

  // Memoized filtered skills to prevent recalculation
  const filteredSkills = useMemo(() => 
    selectedCategory 
      ? skills.filter(skill => skill.category === selectedCategory)
      : skills
  , [skills, selectedCategory]);

  // Mobile Tech Grid Component - memoized to prevent re-renders
  const MobileTechGrid = useMemo(() => {
    const filteredMobileSkills = selectedCategory 
      ? allSkills.filter(skill => skill.category === selectedCategory)
      : allSkills;

    return (
      <section className="py-6 relative overflow-hidden">
        {/* Sticky Category Filter */}
        <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md pb-2 mb-2">
          <div className="flex flex-nowrap overflow-x-auto gap-1.5 px-2 pt-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 text-xs rounded-lg font-semibold border transition-all duration-200 whitespace-nowrap ${
                selectedCategory === null 
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-400/50 text-cyan-300' 
                  : 'bg-white/5 border-white/20 text-foreground-muted hover:bg-white/10 hover:border-white/30'
              }`}
            >
              All
            </button>
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                className={`px-3 py-1 text-xs rounded-lg font-semibold border transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === key 
                    ? 'border-2 text-white' 
                    : 'bg-white/5 border-white/20 text-foreground-muted hover:bg-white/10 hover:border-white/30'
                }`}
                style={{
                  backgroundColor: selectedCategory === key ? category.color + '30' : undefined,
                  borderColor: selectedCategory === key ? category.color : undefined,
                  color: selectedCategory === key ? category.color : undefined,
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        {/* Minimal Grid */}
        <div className="grid grid-cols-3 gap-2 px-2">
          {filteredMobileSkills.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col items-center justify-center p-2 rounded-lg border bg-white/5 border-white/10"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-md mb-1" style={{background: `${categories[skill.category].color}10`}}>
                <skill.icon className="w-5 h-5" style={{color: categories[skill.category].color}} />
              </div>
              <span className="text-xs font-medium text-center text-white truncate w-full">{skill.name}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }, [allSkills, categories, selectedCategory]);

  return isMobile ? MobileTechGrid : (
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

        {/* Responsive Category Filter */}
        <motion.div 
          className={`flex flex-wrap justify-center ${isMobile ? 'gap-2 mb-8' : 'gap-4 mb-12'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`${isMobile ? 'px-3 py-2 text-xs' : 'px-6 py-3 text-sm'} rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
              selectedCategory === null 
                ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-500/25' 
                : 'bg-white/5 border-white/20 text-foreground-muted hover:bg-white/10 hover:border-white/30'
            }`}
            whileHover={{ scale: isMobile ? 1.02 : 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
          >
            All ({skills.length})
          </motion.button>
          
          {Object.entries(categories).map(([key, category]) => (
            <motion.button
              key={key}
              onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
              className={`${isMobile ? 'px-3 py-2 text-xs' : 'px-6 py-3 text-sm'} rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
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
              whileHover={{ scale: isMobile ? 1.02 : 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobile ? category.name : `${category.name} (${category.count})`}
            </motion.button>
          ))}
        </motion.div>

        {/* Responsive Constellation Canvas */}
        <motion.div 
          ref={containerRef}
          className={`relative w-full mx-auto rounded-2xl overflow-hidden ${
            isMobile ? 'h-[520px]' : 'h-[700px] md:h-[800px]'
          }`}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.03) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%)',
            boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.3)'
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          onMouseMove={handleMouseMove}
          onTouchMove={(e) => {
            if (isMobile) {
              const touch = e.touches[0];
              const mouseEvent = {
                clientX: touch.clientX,
                clientY: touch.clientY,
              } as React.MouseEvent;
              handleMouseMove(mouseEvent);
            }
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
          
          {/* Optimized Skill Stars */}
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                className="absolute cursor-pointer group select-none"
                style={{ 
                  left: skill.x - (isMobile ? 25 : 35), 
                  top: skill.y - (isMobile ? 25 : 35),
                  zIndex: hoveredSkill === skill.id ? 50 : 10,
                  willChange: 'transform'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  delay: index * (isMobile ? 0.03 : 0.05),
                  type: "spring",
                  stiffness: isMobile ? 150 : 200,
                  damping: 25
                }}
                onMouseEnter={() => !isMobile && setHoveredSkill(skill.id)}
                onMouseLeave={() => !isMobile && setHoveredSkill(null)}
                onMouseDown={(e) => handleMouseDown(e, skill)}
                onTouchStart={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const mouseEvent = {
                      clientX: touch.clientX,
                      clientY: touch.clientY,
                      preventDefault: () => {},
                    } as React.MouseEvent;
                    handleMouseDown(mouseEvent, skill);
                  }
                }}
                onClick={() => handleSkillClick(skill)}
                whileHover={{ scale: isMobile ? 1.1 : 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Responsive outer glow */}
                <div 
                  className="absolute inset-0 rounded-full opacity-40 animate-pulse"
                  style={{ 
                    background: `radial-gradient(circle, ${categories[skill.category].color}40, transparent)`,
                    width: isMobile ? '50px' : '70px',
                    height: isMobile ? '50px' : '70px',
                    filter: 'blur(8px)',
                    animationDuration: '3s'
                  }}
                />

                {/* Responsive main star node */}
                <div
                  className={`relative ${isMobile ? 'w-10 h-10' : 'w-14 h-14'} rounded-full flex items-center justify-center ${isMobile ? 'text-lg' : 'text-2xl'} font-bold transition-all duration-200 border-2 backdrop-blur-sm`}
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
                  <skill.icon className={isMobile ? "w-4 h-4" : "w-6 h-6"} />
                </div>

                {/* Responsive star points */}
                <div className={`absolute inset-0 ${isMobile ? 'w-10 h-10' : 'w-14 h-14'}`}>
                  {[0, 90, 180, 270].map((angle, i) => (
                    <div
                      key={i}
                      className="absolute bg-white transition-all duration-200"
                      style={{
                        width: '2px',
                        height: hoveredSkill === skill.id ? (isMobile ? '12px' : '16px') : (isMobile ? '8px' : '10px'),
                        left: '50%',
                        top: '50%',
                        transformOrigin: '50% 50%',
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${hoveredSkill === skill.id ? (isMobile ? '22px' : '28px') : (isMobile ? '18px' : '22px')})`,
                        filter: `drop-shadow(0 0 4px ${categories[skill.category].color})`,
                        opacity: hoveredSkill === skill.id ? 0.8 : 0.5,
                        borderRadius: '1px'
                      }}
                    />
                  ))}
                </div>

                {/* Simplified skill level ring */}
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

                {/* Skill name */}
                <div 
                  className="absolute top-20 left-1/2 transform -translate-x-1/2 text-sm font-medium text-center transition-all duration-200 whitespace-nowrap px-2 py-1 rounded-lg backdrop-blur-sm"
                  style={{
                    color: hoveredSkill === skill.id ? '#FFFFFF' : '#A0A0A0',
                    textShadow: hoveredSkill === skill.id ? `0 0 10px ${categories[skill.category].color}` : '0 2px 4px rgba(0,0,0,0.8)',
                    fontWeight: hoveredSkill === skill.id ? '600' : '500',
                    background: hoveredSkill === skill.id ? `${categories[skill.category].color}20` : 'rgba(0,0,0,0.3)',
                    border: hoveredSkill === skill.id ? `1px solid ${categories[skill.category].color}40` : '1px solid transparent'
                  }}
                >
                  {skill.name}
                </div>

                {/* Responsive Skill Tooltip */}
                {hoveredSkill === skill.id && !draggedSkill && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className={`absolute ${isMobile ? 'left-1/2 -translate-x-1/2 -bottom-20' : 'left-full ml-4 top-1/2 -translate-y-1/2'} z-50 backdrop-blur-md rounded-lg border pointer-events-none`}
                    style={{
                      background: 'rgba(0, 0, 0, 0.8)',
                      borderColor: categories[skill.category].color + '40',
                      boxShadow: `0 10px 25px rgba(0,0,0,0.3), 0 0 15px ${categories[skill.category].color}30`
                    }}
                  >
                    <div className={`${isMobile ? 'p-2' : 'p-3'} text-center`}>
                      <p className={`font-semibold ${isMobile ? 'text-xs mb-1' : 'text-sm mb-2'} text-white`}>
                        {skill.name}
                      </p>
                      <div className={`flex items-center justify-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
                        <div className={`flex ${isMobile ? 'gap-0.5' : 'gap-1'}`}>
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full transition-all duration-200`}
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
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white font-bold ml-1`}>
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

        {/* Enhanced Stats */}
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