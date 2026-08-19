
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class', // сохраняем поддержку класса dark
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Добавляем кастомный вариант navy, привязанный к селектору .navy
    plugin(function({ addVariant }) {
      addVariant('navy', '.navy &')
    })
  ],
}
