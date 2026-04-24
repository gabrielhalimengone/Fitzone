/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#fff5f2',
          100: '#ffe6de',
          200: '#ffd1c2',
          300: '#ffaf99',
          400: '#ff7a5c',
          500: '#ff4500', // Orange Vif
          600: '#cc3700', // Hover Orange
          700: '#a32c00',
          800: '#822300',
          900: '#6b1d00',
        },
        dark: {
          950: '#050505',
          900: '#0A0A0A', // Noir Pur
          850: '#0F0F0F',
          800: '#111111', // Noir Charbon
          700: '#161616', // Fond Formulaire
          600: '#1A1A1A', // Fond Cartes
          500: '#1F1F1F', // Fond Champs
          400: '#222222', // Bordure Navbar
          300: '#2E2E2E', // Bordure Cartes
          200: '#333333', // Bordure Champs
          100: '#A0A0A0', // Sous-titres
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "radial-gradient(ellipse at 20% 50%, rgba(255,69,0,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,69,0,0.05) 0%, transparent 50%)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'count-up': 'countUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,69,0,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255,69,0,0.6)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-orange': '0 0 30px rgba(255,69,0,0.3)',
        'glow-sm': '0 0 15px rgba(255,69,0,0.15)',
        'card': '0 4px 24px rgba(0,0,0,0.15)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.25)',
        'dark-card': '0 4px 24px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
