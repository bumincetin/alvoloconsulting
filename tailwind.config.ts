import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "void-black": "#020204",
        "obsidian-plate": "#0A0A0C",
        "electric-platinum": "#E5E4E2",
        "tungsten-grey": "#4A4A4A",
        "holographic-cyan": "#00F0FF",
        "deep-indigo": "#2E2E5E",
        void: "#020204",
        deep: "#0A0A0C",
        platinum: "#E5E4E2",
        "glass-surface": "rgba(229, 228, 226, 0.04)",
        "glass-border": "rgba(229, 228, 226, 0.12)",
        "glass-highlight": "rgba(229, 228, 226, 0.2)",
        "accent-cyan": "#00F0FF",
        "accent-purple": "#2E2E5E",
        "accent-orange": "#E5E4E2",
        "text-primary": "#E5E4E2",
        "text-muted": "#4A4A4A",
        "text-secondary": "#4A4A4A",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 20s infinite alternate cubic-bezier(0.215, 0.61, 0.355, 1)',
        'float-delayed': 'float 20s infinite alternate-reverse cubic-bezier(0.215, 0.61, 0.355, 1)',
        ticker: 'ticker 30s linear infinite',
        breathe: 'breathe 8s infinite ease-in-out',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin 30s linear infinite reverse',
        'fade-in': 'fadeIn 0.9s ease forwards',
        'slide-up': 'slideUp 0.9s ease forwards',
        blob: 'blob 9s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(100px, 50px) rotate(20deg)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 50px rgba(0,240,255,0.15)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 80px rgba(0,240,255,0.25)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(40px,-30px,0) scale(1.05)' },
          '66%': { transform: 'translate3d(-25px,25px,0) scale(0.95)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
