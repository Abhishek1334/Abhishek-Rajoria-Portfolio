import { useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

type Theme = 'light' | 'dark';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setThemeState(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    // Add smooth transition for theme changes
    document.documentElement.classList.add('theme-transition');
    return () => {
      document.documentElement.classList.remove('theme-transition');
    };
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    // Add smooth transition for theme changes
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
