# Theme System Guide

## Overview

Your portfolio now has a developer-configurable theme system that allows you to switch between the original dark theme and a modern color scheme with a single configuration change.

## How to Switch Themes

To toggle between themes, edit the configuration file:

**File:** `src/config/theme.config.ts`

```typescript
// Set to false for the old/original theme
export const USE_NEW_THEME = false;

// Set to true for the new modern theme
export const USE_NEW_THEME = true;
```

Simply change the boolean value and refresh your browser - no build required!

## Theme Colors

### Original Theme (Old)
- Background: Pure black (#000000)
- Text: White with gray/purple gradients
- Accents: Navy blue (#000080), Blue-900, Purple-900

### New Modern Theme
- Primary Background: Deep slate (#0f172a)
- Secondary Background: Dark slate (#1e293b)
- Text Primary: Off-white (#f1f5f9)
- Text Secondary: Light slate (#cbd5e1)
- Accent Primary: Cyan (#06b6d4)
- Accent Secondary: Teal (#14b8a6)
- Accent Highlight: Amber (#fbbf24)
- Accent Violet: Violet (#8b5cf6)

## Technical Implementation

### Architecture
1. **Theme Config** (`src/config/theme.config.ts`): Central configuration
2. **CSS Variables** (`src/styles/globals.css`): Theme-specific CSS custom properties
3. **Tailwind Classes** (`tailwind.config.ts`): Utility classes for theme colors
4. **Theme Provider** (`src/components/ThemeProvider.tsx`): Applies theme to entire app

### Files Modified
- `src/pages/_app.tsx` - Wrapped with ThemeProvider
- `src/pages/index.tsx` - Updated with theme-aware colors
- `src/components/navbar/Navbar.tsx` - Made theme-aware
- `src/components/PortfolioPage.tsx` - Updated Navbar styling
- `src/components/MidPortfolioPage.tsx` - Theme-aware backgrounds and text
- `src/components/OldPortfolioPage.tsx` - Theme-aware backgrounds and text
- `src/styles/globals.css` - Added CSS variables for both themes
- `tailwind.config.ts` - Extended with theme color tokens

### Available Tailwind Classes
Use these classes in your components for theme-aware styling:
- `bg-theme-bg-primary` - Primary background color
- `bg-theme-bg-secondary` - Secondary background color
- `text-theme-text-primary` - Primary text color
- `text-theme-text-secondary` - Secondary text color
- `text-theme-accent-primary` - Primary accent color
- `text-theme-accent-secondary` - Secondary accent color
- `bg-theme-accent-primary` - Primary accent background
- `bg-theme-accent-secondary` - Secondary accent background

### CSS Variables
For more complex styling, use CSS variables directly:
```css
style={{
  background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))'
}}
```

Available variables:
- `--bg-primary`, `--bg-secondary`
- `--text-primary`, `--text-secondary`
- `--text-gradient-from`, `--text-gradient-via`, `--text-gradient-to`
- `--accent-primary`, `--accent-secondary`
- `--accent-highlight`, `--accent-violet`, `--accent-navy`

## Adding More Themes

To add additional themes:

1. Add theme definition in `src/config/theme.config.ts`
2. Add corresponding CSS variables in `src/styles/globals.css` with a new data attribute
3. Update the `getThemeDataAttribute()` function to return the new theme name

## Notes

- All existing functionality is preserved
- Zero runtime overhead (static configuration)
- Type-safe theme definitions
- Easy to extend with more themes in the future
- Windows 95 styled page (PortfolioPage) keeps its retro aesthetic while respecting Navbar theme
