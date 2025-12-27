'use client';

import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WorkExperienceSection from '../components/WorkExperienceSection';
import SkillsConstellation from '../components/SkillsConstellation';
import ProjectsSection from '../components/ProjectsSection';
import CertificateSection from '../components/CertificateSection';
import ContactSection from '../components/ContactSection';
import ResumeModal from '../components/ResumeModal';
import MobileFloatingNav from '../components/MobileFloatingNav';
import ThemeToggle from '../components/ThemeToggle';

import { Toaster } from '@/components/ui/sonner';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleHireMe = () => {
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#work-experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
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
            className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50"
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
                  <span className="text-gradient-primary">AR</span>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navigationLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                      className="text-foreground-muted hover:text-primary transition-colors relative interactive"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleNavClick(link.href, link.action)}
                >
                  {link.label}
                  <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                  <ThemeToggle />
              <motion.button
                    className="btn-primary text-sm px-4 sm:px-6 py-2 relative overflow-hidden interactive"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHireMe}
              >
                <span className="relative z-10">Let's Work Together</span>
                <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                  <ThemeToggle />
              <button
                    className="p-2 text-foreground-muted hover:text-primary transition-colors"
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
                      className="block text-left text-foreground-muted hover:text-primary transition-colors py-2 w-full interactive"
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
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90"
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
        <section id="about" className="scroll-mt-16">
          <AboutSection />
        </section>
        <section id="work-experience" className="scroll-mt-16">
          <WorkExperienceSection />
        </section>
        <section id="skills" className="scroll-mt-16">
          <SkillsConstellation />
        </section>
        <section id="projects" className="scroll-mt-16">
          <ProjectsSection />
        </section>
        <section id="certificates" className="scroll-mt-16">
          <CertificateSection />
        </section>
        <section id="contact" className="scroll-mt-16">
          <ContactSection />
        </section>
      </main>

      {/* Enhanced Footer */}
      <motion.footer
          className="py-8 sm:py-12 border-t border-border/50 bg-background-secondary/30"
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
                <span className="text-gradient-primary">Abhishek Rajoria</span>
            </motion.div>
            <p className="text-sm sm:text-base text-foreground-muted mb-6">
              Full Stack Developer • Building Digital Solutions Since 2020
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
              {[
                  { name: 'GitHub', url: 'https://github.com/Abhishek1334' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/abhishekrajoria/' },
                  { name: 'Email', url: 'mailto:abhishekrajoria24@gmail.com' }
                ].map((social, index) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-primary px-3 py-2 rounded-lg hover:bg-muted/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                    {social.name}
                </motion.a>
              ))}
            </div>
              <p className="text-xs text-foreground-muted">
                © 2024 Abhishek Rajoria. All rights reserved.
              </p>
          </div>
        </div>
      </motion.footer>

        {/* Floating nav */}
        <div className="block md:hidden">
          <MobileFloatingNav onResumeClick={() => setIsResumeModalOpen(true)} />
        </div>

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
      )}

      {/* Toaster */}
      <Toaster />
    </motion.div>
  );
};

export default Index;
