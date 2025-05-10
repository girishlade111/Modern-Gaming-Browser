import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserProvider } from './contexts/BrowserContext';
import { BrowserFrame } from './components/layout/BrowserFrame';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserProvider>
        <BrowserFrame />
      </BrowserProvider>
    </ThemeProvider>
  );
}

export default App;