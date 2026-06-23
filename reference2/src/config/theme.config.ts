// Theme configuration - Toggle this to switch between old and new themes
export const USE_NEW_THEME = false;

// Theme definitions
export const themes = {
  old: {
    name: 'old',
    colors: {
      background: {
        primary: '#000000',
        secondary: '#000000',
      },
      text: {
        primary: '#ffffff',
        secondary: '#6b6b6b',
        gradient: {
          from: '#ffffff',
          via: '#6b6b6b',
          to: '#581c87', // purple-900
        },
      },
      accent: {
        primary: '#1e3a8a', // blue-900
        secondary: '#581c87', // purple-900
        navy: '#000080',
      },
    },
  },
  new: {
    name: 'new',
    colors: {
      background: {
        primary: '#0f172a', // slate-900
        secondary: '#1e293b', // slate-800
      },
      text: {
        primary: '#f1f5f9', // slate-100
        secondary: '#cbd5e1', // slate-300
        gradient: {
          from: '#06b6d4', // cyan-500
          via: '#8b5cf6', // violet-500
          to: '#a78bfa', // violet-400
        },
      },
      accent: {
        primary: '#06b6d4', // cyan-500
        secondary: '#14b8a6', // teal-500
        highlight: '#fbbf24', // amber-400
        violet: '#8b5cf6', // violet-500
      },
    },
  },
} as const;

// Get the current theme
export const getCurrentTheme = () => {
  return USE_NEW_THEME ? themes.new : themes.old;
};

// Helper to get theme data attribute value
export const getThemeDataAttribute = () => {
  return USE_NEW_THEME ? 'new' : 'old';
};
