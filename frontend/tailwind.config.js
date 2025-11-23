/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0A0A0A',
        primary: '#00F0FF',
        secondary: '#7000FF',
        accent: '#FFD700',
        glass: 'rgba(255, 255, 255, 0.03)',
        'glass-hover': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'scroll': 'scroll 40s linear infinite',
        'spin-slow': 'spin 10s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(2px, 2px)' },
          '100%': { transform: 'translate(0)' },
        }
      }
    }
  },
  plugins: [],
};
