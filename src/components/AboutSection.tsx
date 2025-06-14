
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Code, Database, Globe, Server } from 'lucide-react';

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
      title: 'Frontend',
      skills: ['React.js', 'TailwindCSS', 'TypeScript', 'Redux Toolkit', 'React Query'],
      color: 'text-amber-500'
    },
    {
      icon: Server,
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST API', 'GraphQL', 'JWT'],
      color: 'text-purple-500'
    },
    {
      icon: Database,
      title: 'Database',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Prisma'],
      color: 'text-blue-500'
    },
    {
      icon: Code,
      title: 'DevOps',
      skills: ['Docker', 'Git', 'GitHub', 'Vercel', 'Railway'],
      color: 'text-green-500'
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
              Code <span className="text-gradient-amber">Philosophy</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              I believe in crafting digital experiences that are not just functional, 
              but transformative. Every line of code is an opportunity to solve real problems 
              and create meaningful impact.
            </p>
          </motion.div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Personal Statement */}
            <motion.div
              className="space-y-8"
              variants={itemVariants}
            >
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-4 text-gradient-purple">
                  Digital Architect
                </h3>
                <p className="text-foreground-muted leading-relaxed mb-6">
                  As a passionate Full Stack Developer, I specialize in the MERN stack, 
                  creating scalable applications that bridge the gap between innovative 
                  design and robust functionality. My journey in tech is driven by an 
                  insatiable curiosity for emerging technologies and a commitment to 
                  continuous learning.
                </p>
                <p className="text-foreground-muted leading-relaxed">
                  Currently pursuing my BCA at VIPS Delhi with a CGPA of 7.917, 
                  I combine academic knowledge with practical experience to deliver 
                  solutions that matter. From IoT integration to real-time analytics, 
                  I thrive on challenges that push the boundaries of what's possible.
                </p>
              </div>

              {/* Education & Certifications */}
              <motion.div
                className="glass-card p-6"
                variants={itemVariants}
              >
                <h4 className="text-lg font-semibold mb-4 text-amber-500">Education & Certifications</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-muted">BCA at VIPS Delhi</span>
                    <span className="text-amber-500 font-medium">CGPA: 7.917</span>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <div className="text-sm text-foreground-muted">
                      • IBM Frontend Web Development Certificate
                    </div>
                    <div className="text-sm text-foreground-muted">
                      • Newton School SQL Certificate
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Skills Grid */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  className="glass-card-hover p-6 text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mb-4">
                    <category.icon className={`w-8 h-8 mx-auto ${category.color}`} />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-white">{category.title}</h4>
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        className="text-sm text-foreground-muted px-2 py-1 bg-white/5 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.5 + skillIndex * 0.1 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            className="text-center mt-16"
            variants={itemVariants}
          >
            <blockquote className="text-2xl md:text-3xl font-light text-foreground-muted italic max-w-4xl mx-auto">
              "The best way to predict the future is to{' '}
              <span className="text-gradient-amber font-medium">create it</span>."
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
