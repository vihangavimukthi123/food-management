export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        forest: '#0f231a',
        botanical: '#1d4631',
        moss: '#2e5a41',
        sage: '#a7b79a',
        olive: '#6c6a3a',
        terracotta: '#c0623f',
        burnt: '#a6461f',
        honey: '#d9a441',
        champagne: '#e6d3a3',
        cream: '#f3ebdb',
        ivory: '#faf6ee',
        beige: '#e6d8bf',
        cocoa: '#24170f',
        earth: '#5c3f2c',
        ink: '#15120f',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
}
