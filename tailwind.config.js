/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DAFF72',
        secondary: '#FE9A66',
        tertiary: '#1A2529',
        complementary1: '#19DF62',
        complementary2: '#266317',
        gray1: '#DCE4DB',
        gray2: '#7D7D7D',
        greenLight: '#F1F5EA',
      },
      lineHeight: {
        '11': '4.5rem',
      }
    },
  },
  plugins: [],
}
