
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  hapticsEnabled: boolean;
  showTransliteration: boolean;
  showMeaning: boolean;
  toggleHaptics: () => void;
  toggleTransliteration: () => void;
  toggleMeaning: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);

  const toggleHaptics = () => {
    console.log('Toggling haptics:', !hapticsEnabled);
    setHapticsEnabled((prev) => !prev);
  };

  const toggleTransliteration = () => {
    console.log('Toggling transliteration:', !showTransliteration);
    setShowTransliteration((prev) => !prev);
  };

  const toggleMeaning = () => {
    console.log('Toggling meaning:', !showMeaning);
    setShowMeaning((prev) => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        hapticsEnabled,
        showTransliteration,
        showMeaning,
        toggleHaptics,
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
