/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'tajwal': ['Tajwal', 'sans-serif'],
      },
      colors: {
        'quartz': {
          50: '#fef7ee',
          100: '#fdedd7',
          200: '#fad6ae',
          300: '#f6b97a',
          400: '#f19344',
          500: '#ed751e',
          600: '#de5b14',
          700: '#b84613',
          800: '#933817',
          900: '#772f16',
          950: '#40160a',
        },
        'quartz-orange': '#ed751e',
        'quartz-dark': '#1a1a1a',
        'quartz-light': '#f8f9fa',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}