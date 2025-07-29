/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      // Define the 'Under the Moonlight' palette
      colors: {
        'lavender-soft': '#CCCCFF',
        'lavender-gray': '#A3A3CC',
        'deep-purple-blue': '#5C5C99',
        'dark-indigo': '#292966',
      },
      // Custom animations (ensure these match your index.css)
      keyframes: {
        'fade-in-down': {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          'from': { opacity: '0', transform: 'translateX(-50px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          'from': { opacity: '0', transform: 'translateX(50px)' },
          'to': { opacity: 1, transform: 'translateX(0)' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'fade-in-down-slow': {
          'from': { opacity: '0', transform: 'translateY(-40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up-slow': {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-1': {
          '0%': { transform: 'translate(0, 0) rotate(12deg)' },
          '50%': { transform: 'translate(-10px, 15px) rotate(15deg)' },
          '100%': { transform: 'translate(0, 0) rotate(12deg)' },
        },
        'float-2': {
          '0%': { transform: 'translate(0, 0) rotate(-6deg)' },
          '50%': { transform: 'translate(15px, -10px) rotate(-9deg)' },
          '100%': { transform: 'translate(0, 0) rotate(-6deg)' },
        },
        'float-3': {
          '0%': { transform: 'translate(0, 0) rotate(45deg)' },
          '50%': { transform: 'translate(-5px, -10px) rotate(48deg)' },
          '100%': { transform: 'translate(0, 0) rotate(45deg)' },
        },
        'float-4': {
          '0%': { transform: 'translate(0, 0) rotate(-30deg)' },
          '50%': { transform: 'translate(10px, 5px) rotate(-33deg)' },
          '100%': { transform: 'translate(0, 0) rotate(-30deg)' },
        },
        'float-5': {
          '0%': { transform: 'translate(0, 0) rotate(60deg)' },
          '50%': { transform: 'translate(-8px, -8px) rotate(63deg)' },
          '100%': { transform: 'translate(0, 0) rotate(60deg)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 1s ease-out forwards',
        'fade-in-up': 'fade-in-up 1s ease-out forwards 0.3s',
        'slide-in-left': 'slide-in-left 0.8s ease-out forwards 0.6s',
        'fade-in': 'fade-in 0.8s ease-out forwards 0.9s',
        'slide-in-right': 'slide-in-right 0.8s ease-out forwards 1.2s',
        'blob': 'blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'fade-in-down-slow': 'fade-in-down-slow 1.5s ease-out forwards',
        'fade-in-up-slow': 'fade-in-up-slow 1.5s ease-out forwards 0.5s',
        'fade-in-up-slower': 'fade-in-up-slow 1.5s ease-out forwards 1s',
        'float-1': 'float-1 10s ease-in-out infinite alternate',
        'float-2': 'float-2 12s ease-in-out infinite alternate',
        'float-3': 'float-3 9s ease-in-out infinite alternate',
        'float-4': 'float-4 11s ease-in-out infinite alternate',
        'float-5': 'float-5 13s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}
