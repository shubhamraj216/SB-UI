"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { brand, gradients, text, shadows } from '@/lib/colors';
import { prefersReducedMotion } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  loading = false,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  style: customStyle
}: ButtonProps) {
  const reducedMotion = typeof window !== 'undefined' && prefersReducedMotion();

  const baseStyles = `
    font-semibold rounded-lg transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${fullWidth ? 'w-full' : ''}
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantStyles = {
    primary: {
      background: gradients.navySky,
      color: '#FFFFFF',
      hoverScale: 1.02,
      boxShadow: `0 4px 12px ${shadows.navyGlow}`,
      focusRing: brand.navy
    },
    secondary: {
      background: gradients.skyBlue,
      color: '#FFFFFF',
      hoverScale: 1.02,
      boxShadow: `0 4px 12px ${shadows.skyGlow}`,
      focusRing: brand.sky
    },
    ghost: {
      background: 'transparent',
      color: text.primary,
      hoverScale: 1.0,
      boxShadow: 'none',
      focusRing: brand.navyLight
    },
    outline: {
      background: 'transparent',
      color: brand.navy,
      hoverScale: 1.0,
      boxShadow: 'none',
      focusRing: brand.navy
    }
  };

  const style = variantStyles[variant];

  const buttonStyle = {
    background: style.background,
    color: style.color,
    ...(variant === 'outline' && { border: `2px solid ${brand.navy}` }),
    ...customStyle
  };

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${className}`}
      style={buttonStyle}
      whileHover={!disabled && !reducedMotion ? { 
        scale: variant === 'ghost' || variant === 'outline' ? 1.02 : 1.05,
        boxShadow: style.boxShadow,
        y: -2
      } : undefined}
      whileTap={!disabled && !reducedMotion ? { scale: 0.95, y: 0 } : undefined}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2 whitespace-nowrap">
          {children}
        </span>
      )}
    </motion.button>
  );
}

