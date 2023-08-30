/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  darkMode: 'class',
  theme: {
    colors: {
      't-color-base': 'var(--my-text-base-color)',
      'special': '#fff',
      'bg-base': 'var(--my-bg-base-color)',
      'bg-mild': 'var(--my-bg-mild)',
    },
    fontSize: {
      // 12px 16px
      'xs': ['0.75rem', '1rem'],
      // 13px 16px
      '2xs': ['0.625rem', '0.75rem'],
      // 14px 20px
      'sm': ['0.875rem', '1.25rem'],
      // 16px 24px
      'base': ['1rem', '1.5rem'],
      // 18px 28px
      'lg': ['1.125rem', '1.75rem'],
      // 20px 28px
      'xl': ['1.25rem', '1.75rem'],
      // 24px 32px
      '2xl': ['1.5rem', '2rem'],
      // 30px 36px
      '3xl': ['1.875rem', '2.25rem'],
      // 36px 46.4px
      '4xl': ['2.25rem', '2.9rem'],
      // 48px 1
      '5xl': ['3rem', '1'],
      // 60px 1
      '6xl': ['3.75rem', '1'],
      // 72px 1
      '7xl': ['4.5rem', '1'],
      // 96px 1
      '8xl': ['6rem', '1'],
      // 128px 1
      '9xl': ['8rem', '1'],
    },
    screens: {
      // => @media (max-width: 1535px) { ... }
      'max-2xl': { max: '1535px' },
      // => @media (max-width: 1279px) { ... }
      'max-xl': { max: '1279px' },
      // => @media (max-width: 1023px) { ... }
      'max-lg': { max: '1023px' },
      // => @media (max-width: 895px) { ... }
      'max-2md': { max: '895px' },
      // => @media (max-width: 767px) { ... }
      'max-md': { max: '767px' },
      // => @media (max-width: 639px) { ... }
      'max-sm': { max: '639px' },
      // => @media (max-width: 500px) { ... }
      'max-xs': { max: '500px' },
      // => @media (min-width: 1535px) { ... }
      'min-2xl': { min: '1535px' },
      // => @media (min-width: 1279px) { ... }
      'min-xl': { min: '1279px' },
      // => @media (min-width: 1023px) { ... }
      'min-lg': { min: '1023px' },
      // => @media (min-width: 767px) { ... }
      'min-md': { min: '767px' },
      // => @media (min-width: 639px) { ... }
      'min-sm': { min: '639px' },
    },
    extend: {
      keyframes: {
        'move-down': {
          '0%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  content: [],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.scss',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 0,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
}
