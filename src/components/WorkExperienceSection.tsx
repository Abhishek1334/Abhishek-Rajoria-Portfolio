'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, Building, Users, Code2, TrendingUp, Zap, Code } from 'lucide-react';

const WorkExperienceSection = () => {
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

    const section = document.getElementById('work-experience');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const workExperiences = [
    {
      id: 'prnk-infotech',
      company: 'PRNK Infotech',
      location: 'Delhi, India',
      duration: 'Aug 2025 – May 2026',
      type: 'Full-time',
      website: 'https://prnkinfotech.com',
      roles: [
        { title: 'Software Developer', duration: 'Feb 2026 – May 2026', note: 'Promoted from intern' },
        { title: 'Frontend Developer Intern', duration: 'Aug 2025 – Feb 2026', note: '' }
      ],
      description: 'Promoted from intern to Software Developer. Shipped production frontends across 5+ products — spanning web, admin, and mobile — including a Google Ads SaaS dashboard built end-to-end and a MinoriLabs delivery sprint led directly with the client.',
      responsibilities: [
        'Built a Google Ads SaaS analytics dashboard end-to-end for a client — owned UI design, API, and full stack delivery single-handedly; became the client\'s primary operational tool (per founder\'s LinkedIn recommendation).',
        'Led frontend of MinoriLabs: audited codebase, fixed broken filters/dashboards/API integrations, and ran a 10-day sprint coordinating frontend devs, backend engineers, and the client directly — delivered before deadline.',
        'Shipped production frontends across 5+ products in Next.js 15/16 (App Router) + React 19 + TypeScript: Freshbuyzar grocery (web + RN mobile app), QR Code Creator SaaS, Riders Choice e-commerce, MinoriLabs, Google Ads SaaS.',
        'Integrated Stripe + Razorpay end-to-end; improved Lighthouse 50 → 95 via Promise.all parallelization + server components; Vitest coverage 538/538 on qrcodecreator-fe; Playwright e2e before every push.'
      ],
      technologies: ['Next.js 15/16', 'React 19', 'TypeScript', 'React Native', 'Expo', 'TanStack Query', 'Stripe', 'Razorpay', 'Django DRF', 'Vitest', 'Playwright', 'Tailwind CSS']
    }
  ];

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
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="work-experience" className="py-12 sm:py-16 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-purple-500/5 to-amber-500/5"></div>
      <div className="absolute inset-0 bg-dots opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Enhanced Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-full border border-amber-500/30">
              <Briefcase className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-semibold text-gradient-amber">Professional Journey</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6">
              Work <span className="text-gradient-amber">Experience</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 font-body">
              Where I've applied my skills to build real-world solutions
            </p>
          </motion.div>

          {/* Work Experience Cards */}
          <div className="space-y-6 sm:space-y-8">
            {workExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className="relative"
                variants={cardVariants}
              >
                {/* Timeline Line */}
                {index < workExperiences.length - 1 && (
                  <div className="absolute left-8 sm:left-12 top-full w-0.5 h-8 sm:h-12 bg-gradient-to-b from-amber-500/50 to-transparent"></div>
                )}
                
                {/* Experience Card */}
                <div className="glass-card p-4 sm:p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col gap-4 mb-4">
                      {/* Company Name + Overall Duration */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1 pr-2">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-amber mb-1 leading-tight">
                            {experience.company}
                          </h3>
                          <div className="flex items-center gap-2 text-foreground-muted">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">{experience.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 w-fit">
                          <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <span className="text-sm font-medium text-amber-400">{experience.duration}</span>
                        </div>
                      </div>

                      {/* Roles */}
                      <div className="flex flex-col gap-2">
                        {experience.roles.map((role, roleIndex) => (
                          <div key={roleIndex} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-2 text-foreground">
                              <Briefcase className="w-4 h-4 flex-shrink-0 text-amber-500" />
                              <span className="font-semibold">{role.title}</span>
                              {role.note && (
                                <span className="text-xs px-2 py-0.5 bg-purple-500/20 rounded-full text-purple-400 font-medium whitespace-nowrap">
                                  {role.note}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-foreground-muted sm:ml-auto">{role.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-foreground-muted leading-relaxed mb-4 font-body">
                      {experience.description}
                    </p>

                    {/* Responsibilities */}
                    <h4 className="text-lg font-bold text-gradient-amber mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 flex-shrink-0" />
                      Impact & Responsibilities
                    </h4>
                    <ul className="list-disc pl-5 text-foreground-muted space-y-2 mb-4 font-body">
                      {experience.responsibilities.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <h4 className="text-lg font-bold text-gradient-amber mb-3 flex items-center gap-2">
                      <Code className="w-5 h-5 flex-shrink-0" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-4">
                      {experience.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="text-sm px-3 py-1.5 bg-blue-500/20 rounded-full text-blue-400 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>


                    {/* Company Link */}
                    {experience.website && (
                      <div className="mt-6 flex justify-end">
                        <a
                          href={experience.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-lg border border-amber-500/30 hover:border-purple-500/30 transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4 text-amber-500 group-hover:text-purple-500 transition-colors" />
                          <span className="text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors">
                            Visit Company
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-8 sm:mt-12"
            variants={itemVariants}
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-full border border-amber-500/30">
              <Users className="w-5 h-5 text-amber-500" />
              <span className="text-foreground-muted font-medium">
                Open to new opportunities
              </span>
              <a
                href="#contact"
                className="text-gradient-amber font-semibold hover:text-gradient-purple transition-colors"
              >
                Let's Connect →
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperienceSection;
