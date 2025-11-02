"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { background, border, shadows } from '@/lib/colors';
import { prefersReducedMotion } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export default function Card({ 
  children, 
  hover = false, 
  className = '',
  onClick,
  padding = 'md',
  style: customStyle
}: CardProps) {
  const reducedMotion = typeof window !== 'undefined' && prefersReducedMotion();

  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseStyles = `
    rounded-xl border transition-all duration-200
    ${paddingStyles[padding]}
    ${onClick ? 'cursor-pointer' : ''}
  `;

  const cardStyle = {
    backgroundColor: background.white,
    borderColor: border.light,
    boxShadow: `0 2px 8px ${shadows.subtle}`,
    ...customStyle
  };

  const hoverStyle = hover && !reducedMotion ? {
    scale: 1.03,
    y: -4,
    boxShadow: `0 12px 32px ${shadows.subtle}`
  } : {};

  return (
    <motion.div
      className={`${baseStyles} ${className}`}
      style={cardStyle}
      whileHover={hoverStyle}
      whileTap={onClick && !reducedMotion ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.15 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

