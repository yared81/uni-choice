/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced color palette with sophisticated gradients
        offwhite: '#FAF8F5',
        sand: '#E7D9C4',
        charcoal: '#1A1A1A',
        olive: {
          DEFAULT: '#6B7B4E',
          50: '#F4F6F2',
          100: '#E8ECE4',
          200: '#D1D9C9',
          300: '#B5C2A8',
          400: '#8FA077',
          500: '#6B7B4E',
          600: '#546240',
          700: '#424A33',
          800: '#323627',
          900: '#1F2218',
        },
        terracotta: {
          DEFAULT: '#C96A50',
          50: '#FDF4F2',
          100: '#FAE7E0',
          200: '#F5CFC1',
          300: '#EDB09B',
          400: '#E3886E',
          500: '#C96A50',
          600: '#B1553C',
          700: '#924332',
          800: '#77392A',
          900: '#5E2D21',
        },
        gold: '#D4AF37',
        sage: '#9CAF88',
      },
      fontFamily: {
        heading: ['"Playfair Display"', '"Cormorant Garamond"', 'Merriweather', 'serif'],
        body: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0, 0, 0, 0.06)',
        medium: '0 12px 40px rgba(0, 0, 0, 0.08)',
        large: '0 20px 60px rgba(0, 0, 0, 0.12)',
        'glow-olive': '0 0 20px rgba(107, 123, 78, 0.3)',
        'glow-terracotta': '0 0 20px rgba(201, 106, 80, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-smooth': 'linear-gradient(135deg, rgba(107, 123, 78, 0.1) 0%, rgba(201, 106, 80, 0.1) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(107, 123, 78, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(107, 123, 78, 0.8)' },
        },
      },
      transitionDuration: {
        120: '120ms',
        180: '180ms',
        250: '250ms',
        300: '300ms',
        400: '400ms',
      },
      backdropBlur: {
        xs: '2px',
      },
    }
  },
  plugins: [],
}
