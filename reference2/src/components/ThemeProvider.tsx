import React, { useEffect } from 'react';
import { getThemeDataAttribute } from '@/config/theme.config';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  useEffect(() => {
    // Set the theme data attribute on the document element
    const theme = getThemeDataAttribute();
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
