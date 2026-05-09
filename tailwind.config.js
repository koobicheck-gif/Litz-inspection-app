/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        army: {
          50:  '#F5F4ED',
          100: '#E8E6D6',
          200: '#CDC9A8',
          300: '#A9A476',
          400: '#8B9D5C',
          500: '#6B7B42',
          600: '#5C6E3C',
          700: '#4A5832',
          800: '#3D4A2A',
          900: '#2A331C',
          950: '#1F2A14',
        },
        warning: '#C9A227',
        danger:  '#A63D2A',
        paper:   '#F5F3EE',
        ink:     '#1F2A14',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

