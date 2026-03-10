
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  showArabic: boolean;
  showTransliteration: boolean;
  showMeaning: boolean;
  toggleArabic: () => void;
  toggleTransliteration: () => void;
  toggleMeaning: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showArabic, setShowArabic] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);

  const toggleArabic = () => {
    setShowArabic((prev) => !prev);
  };

  const toggleTransliteration = () => {
    setShowTransliteration((prev) => !prev);
  };

  const toggleMeaning = () => {
    setShowMeaning((prev) => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        showArabic,
        showTransliteration,
        showMeaning,
        toggleArabic,
        toggleTransliteration,
        toggleMeaning,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
