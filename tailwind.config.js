/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hp: {
          black: '#0a0a0a',
          charcoal: '#1a1a1a',
          ink: '#111111',
          muted: '#555555',
          lightMuted: '#888888',
          border: '#000000',
          borderLight: '#d0d0d0',
          grayBg: '#f8f8f8',
          white: '#ffffff',
        }
      },
      fontFamily: {
        hpTitle: ['"Cinzel Decorative"', 'serif'],
        hpChapter: ['"Cinzel"', 'serif'],
        hpBody: ['"EB Garamond"', '"IM Fell English"', 'Georgia', 'serif'],
        hpEngraved: ['"IM Fell English"', 'serif'],
        medieval: ['"MedievalSharp"', 'cursive'],
      },
      letterSpacing: {
        'hp-wide': '0.25em',
        'hp-widest': '0.4em',
      },
    },
  },
  plugins: [],
}
