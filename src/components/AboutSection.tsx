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
      skills: ['React.js', 'TailwindCSS', 'TypeScript', 'Redux Toolkit', 'React Query'],
      color: 'text-amber-500',
      description: 'Crafting pixel-perfect interfaces'
    },
    {
      icon: Server,
      title: 'Backend Wizardry',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'JWT Auth'],
      color: 'text-purple-500',
      description: 'Building rock-solid architectures'
    },
    {
      icon: Database,
      title: 'Data Engineering',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Prisma ORM'],
      color: 'text-blue-500',
      description: 'Designing scalable data solutions'
    },
    {
      icon: Cloud,
      title: 'DevOps & Cloud',
      skills: ['Docker', 'Git & GitHub', 'Vercel', 'Railway', 'CI/CD'],
      color: 'text-green-500',
      description: 'Automating deployment pipelines'
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
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient-amber">Development DNA</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              I don't just write code—I architect digital experiences that solve real problems 
              and create lasting impact. Every project is a chance to push boundaries and 
              turn wild ideas into reality.
            </p>
          </motion.div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Personal Statement */}
            <motion.div
              className="space-y-8"
              variants={itemVariants}
            >
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-8 h-8 text-gradient-purple" />
                    <h3 className="text-2xl font-bold text-gradient-purple">
                      Digital Architect & Problem Solver
                    </h3>
                  </div>
                  <p className="text-foreground-muted leading-relaxed mb-6 text-lg">
                    I'm not your average developer—I'm a <span className="text-amber-500 font-semibold">digital craftsman</span> who 
                    specializes in transforming complex challenges into elegant MERN stack solutions. 
                    My superpower? Taking your wildest ideas and making them not just work, but <em className="text-purple-400">absolutely shine</em>.
                  </p>
                  <p className="text-foreground-muted leading-relaxed mb-4 text-lg">
                    From <span className="text-gradient-amber font-medium">IoT integrations that make devices dance</span> to 
                    <span className="text-gradient-purple font-medium"> real-time analytics that predict the future</span>—
                    I thrive in that sweet spot where innovation meets implementation.
                  </p>
                  <div className="flex items-center gap-2 mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-lg border border-amber-500/20">
                    <Cpu className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-amber-500">
                      Currently mastering the art of code at VIPS Delhi • CGPA: 7.917 🎓
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Education & Certifications */}
              <motion.div
                className="glass-card p-6 relative"
                variants={itemVariants}
              >
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-green-500" />
                  <h4 className="text-xl font-semibold text-amber-500">Academic Arsenal & Battle Scars</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <span className="text-white font-medium">Bachelor of Computer Applications</span>
                      <div className="text-sm text-foreground-muted">VIPS Delhi • Class of 2025</div>
                    </div>
                    <div className="text-right">
                      <span className="text-amber-500 font-bold text-lg">7.917</span>
                      <div className="text-xs text-foreground-muted">CGPA</div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 p-2 bg-blue-500/10 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-blue-400 font-medium">IBM Frontend Web Development Certified</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-purple-500/10 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-purple-400 font-medium">Newton School SQL Database Expert</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Enhanced Skills Grid */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  className="glass-card-hover p-6 text-center relative group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="mb-4">
                      <category.icon className={`w-8 h-8 mx-auto ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white group-hover:text-gradient-amber transition-colors">
                      {category.title}
                    </h4>
                    <p className="text-xs text-foreground-muted mb-4 italic">
                      {category.description}
                    </p>
                    <div className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          className="text-sm text-foreground-muted px-3 py-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-default"
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
            className="text-center mt-16 relative"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent rounded-2xl"></div>
            <blockquote className="text-2xl md:text-3xl font-light text-foreground-muted italic max-w-4xl mx-auto relative z-10 p-8">
              "The future belongs to those who{' '}
              <span className="text-gradient-amber font-semibold not-italic">code it into existence</span>."
              <div className="text-base mt-4 text-foreground-muted/60 not-italic">
                — My development philosophy ✨
              </div>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
