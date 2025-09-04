/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          main: '#000064', // Dark blue - primary (good contrast on light)
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c1c1ff',
          300: '#a2a2ff',
          400: '#8383ff',
          500: '#000064',
          600: '#000050',
          700: '#00003c',
          800: '#000028',
          900: '#000014',
        },
        secondary: {
          main: '#D4DDF6', // Light blue - secondary (good contrast on dark)
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#D4DDF6',
          600: '#B8C7F0',
          700: '#9CB1EA',
          800: '#809BE4',
          900: '#6485DE',
        },
        accent: {
          purple: '#635AB2',
          violet: '#2900E5',
          light: '#D4DDF6',
        },
        // Terminal colors for TX/RX - more readable
        terminal: {
          tx: '#00ff88', // Bright green for TX
          rx: '#00aaff', // Bright blue for RX
          err: '#ff4444', // Red for errors
          info: '#ffaa00', // Orange for info
        },
        // Brand colors for better contrast
        brand: {
          primary: '#000064', // Dark blue for primary actions
          secondary: '#D4DDF6', // Light blue for secondary elements
          accent: '#635AB2', // Purple for accents
        },
        // Better selection and highlight colors
        selection: {
          light: '#3b82f6', // Blue for light theme selection
          dark: '#60a5fa', // Lighter blue for dark theme selection
        }
      }
    },
  },
  plugins: [],
}
