module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'red': 'rgb(255, 17, 100)',
      'orange': '#ff7849',
      'green': '#13ce66',
      'white': '#f1f1f1',
      'dark': '#282C33',
      'gray': {
        300: 'rgba(195,195,195,0.3)',
        500: 'rgba(195,195,195,0.5)',
        800: 'rgba(195,195,195,0.8)',
        DEFAULT: '#c3c3c3'
      }
    },
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    listStyleType: {
      square: 'square'
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '920px',
      'xl': '1280px',
      '2xl': '1400px',
    },
    extend: {
      gridTemplateColumns: {
        'custom': 'repeat(auto-fill, minmax(240px, 1fr))',
        'custom-5': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      boxShadow: {
        '2p': '2px 2px 0 #ccc',
        '4p': '4px 4px 0 #ccc',
        '8p': '8px 8px 0 #ccc',
      }
    }
  },
}
