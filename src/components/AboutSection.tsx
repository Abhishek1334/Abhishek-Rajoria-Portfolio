'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Code, Database, Globe, Server, Zap, Cpu, Cloud, Shield } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      icon: Globe,
      title: 'Frontend Mastery',
      skills: ['React.js', 'TailwindCSS', 'React Query', 'Redux Toolkit', 'Chart.js', 'Zustand'],
      color: 'text-amber-500',
      description: 'Crafting responsive, dynamic UIs'
    },
    {
      icon: Server,
      title: 'Backend Wizardry',
      skills: ['Node.js', 'Express.js', 'REST API', 'GraphQL', 'JWT', 'Bcrypt.js'],
      color: 'text-purple-500',
      description: 'Building secure, scalable APIs'
    },
    {
      icon: Database,
      title: 'Database Sorcery',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Prisma', 'Mongoose'],
      color: 'text-blue-500',
      description: 'Optimizing data architecture'
    },
    {
      icon: Cloud,
      title: 'DevOps Arsenal',
      skills: ['Docker', 'Git & GitHub', 'Vercel', 'Railway', 'Cloudinary', 'Firebase'],
      color: 'text-green-500',
      description: 'Streamlining deployment flows'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <section id="about" className="py-12 sm:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-10 sm:mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              My <span className="text-gradient-amber">Development Approach</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              I build digital solutions that solve real-world problems and create meaningful impact. 
              Each project is an opportunity to apply best practices, modern technologies, and 
              innovative thinking to deliver exceptional results.
            </p>
          </motion.div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left Side - Personal Statement */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              variants={itemVariants}
            >
              <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-amber-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-gradient-purple" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gradient-purple">
                      Full Stack Developer & Problem Solver
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-4 sm:mb-6">
                    I'm a <span className="text-amber-500 font-semibold">dedicated full stack developer</span> who 
                    specializes in creating robust MERN stack applications that drive business value. 
                    My strength lies in translating complex requirements into clean, maintainable code that <em className="text-purple-400">performs exceptionally</em>.
                  </p>
                  <p className="text-base sm:text-lg text-foreground-muted leading-relaxed mb-4">
                    From <span className="text-gradient-amber font-medium">IoT integrations and sensor data processing</span> to 
                    <span className="text-gradient-purple font-medium"> real-time analytics and data visualization</span>—
                    I excel at bridging the gap between innovative ideas and production-ready solutions.
                  </p>
                  <div className="flex items-center gap-2 mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-lg border border-amber-500/20">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                    <span className="text-xs sm:text-sm font-medium text-amber-500">
                      Computer Applications at VIPS Delhi • CGPA: 7.92
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Education & Certifications */}
              <motion.div
                className="glass-card p-4 sm:p-6 relative"
                variants={itemVariants}
              >
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  <h4 className="text-lg sm:text-xl font-semibold text-amber-500">Education & Certifications</h4>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <span className="text-sm sm:text-base text-white font-medium">Bachelor of Computer Applications</span>
                      <div className="text-xs sm:text-sm text-foreground-muted">VIPS Delhi • 2022-Present</div>
                    </div>
                    <div className="text-right">
                      <span className="text-base sm:text-lg text-amber-500 font-bold">7.92</span>
                      <div className="text-xs text-foreground-muted">CGPA</div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-3 sm:pt-4">
                    <div className="grid gap-2 sm:gap-3">
                      <div className="flex items-center gap-3 p-2 bg-blue-500/10 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs sm:text-sm text-blue-400 font-medium">IBM Frontend Web Development Certified</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-purple-500/10 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-xs sm:text-sm text-purple-400 font-medium">Newton School SQL Database Expert</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Enhanced Skills Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              variants={containerVariants}
            >
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  className="glass-card-hover p-4 sm:p-6 text-center relative group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="mb-3 sm:mb-4">
                      <category.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold mb-2 text-white group-hover:text-gradient-amber transition-colors">
                      {category.title}
                    </h4>
                    <p className="text-xs text-foreground-muted mb-3 sm:mb-4 italic">
                      {category.description}
                    </p>
                    <div className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          className="text-xs sm:text-sm text-foreground-muted px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-default"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: 0.5 + skillIndex * 0.1 }}
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Enhanced Quote */}
          <motion.div
            className="text-center mt-10 sm:mt-16 relative"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent rounded-2xl"></div>
            <blockquote className="text-lg sm:text-2xl md:text-3xl font-light text-foreground-muted italic max-w-4xl mx-auto relative z-10 p-6 sm:p-8">
              "Great software is built by developers who{' '}
              <span className="text-gradient-amber font-semibold not-italic">understand both the code and the user</span>."
              <div className="text-sm sm:text-base mt-3 sm:mt-4 text-foreground-muted/60 not-italic">
                — My development philosophy
              </div>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
