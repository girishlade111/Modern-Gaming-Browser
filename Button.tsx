import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  glowing?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  glowing = false,
  className = '',
  children,
  ...props
}) => {
  const { accentColor, glowIntensity } = useTheme();

  const baseStyles = 'rounded-2xl transition-all duration-300 font-medium flex items-center justify-center';
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-2.5'
  };

  const accentColorStyles = {
    purple: {
      bg: 'bg-purple-600',
      hover: 'hover:bg-purple-500',
      border: 'border-purple-500',
      text: 'text-purple-500',
      glow: `shadow-[0_0_${glowIntensity}px_rgba(147,51,234,0.7)]`
    },
    blue: {
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-500',
      border: 'border-blue-500',
      text: 'text-blue-500',
      glow: `shadow-[0_0_${glowIntensity}px_rgba(59,130,246,0.7)]`
    },
    green: {
      bg: 'bg-green-600',
      hover: 'hover:bg-green-500',
      border: 'border-green-500',
      text: 'text-green-500',
      glow: `shadow-[0_0_${glowIntensity}px_rgba(34,197,94,0.7)]`
    },
    red: {
      bg: 'bg-red-600',
      hover: 'hover:bg-red-500',
      border: 'border-red-500',
      text: 'text-red-500',
      glow: `shadow-[0_0_${glowIntensity}px_rgba(239,68,68,0.7)]`
    },
    orange: {
      bg: 'bg-orange-600',
      hover: 'hover:bg-orange-500',
      border: 'border-orange-500',
      text: 'text-orange-500',
      glow: `shadow-[0_0_${glowIntensity}px_rgba(249,115,22,0.7)]`
    }
  };

  const colorStyles = accentColorStyles[accentColor];

  const variantStyles = {
    primary: `${colorStyles.bg} ${colorStyles.hover} text-white ${glowing ? colorStyles.glow : ''}`,
    secondary: `bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white`,
    ghost: `bg-transparent hover:bg-gray-800 ${colorStyles.text}`
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  return (
    <button className={buttonStyles} {...props}>
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </button>
  );
};