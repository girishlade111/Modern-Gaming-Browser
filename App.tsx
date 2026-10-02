import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { BrowserProvider } from './BrowserContext';
import { BrowserFrame } from './BrowserFrame';
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