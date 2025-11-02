"use client";

import { ReactNode } from 'react';
import { state, jobState } from '@/lib/colors';

interface BadgeProps {
  children?: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'under_review' | 'verified' | 'live' | 'featured';
  size?: 'sm' | 'md';
}

export default function Badge({ children, variant = 'info', size = 'md' }: BadgeProps) {
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  const variantStyles = {
    success: {
      bg: state.successLight,
      color: '#065F46',
      text: children || 'Success'
    },
    warning: {
      bg: state.warningLight,
      color: '#92400E',
      text: children || 'Warning'
    },
    error: {
      bg: state.errorLight,
      color: '#991B1B',
      text: children || 'Error'
    },
    info: {
      bg: state.infoLight,
      color: '#1E40AF',
      text: children || 'Info'
    },
    under_review: {
      bg: state.warningLight,
      color: '#92400E',
      text: 'Under Review'
    },
    verified: {
      bg: state.successLight,
      color: '#065F46',
      text: 'Verified'
    },
    live: {
      bg: state.infoLight,
      color: '#075985',
      text: 'Live'
    },
    featured: {
      bg: '#FEF3C7',
      color: '#92400E',
      text: '⭐ Featured'
    }
  };

  const style = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeStyles[size]}`}
      style={{
        backgroundColor: style.bg,
        color: style.color
      }}
    >
      {style.text}
    </span>
  );
}

