"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';
import { text, border, background } from '@/lib/colors';

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {
  as?: 'input';
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {
  as: 'textarea';
}

type CombinedInputProps = InputProps | TextareaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedInputProps>(
  ({ label, error, helperText, fullWidth = false, className = '', as = 'input', ...props }, ref) => {
    const baseStyles = `
      px-4 py-3 rounded-lg border transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-1
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
      ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}
    `;

    const Element = as;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: text.secondary }}
          >
            {label}
          </label>
        )}
        <Element
          ref={ref as any}
          className={`${baseStyles} ${className}`}
          style={{
            borderColor: error ? '#EF4444' : border.default,
            backgroundColor: background.white,
            color: text.primary
          }}
          {...(props as any)}
        />
        {error && (
          <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm" style={{ color: text.muted }}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

