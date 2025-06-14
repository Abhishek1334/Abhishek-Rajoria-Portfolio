
'use client';

import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';

const Index = () => {
  const handleHireMe = () => {
    // Scroll to contact section
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="text-xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gradient-amber">AR</span>
            </motion.div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Resume', href: 'https://drive.google.com/file/d/1UchzGFtq72KDwOsg8af5W2NKQDvoRi-J/view?usp=drive_link', external: true },
                { label: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-foreground-muted hover:text-amber-500 transition-colors relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <motion.button
              className="btn-primary text-sm px-6 py-2 relative overflow-hidden"
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
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Enhanced Footer */}
      <motion.footer
        className="py-12 border-t border-white/10 bg-background-secondary/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gradient-amber">Abhishek Rajoria</span>
            </motion.div>
            <p className="text-foreground-muted mb-6">
              Full Stack Developer • Turning Coffee into Code Since 2020 ☕
            </p>
            <div className="flex justify-center gap-6 mb-8">
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
                  className="text-foreground-muted hover:text-amber-500 transition-colors"
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
              className="text-sm text-foreground-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Abhishek Rajoria. Crafted with 💜 and way too much caffeine.
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
