/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#635FC7',
          hover: '#A8A4FF',
        },
        destructive: {
          DEFAULT: '#EA5555',
          hover: '#FF9898',
        },
        dark: {
          bg: '#20212C',
          card: '#2B2C37',
          lines: '#3E3F4E',
          subtext: '#828FA3',
          text: '#FFFFFF',
        },
        light: {
          bg: '#F4F7FD',
          card: '#FFFFFF',
          lines: '#E4EBFA',
          subtext: '#828FA3',
          text: '#000112',
        },
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        task: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)',
        taskHover: '0px 6px 12px 0px rgba(54, 78, 126, 0.15)',
        modal: '0px 10px 20px 0px rgba(54, 78, 126, 0.25)',
      },
      borderRadius: {
        card: '8px',
      },
    },
  },
  plugins: [],
};
