/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#1f1f1f',
        primary: 'var(--el-color-primary)',
        text_color_primary: 'var(--el-text-color-primary)'
      }
    }
  },
  plugins: []
}
