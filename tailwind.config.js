/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0c10',
        surface: '#111318',
        accent: '#c8b97a',
        muted: '#6b6b60',
        text: '#f0ede6',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        marquee: 'marquee 18s linear infinite',
        'draw-check': 'drawCheck 0.6s ease forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drawCheck: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
