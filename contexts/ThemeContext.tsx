
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface Theme {
  id: string;
  name: string;
  bgType: 'color' | 'image';
  bgValue: string | ImageSourcePropType;
  textColor: string;
  headerColor: string;
  isPremium: boolean;
  price: string | null;
  overlayOpacity: number;
}

const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    bgType: 'color',
    bgValue: '#A4CFDB',
    textColor: '#FFFFFF',
    headerColor: '#A4CFDB',
    isPremium: false,
    price: null,
    overlayOpacity: 0,
  },
  {
    id: 'ottoman',
    name: 'Ottoman',
    bgType: 'image',
    bgValue: require('../assets/images/ada424d2-bf03-4978-a567-4a2e3fbf171a.jpeg'),
    textColor: '#FFFFFF',
    headerColor: '#1A4E91',
    isPremium: false,
    price: null,
    overlayOpacity: 0.15,
  },
  {
    id: 'alaouite',
    name: 'Alaouite',
    bgType: 'image',
    bgValue: require('../assets/images/03dfebd5-eb8c-4535-ab85-4d79ad385307.jpeg'),
    textColor: '#FDF8E4',
    headerColor: '#0D2B26',
    isPremium: false,
    price: null,
    overlayOpacity: 0,
  },
  {
    id: 'night',
    name: 'Night',
    bgType: 'image',
    bgValue: require('../assets/images/d2b7cc17-c328-496f-bdaf-d6f5e296ae91.jpeg'),
    textColor: '#F0F8FF',
    headerColor: '#0A0E17',
    isPremium: false,
    price: null,
    overlayOpacity: 0,
  },
];

interface ThemeContextType {
  activeTheme: Theme;
  themes: Theme[];
  changeTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [activeThemeId, setActiveThemeId] = useState<string>('default');
  const activeTheme = themes.find(theme => theme.id === activeThemeId) || themes[0];

  const changeTheme = (themeId: string) => {
    setActiveThemeId(themeId);
  };

  return (
    <ThemeContext.Provider value={{ activeTheme, themes, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export function useThemeConfig() {
  const { activeTheme } = useTheme();
  return {
    currentTheme: {
      AppBackground: activeTheme.bgType === 'color' ? activeTheme.bgValue as string : '#A4CFDB',
      GlobalTextColour: activeTheme.textColor,
      CounterArrowColour: activeTheme.textColor,
    },
  };
}
