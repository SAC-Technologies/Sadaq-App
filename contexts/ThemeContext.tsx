
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
  },
  {
    id: 'ottoman',
    name: 'Ottoman',
    bgType: 'image',
    bgValue: require('../assets/images/d0075963-5877-45d0-b52c-ce99f1b0c60a.jpeg'),
    textColor: '#FFFFFF',
    headerColor: '#1A4E91',
    isPremium: false,
    price: null,
  },
  {
    id: 'alaouite',
    name: 'Alaouite',
    bgType: 'image',
    bgValue: require('../assets/images/f9ae6fa3-9dc9-4e3d-930b-68519bdae7ba.jpeg'),
    textColor: '#FDF8E4',
    headerColor: '#0D2B26',
    isPremium: false,
    price: null,
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
    console.log('Changing theme to:', themeId);
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

// Legacy hook for backward compatibility
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
