
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ExternalLink, Github, Server, Smartphone, BarChart3, Calendar, TrendingUp, Users, Shield } from 'lucide-react';
import ProjectPreview from './ProjectPreview';
import ProjectModal from './ProjectModal';

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('projects');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Festify',
      subtitle: 'IoT Event Management Platform',
      description: 'Revolutionary event management platform powered by IoT and QR code technology, featuring RFID integration for seamless real-time check-ins and comprehensive event analytics.',
      icon: Smartphone,
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'TailwindCSS', 'JWT', 'IoT', 'RFID'],
      highlights: ['Real-time Check-ins', 'IoT Integration', 'QR Code System', 'Admin Dashboard'],
      gradient: 'from-amber-500 to-orange-600',
      glowColor: 'amber',
      liveUrl: 'https://festify-tau.vercel.app/',
      githubUrl: 'https://github.com/Abhishek1334/Festify',
      previewImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
      features: [
        { icon: Calendar, label: 'Event Management' },
        { icon: Users, label: 'User Registration' },
        { icon: Shield, label: 'RFID Security' },
        { icon: BarChart3, label: 'Analytics' }
      ],
      detailedContent: {
        overview: 'Festify is a local event aggregator platform where users can discover, create, RSVP, and manage events. It supports QR code-based ticketing, a complete check-in system for organizers, and a clean, modern user interface.',
        features: [
          'JWT Authentication for secure login/signup',
          'Event Management: Create, Edit, Delete Events (Organizers)',
          'Ticketing System with QR Code Generation',
          'Image Uploads via Multer + Cloudinary',
          'Event Search & Filter by category',
          'Organizer Dashboard with check-ins details',
          'QR Code Scanner using Html5Qrcode for attendee verification',
          'RSVP Management in user profile',
          'RFID-Based Ticket Verification using ESP8266'
        ],
        techStack: [
          {
            category: 'Frontend',
            technologies: ['React.js', 'Vite', 'Context API', 'TailwindCSS']
          },
          {
            category: 'Backend',
            technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose']
          },
          {
            category: 'Authentication & Security',
            technologies: ['JWT', 'Bcrypt.js']
          },
          {
            category: 'Media & Storage',
            technologies: ['Multer', 'Cloudinary']
          },
          {
            category: 'IoT & Hardware',
            technologies: ['ESP8266', 'RFID Reader 522', 'Html5Qrcode Scanner']
          }
        ],
        highlights: [
          'Complete MERN Stack Implementation',
          'Real-time QR Code Generation & Scanning',
          'IoT Integration with RFID Technology',
          'Comprehensive Event Management System',
          'Mobile-Responsive Design',
          'Cloud-based Image Storage'
        ]
      }
    },
    {
      id: 2,
      title: 'MarketPulse',
      subtitle: 'Stock Analytics Dashboard',
      description: 'Comprehensive stock market analytics platform featuring real-time data visualization, advanced charting, and intelligent insights for informed trading decisions.',
      icon: BarChart3,
      technologies: ['React.js', 'Zustand', 'Chart.js', 'React Query', 'REST APIs', 'TailwindCSS'],
      highlights: ['Real-time Data', 'Advanced Charts', 'Market Analytics', 'Performance Tracking'],
      gradient: 'from-purple-500 to-pink-600',
      glowColor: 'purple',
      liveUrl: 'https://market-pulse-two.vercel.app/',
      githubUrl: 'https://github.com/Abhishek1334/MarketPulse',
      previewImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
      features: [
        { icon: TrendingUp, label: 'Live Charts' },
        { icon: BarChart3, label: 'Data Visualization' },
        { icon: Server, label: 'Real-time API' },
        { icon: Users, label: 'Portfolio Tracking' }
      ],
      detailedContent: {
        overview: 'Market Pulse is a cutting-edge stock market analytics dashboard that empowers users with real-time market insights, beautiful data visualizations, and customizable analysis tools. Built specifically for traders, investors, and financial enthusiasts.',
        features: [
          'Real-time Stock Charting with Interactive Interface',
          'Customizable Timeframe Filters (1D, 1M, 1Y, ALL)',
          'Toggle Metrics: Open, Close, High, Low, Volume',
          'Modular & Scalable Component Architecture',
          'Global State Management with Zustand',
          'Optimized Data Fetching & Rate-Limiting',
          'Start/End Date Range Selector',
          'Responsive, Mobile-Friendly Design',
          'Light/Dark Mode Support'
        ],
        techStack: [
          {
            category: 'Frontend',
            technologies: ['React.js', 'Vite', 'TailwindCSS']
          },
          {
            category: 'State Management',
            technologies: ['Zustand', 'React Query']
          },
          {
            category: 'Data Visualization',
            technologies: ['Chart.js', 'Interactive Charts']
          },
          {
            category: 'APIs',
            technologies: ['Yahoo Finance API', 'Twelve Data API']
          },
          {
            category: 'Backend',
            technologies: ['Node.js', 'Express.js', 'JWT Authentication']
          },
          {
            category: 'Deployment',
            technologies: ['Vercel (Frontend)', 'Railway (Backend)']
          }
        ],
        highlights: [
          'Real-time Financial Data Integration',
          'Advanced Charting with Multiple Timeframes',
          'Optimized Performance with Rate Limiting',
          'Professional Trading Interface',
          'Scalable Architecture for Growth',
          'Mobile-First Responsive Design'
        ]
      }
    }
  ];

  const handleReadMore = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
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
              Digital <span className="text-gradient-purple">Creations</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
              Crafting innovative solutions that blend cutting-edge technology with intuitive design, 
              each project tells a story of problem-solving and technical excellence.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                variants={itemVariants}
              >
                {/* Project Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${project.gradient}`}>
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      <p className="text-foreground-muted">{project.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-lg text-foreground-muted leading-relax">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="grid grid-cols-2 gap-3">
                    {project.highlights.map((highlight, hIndex) => (
                      <motion.div
                        key={highlight}
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.5 + hIndex * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`}></div>
                        <span className="text-foreground-muted">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-foreground-muted"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.7 + techIndex * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      onClick={() => handleReadMore(project)}
                      className={`btn-ghost group ${project.glowColor === 'amber' ? 'hover:glow-amber' : 'hover:glow-purple'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More
                    </motion.button>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-ghost group ${project.glowColor === 'amber' ? 'hover:glow-amber' : 'hover:glow-purple'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-primary ${project.glowColor === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  </div>
                </div>

                {/* Project Preview */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <ProjectPreview 
                    project={project} 
                    onReadMore={() => handleReadMore(project)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
};

export default ProjectsSection;
