/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: '#FAF8F5',
        sand: '#E7D9C4',
        charcoal: '#2F2F2F',
        olive: '#6B7B4E',
        terracotta: '#C96A50'
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Merriweather', 'serif'],
        body: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        md: '10px',
        lg: '12px'
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0, 0, 0, 0.06)'
      },
      transitionDuration: {
        120: '120ms',
        180: '180ms',
        250: '250ms'
      }
    }
  },
  plugins: [],
}

