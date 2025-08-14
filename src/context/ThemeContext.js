// src/context/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Define los colores aquí mismo
  const colors = {
    primary: '#ff4b91',
    secondary: '#fdbf33',
    background: isDarkMode 
      ? 'linear-gradient(135deg, #1a0a1f 0%, #2a1233 100%)' 
      : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
    text: isDarkMode ? '#ffffff' : '#333333'
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado con verificación
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
};