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
      colors: {
        'space': {
          '400': '#6791A2',
          '500': '#46ACAF',
          '700': '#2B2D42',
        }
      },
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'neon-gradient': 'linear-gradient(90deg,#FCA08B 1.08%, #9572FC 34.08%, #43E7AD 80.94%, #E1D55D 94.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      },
      animation: {
        'gradient-x':'gradient-x 3s ease infinite',
        'fade-in-down': 'fade-in-down 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        'fade-in-top': 'fade-in-top 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        'fade-in-left': 'fade-in-left 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) 0.5s both',
        'fade-in-right': 'fade-in-right 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) 0.5s both',
        'fade-in-right-back': 'fade-in-right-back 1s cubic-bezier(0.680, -0.550, 0.265, 1.550) 0.7s both',
        'fade-in-forward': 'fade-in-forward 0.5s cubic-bezier(0.680, -0.550, 0.265, 1.550) 0.3s both',
        'contentShow': 'contentShow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
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
        'fade-in-down': {
          '0%': {
              opacity: '0',
              transform: 'translateY(-100px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
        },
        'fade-in-top': {
          '0%': {
              opacity: '0',
              transform: 'translateY(100px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
        },
        'fade-in-left': {
          '0%': {
              opacity: '0',
              transform: 'translateX(-1000px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateX(0)'
          },
        },
        'fade-in-right': {
          '0%': {
              opacity: '0',
              transform: 'translateX(1000px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateX(0)'
          },
          
        },
        'fade-in-right-back': {
          '0%': {
              opacity: '0',
              transform: 'translateX(1000px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateX(0)'
          },
        },
        'fade-in-forward': {
          '0%': {
            opacity: '0',
            transform: 'translateZ(-1000px)'
        },
        '100%': {
            opacity: '1',
            transform: 'translateZ(0)'
        },
        },
        'contentShow': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.96)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
      }
    },
  },
  important: true,
  plugins: [],
}
