/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        here: {
          primary: '#1F5F80',
          onPrimary: '#FFFFFF',
          bg: '#F7F5EE',
          surface: '#FFFFFF',
          text: '#14313F',
          muted: '#5B6B73',
          tint: '#E3EEF3',
          border: '#E6E2D6',
          mutedTile: '#EEEAE0',
          successBg: '#DDF1E4',
          successFg: '#1D6B3A',
          warningBg: '#F6EBD0',
          warningFg: '#7A5A12',
          dangerBg: '#FBE4E1',
          dangerFg: '#9A2A1E',
          danger: '#B3261E',
        },
      },
      borderRadius: {
        here: '12px',
        'here-card': '14px',
      },
      fontFamily: {
        sans: [
          '"Manrope Variable"',
          'Manrope',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
