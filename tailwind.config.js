/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
        display: ['"Baloo 2"', '"Nunito"', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#3B82F6',
          sky: '#60A5FA',
          purple: '#8B5CF6',
          lilac: '#C4B5FD',
          yellow: '#FBBF24',
          sand: '#FEF3C7',
          mint: '#34D399',
          cream: '#FFF7ED',
        },
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(59, 130, 246, 0.18)',
        card: '0 20px 50px -20px rgba(139, 92, 246, 0.22)',
        glow: '0 0 0 6px rgba(251, 191, 36, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatySlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(4deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'floaty-slow': 'floatySlow 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out both',
        pop: 'pop 0.6s ease-out both',
        wiggle: 'wiggle 2.5s ease-in-out infinite',
        'spin-slow': 'spinSlow 18s linear infinite',
      },
    },
  },
  plugins: [],
};
