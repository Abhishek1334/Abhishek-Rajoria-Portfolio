
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Full Stack Developer';
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const nameVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/abhishekrajoria', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/abhishek-rajoria', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:AbhishekRajoria24@gmail.com', label: 'Email' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-grid">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Location */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8"
          variants={itemVariants}
        >
          <MapPin className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-foreground-muted">Rohini, New Delhi, India</span>
        </motion.div>

        {/* Name with Glitch Effect */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 text-shadow"
          variants={nameVariants}
        >
          <span className="text-gradient-amber">Abhishek</span>
          <br />
          <span className="text-white">Rajoria</span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <div className="text-2xl md:text-3xl text-foreground-muted mb-2">
            {displayedText}
            <span className="inline-block w-0.5 h-8 bg-amber-500 ml-1 animate-pulse"></span>
          </div>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
            Passionate about building scalable MERN applications with cutting-edge technologies
            and innovative solutions that push the boundaries of web development.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <button className="btn-primary group">
            View My Work
            <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
          </button>
          <button className="btn-secondary">
            Download Resume
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6"
          variants={itemVariants}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card-hover rounded-full group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <social.icon className="w-6 h-6 text-foreground-muted group-hover:text-amber-500 transition-colors" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm text-foreground-muted mb-2">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 text-amber-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
