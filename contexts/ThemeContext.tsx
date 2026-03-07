
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Theme {
  id: string;
  name: string;
  bgType: 'color' | 'image';
  bgValue: string | number;
  textColor: string;
  isPremium: boolean;
}

interface ThemeContextType {
  activeTheme: Theme;
  changeTheme: (themeId: string) => void;
  themes: Theme[];
}

const THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    bgType: 'color',
    bgValue: '#A4CFDB',
    textColor: '#FFFFFF',
    isPremium: false,
  },
  {
    id: 'ottoman',
    name: 'Ottoman',
    bgType: 'image',
    bgValue: require('../assets/images/a9a9f69a-ac02-44a7-bbdb-e50b2dd2f5c9.jpeg'),
    textColor: '#FFFFFF',
    isPremium: false,
  },
  {
    id: 'alaouite',
    name: 'Alaouite',
    bgType: 'image',
    bgValue: require('../assets/images/ae9e0222-8f1e-45ca-98ed-745953121c10.jpeg'),
    textColor: '#FDF8E4',
    isPremium: false,
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);

  const changeTheme = useCallback((themeId: string) => {
    console.log('Changing theme to:', themeId);
    const newTheme = THEMES.find((theme) => theme.id === themeId);
    if (newTheme) {
      setActiveTheme(newTheme);
      console.log('Theme changed successfully:', newTheme.name);
    } else {
      console.warn('Theme not found:', themeId);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ activeTheme, changeTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Legacy hook for backward compatibility with existing code
export function useThemeConfig() {
  const { activeTheme } = useTheme();
  return {
    currentTheme: {
      AppBackground: activeTheme.bgValue,
      GlobalTextColour: activeTheme.textColor,
      CounterArrowColour: activeTheme.textColor,
    },
    setTheme: () => {
      console.warn('setTheme is deprecated. Use changeTheme from useTheme hook instead.');
    },
  };
}
