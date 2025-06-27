import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Home, User, Code, Briefcase, Mail, FileText } from 'lucide-react';

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
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-4 left-0 right-0 z-50 md:hidden flex justify-center px-4">
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
            className="w-fit"
          >
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 px-3 py-2 shadow-2xl w-fit mx-auto">
            <div className="flex items-center justify-center gap-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 w-12 sm:w-14 ${
                      isActive 
                        ? 'text-amber-400' 
                        : 'text-white/70 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-amber-500/20 rounded-xl border border-amber-500/30"
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
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                          isActive ? 'scale-110' : ''
                        }`} 
                      />
                    </div>
                    
                    {/* Label */}
                    <span className={`text-[10px] sm:text-xs font-medium transition-all duration-300 relative z-10 ${
                      isActive ? 'opacity-100' : 'opacity-70'
                    }`}>
                      {item.label}
                    </span>

                    {/* Glow effect for active item */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-amber-500/10 rounded-xl blur-sm"
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
          </div>

          {/* Floating nav indicator */}
          <motion.div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          />
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileFloatingNav; 