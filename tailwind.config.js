/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary1': '#F8FFE9',
        'primary2': '#E8FFB8',
        'primary6': '#94D60A',
      },
      fontFamily: {
        labelReguler: ['labelReguler'],
        labelSemiBold: ['labelSemiBold'],
        labelMedium: ['labelMedium'],
        labelBold: ['labelBold'],
      },
    },
  },
  plugins: [],
}
