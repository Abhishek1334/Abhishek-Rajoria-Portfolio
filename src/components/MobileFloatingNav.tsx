import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Home, User, Code, Briefcase, Mail, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../hooks/useTheme';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  action?: string;
}

interface MobileFloatingNavProps {
  onResumeClick: () => void;
}

const MobileFloatingNav = ({ onResumeClick }: MobileFloatingNavProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems: NavItem[] = [
    { id: 'hero', label: 'Home', icon: Home, href: '#hero' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'projects', label: 'Work', icon: Briefcase, href: '#projects' },
    { id: 'resume', label: 'CV', icon: FileText, href: '#resume', action: 'resume' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' }
  ];

  const { theme } = useTheme();

  // Theme-aware classes
  const glassBg = theme === 'dark'
    ? 'bg-black/80 border border-white/10 shadow-white/10'
    : 'bg-white/80 border border-black/10 shadow-black/10';
  const navShadow = theme === 'dark' ? 'shadow-white/10' : 'shadow-black/10';
  const activeText = 'text-primary';
  const inactiveText = 'text-foreground-muted';

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (item.action === 'resume') {
      onResumeClick();
    } else {
      const targetElement = document.querySelector(item.href);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }
    }
  };

  return (
    <>
      {/* Floating Logo (top-left) */}
      <button
        className={`fixed top-3 left-3 z-50 w-11 h-11 flex items-center justify-center rounded-full ${glassBg} shadow-lg select-none md:hidden transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-opacity-90 focus-visible:ring-2 focus-visible:ring-primary/60`}
        aria-label="Home"
        onClick={() => handleNavClick(navItems[0])}
      >
        <span className="text-lg font-bold text-gradient-primary">AR</span>
      </button>
      {/* Floating Theme Toggle (top-right) */}
      <div className={`fixed top-3 right-3 z-50 w-11 h-11 flex items-center justify-center rounded-full ${glassBg} shadow-lg md:hidden transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-opacity-90`}>
        <ThemeToggle />
      </div>
      <AnimatePresence>
        {isVisible && (
          <div className="fixed bottom-4 left-0 right-0 z-50 md:hidden flex justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.3 
              }}
              className="w-fit pointer-events-auto"
            >
              <div className={`rounded-2xl ${glassBg} ${navShadow} shadow-2xl w-fit mx-auto px-3 py-2 flex flex-col items-center gap-1 transition-all duration-200`}>
                <div className="flex items-center justify-center gap-2">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavClick(item)}
                        className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 w-12 sm:w-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80 bg-white/5 hover:bg-white/10 ${
                          isActive 
                            ? `${activeText} shadow-lg` 
                            : `${inactiveText} hover:text-primary`
                        }`}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        tabIndex={0}
                        aria-label={item.label}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-primary/20 rounded-xl border border-primary/30"
                            initial={false}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 30 
                            }}
                          />
                        )}
                        {/* Icon */}
                        <div className="relative z-10 mb-1">
                          <Icon 
                            className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-200 ${
                              isActive ? 'scale-110' : ''
                            }`} 
                          />
                        </div>
                        {/* Label */}
                        <span className={`text-[11px] sm:text-xs font-medium transition-all duration-200 relative z-10 ${
                          isActive ? 'opacity-100' : 'opacity-70'
                        }`}>
                          {item.label}
                        </span>
                        {/* Glow effect for active item */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-primary/10 rounded-xl blur-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                {/* Floating nav indicator */}
                <motion.div
                  className="mt-1 absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileFloatingNav; 