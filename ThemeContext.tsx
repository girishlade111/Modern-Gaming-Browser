import React, { createContext, useContext, useState } from 'react';

type AccentColor = 'purple' | 'blue' | 'green' | 'red' | 'orange';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  glowIntensity: number;
  setGlowIntensity: (intensity: number) => void;
}

const defaultContext: ThemeContextType = {
  darkMode: true,
  toggleDarkMode: () => {},
  accentColor: 'purple',
  setAccentColor: () => {},
  glowIntensity: 3,
  setGlowIntensity: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [accentColor, setAccentColor] = useState<AccentColor>('purple');
  const [glowIntensity, setGlowIntensity] = useState<number>(3);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const value = {
    darkMode,
    toggleDarkMode,
    accentColor,
    setAccentColor,
    glowIntensity,
    setGlowIntensity,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};