/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'duo-gradient': 'linear-gradient(89.86deg,#E06C51 14.08%, #9572FC 34.08%, #43E7AD 80.94%, #E1D55D 94.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      },
      animation: {
        'gradient-x':'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
            '0%, 100%': {
                'background-size':'250% 250%',
                'background-position': 'left center'
            },
            '50%': {
                'background-size':'250% 250%',
                'background-position': 'right center'
            }
        },
      }
    },
  },
  important: true,
  plugins: [],
}
