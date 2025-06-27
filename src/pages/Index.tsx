'use client';

import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsConstellation from '../components/SkillsConstellation';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import ResumeModal from '../components/ResumeModal';
import MobileFloatingNav from '../components/MobileFloatingNav';

import { useVisitorTracking } from '../hooks/useVisitorTracking';
import { Toaster } from '@/components/ui/sonner';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  // Track visitor and send email alert
  useVisitorTracking();

  const handleHireMe = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Resume', href: '#resume', action: 'resume' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string, action?: string) => {
    if (action === 'resume') {
      setIsResumeModalOpen(true);
      setIsMobileMenuOpen(false);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="text-xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gradient-amber">AR</span>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navigationLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  className="text-foreground-muted hover:text-amber-500 transition-colors relative interactive"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleNavClick(link.href, link.action)}
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <motion.button
                className="btn-primary text-sm px-4 sm:px-6 py-2 relative overflow-hidden hidden sm:block interactive"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHireMe}
              >
                <span className="relative z-10">Let's Work Together</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <button
                className="md:hidden p-2 text-foreground-muted hover:text-amber-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <motion.div
            className={`md:hidden overflow-hidden ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'} transition-all duration-300 ease-in-out`}
            initial={false}
          >
            <div className="py-4 space-y-4">
              {navigationLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  className="block text-left text-foreground-muted hover:text-amber-500 transition-colors py-2 w-full interactive"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(link.href, link.action)}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                className="btn-primary w-full text-sm px-6 py-2 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleHireMe}
              >
                <span className="relative z-10">Let's Work Together</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="skills">
          <SkillsConstellation />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Enhanced Footer */}
      <motion.footer
        className="py-8 sm:py-12 border-t border-white/10 bg-background-secondary/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <motion.div
              className="text-xl sm:text-2xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gradient-amber">Abhishek Rajoria</span>
            </motion.div>
            <p className="text-sm sm:text-base text-foreground-muted mb-6">
              Full Stack Developer • Building Digital Solutions Since 2020
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
              {[
                { label: 'GitHub', href: 'https://github.com/abhishekrajoria' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/abhishek-rajoria' },
                { label: 'Email', href: 'mailto:AbhishekRajoria24@gmail.com' }
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-foreground-muted hover:text-amber-500 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  viewport={{ once: true }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <motion.div
              className="text-xs sm:text-sm text-foreground-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Abhishek Rajoria. Designed and developed with passion.
            </motion.div>
          </div>
        </div>
      </motion.footer>
      
      {/* Resume Modal */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
      
      {/* Mobile Floating Nav */}
      <MobileFloatingNav onResumeClick={() => setIsResumeModalOpen(true)} />
      
      {/* Toast notifications */}
      <Toaster />
    </motion.div>
  );
};

export default Index;
