
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronDown, Code2, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "Full Stack Developer",
    "Problem Solver",
    "Code Architect",
    "Digital Creator"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Animate through different roles
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-amber-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Greeting */}
          <motion.div
            className="mb-6"
            variants={itemVariants}
          >
            <span className="text-foreground-muted text-lg flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Hey there! I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8"
            variants={itemVariants}
          >
            <span className="text-gradient-amber">Abhishek</span>{' '}
            <span className="text-white">Rajoria</span>
          </motion.h1>

          {/* Dynamic Title with Typing Effect */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
            <div className="text-2xl md:text-3xl text-foreground-muted font-light mb-4">
              <span className="text-gradient-purple">
                {roles[currentRole]}
              </span>
            </div>
            <div className="text-lg md:text-xl text-foreground-muted">
              Transforming Ideas into Digital Reality 🚀
            </div>
          </motion.div>

          {/* Enhanced Description */}
          <motion.p
            className="text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed mb-12"
            variants={itemVariants}
          >
            I craft scalable MERN applications that don't just work—they <em className="text-amber-500">wow</em>. 
            From IoT integrations to real-time analytics, I turn complex challenges into elegant solutions. 
            Currently mastering the art of code at <span className="text-purple-400">VIPS Delhi</span> 🎓
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={itemVariants}
          >
            <motion.a
              href="#projects"
              className="btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Explore My Universe
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-ghost group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="group-hover:text-amber-500 transition-colors">Let's Create Magic</span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <span className="text-foreground-muted text-sm mb-4">
              Ready for the journey? ✨
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-amber-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/3 left-10 w-4 h-4 bg-amber-500/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 right-16 w-3 h-3 bg-purple-500/20 rounded-full"
        animate={{
          y: [0, 15, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </section>
  );
};

export default HeroSection;
