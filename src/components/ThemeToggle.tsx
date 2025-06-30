import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  // Match AR logo button style
  const baseStyle =
    'w-11 h-11 flex items-center justify-center rounded-full shadow-lg border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2';
  const glassStyle =
    theme === 'dark'
      ? 'bg-black/80 border-white/10 hover:bg-black/90'
      : 'bg-white/80 border-black/10 hover:bg-white/90';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`${baseStyle} ${glassStyle}`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{ padding: 0, margin: 0 }}
    >
      <motion.div
        className="relative w-5 h-5 flex items-center justify-center"
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-secondary" />
        ) : (
          <Sun className="w-5 h-5 text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 