/**
 * Scholar Bharat Color Scheme
 * Professional hiring platform with off-white, navy blue, and sky blue
 */

export const colors = {
  // Background colors - off-white theme
  background: {
    primary: '#F8FAFC',
    secondary: '#F1F5F9',
    white: '#FFFFFF',
  },

  // Text colors
  text: {
    primary: '#0F172A',
    secondary: '#1E293B',
    muted: '#64748B',
    light: '#94A3B8',
  },

  // Primary brand colors - professional blues
  brand: {
    navyDark: '#1E3A8A',
    navy: '#1E40AF',
    navyLight: '#3B82F6',
    skyBright: '#38BDF8',
    sky: '#0EA5E9',
    skyDark: '#0284C7',
  },

  // Accent colors for CTAs
  accent: {
    emerald: '#10B981',
    emeraldLight: '#D1FAE5',
    emeraldDark: '#059669',
    orange: '#F97316',
    orangeLight: '#FFEDD5',
    orangeDark: '#EA580C',
  },

  // Gradients (as CSS gradient strings)
  gradients: {
    background: 'linear-gradient(to bottom right, #F8FAFC, #F1F5F9)',
    navyBlue: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
    skyBlue: 'linear-gradient(90deg, #0EA5E9, #38BDF8)',
    navySky: 'linear-gradient(135deg, #1E40AF, #0EA5E9)',
    subtle: 'linear-gradient(to bottom right, rgba(30, 58, 138, 0.03), rgba(14, 165, 233, 0.05))',
  },

  // Radial gradients for floating blobs
  radialGradients: {
    navy: 'radial-gradient(circle at 30% 30%, rgba(30, 58, 138, 0.15), transparent 50%)',
    sky: 'radial-gradient(circle at 70% 70%, rgba(56, 189, 248, 0.12), transparent 50%)',
  },

  // Opacity variations for overlays and borders
  dark: {
    '5': 'rgba(15, 23, 42, 0.05)',
    '8': 'rgba(15, 23, 42, 0.08)',
    '10': 'rgba(15, 23, 42, 0.10)',
    '12': 'rgba(15, 23, 42, 0.12)',
    '15': 'rgba(15, 23, 42, 0.15)',
    '20': 'rgba(15, 23, 42, 0.20)',
    '40': 'rgba(15, 23, 42, 0.40)',
    '60': 'rgba(15, 23, 42, 0.60)',
    '80': 'rgba(15, 23, 42, 0.80)',
  },

  // Border colors
  border: {
    light: '#E2E8F0',
    default: '#CBD5E1',
    dark: '#94A3B8',
  },

  // Shadow colors
  shadows: {
    navyGlow: 'rgba(30, 58, 138, 0.2)',
    skyGlow: 'rgba(14, 165, 233, 0.15)',
    subtle: 'rgba(15, 23, 42, 0.08)',
  },

  // State colors
  state: {
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
  },

  // Job states
  jobState: {
    underReview: '#F59E0B',
    verified: '#10B981',
    live: '#0EA5E9',
  },
} as const;

// Export individual color groups for convenience
export const { background, text, brand, accent, gradients, radialGradients, dark, border, shadows, state, jobState } = colors;

// Utility function to get color by path
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let result: any = colors;
  
  for (const key of keys) {
    result = result[key];
    if (!result) return '';
  }
  
  return result;
};

