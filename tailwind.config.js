/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2a2a2a',
          850: '#1a1a1a',
          950: '#0a0a0a',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'glow-sm': '0 0 5px',
        'glow-md': '0 0 10px',
        'glow-lg': '0 0 15px',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
  // Important: This enables dynamic color classes needed by the theme system
  safelist: [
    { pattern: /bg-(purple|blue|green|red|orange)-500/ },
    { pattern: /border-(purple|blue|green|red|orange)-500/ },
    { pattern: /text-(purple|blue|green|red|orange)-500/ },
    { pattern: /shadow-\[0_0_\d+px_rgba\(\d+,\d+,\d+,0\.\d+\)\]/ },
    { pattern: /focus-within:border-(purple|blue|green|red|orange)-500/ },
  ],
};