import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'neue-montreal': ['PPNeueMontreal-Bold', 'sans-serif'],
      },
      colors: {
        "nice-gray":"#6b6b6b",
        // Theme-aware colors using CSS variables
        "theme-bg-primary": "var(--bg-primary)",
        "theme-bg-secondary": "var(--bg-secondary)",
        "theme-text-primary": "var(--text-primary)",
        "theme-text-secondary": "var(--text-secondary)",
        "theme-accent-primary": "var(--accent-primary)",
        "theme-accent-secondary": "var(--accent-secondary)",
        "theme-accent-navy": "var(--accent-navy)",
        "theme-accent-highlight": "var(--accent-highlight)",
        "theme-accent-violet": "var(--accent-violet)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
  variants: {
    extend: {
      scale: ['active'],
    },
  },
};

export default config;