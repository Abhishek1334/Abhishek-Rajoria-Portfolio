'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown, Code2, Sparkles } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

const typewriterTags = [
  'Full Stack Developer',
  'Problem Solver',
  'UI/UX Enthusiast',
  'Code Architect',
  'Team Player',
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTag, setCurrentTag] = useState(0);
  const [typedTag, setTypedTag] = useState('');
  const [typing, setTyping] = useState(true);

  // Typewriter effect for tags
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (typedTag.length < typewriterTags[currentTag].length) {
        timeout = setTimeout(() => {
          setTypedTag(typewriterTags[currentTag].slice(0, typedTag.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      timeout = setTimeout(() => {
        setTyping(true);
        setTypedTag('');
        setCurrentTag((prev) => (prev + 1) % typewriterTags.length);
      }, 700);
    }
    return () => clearTimeout(timeout);
  }, [typedTag, typing, currentTag]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32">
      {/* Particle Background */}
      <ParticleBackground />

      <div className="container mx-auto px-2 sm:px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col items-center sm:items-start text-center sm:text-left"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Name Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold mb-2 sm:mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 bg-clip-text text-transparent leading-tight sm:leading-[1.1]">
            Abhishek <span className="inline-block align-middle"><Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 animate-bounce" /></span><br />
            Rajoria
          </h1>

          {/* Typewriter Tag - now below the name, no background */}
          <div className="mb-2 sm:mb-4 min-h-[2rem] sm:min-h-[2.5rem]">
            <span className="text-lg sm:text-2xl md:text-4xl font-mono font-bold text-amber-400">
              {typedTag}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 rounded-full mb-4 sm:mb-6" />

          {/* Enhanced Description Card (now transparent) */}
          <div className="max-w-xs sm:max-w-2xl mx-auto sm:mx-0 mb-6 sm:mb-12 px-2 sm:px-0">
            <div className="p-0 font-body text-sm sm:text-lg md:text-xl text-foreground leading-relaxed">
              I specialize in developing high-performance <span className="text-accent font-semibold">MERN stack</span> applications that deliver exceptional <span className="text-accent font-semibold">user experiences</span>.<br />
              From <span className="text-gradient-secondary font-semibold">IoT integrations</span> to <span className="text-gradient-secondary font-semibold">real-time analytics platforms</span>, I transform complex technical challenges into <span className="text-accent font-semibold">elegant, scalable solutions</span>.<br />
              Completed <span className="text-accent font-semibold">Computer Applications</span> at <span className="text-gradient-secondary font-semibold">VIPS Delhi</span> with a focus on <span className="text-accent font-semibold">modern web technologies</span>.
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start mb-8 sm:mb-16 px-2 sm:px-0 font-body"
            variants={itemVariants}
          >
            <motion.a
              href="#projects"
              className="btn-primary group w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-bold shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 border-none hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-ghost group w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-bold border border-foreground/10 hover:bg-foreground/5 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="group-hover:text-secondary transition-colors">Let's Connect</span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center mx-auto font-body"
            variants={itemVariants}
          >
            <span className="text-base sm:text-xl text-foreground-muted mb-2 sm:mb-4">
              Ready for the journey? ✨
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
