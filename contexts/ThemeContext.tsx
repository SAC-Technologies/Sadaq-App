
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeConfig {
  AppBackground: string;
  GlobalTextColour: string;
  CounterArrowColour: string;
}

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
}

const defaultTheme: ThemeConfig = {
  AppBackground: '#000080',
  GlobalTextColour: '#FFFFFF',
  CounterArrowColour: '#FFFFFF',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(defaultTheme);

  const setTheme = (theme: ThemeConfig) => {
    console.log('Theme changed:', theme);
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeConfig must be used within a ThemeProvider');
  }
  return context;
}
