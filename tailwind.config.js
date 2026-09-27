/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec4ff',
          400: '#59a2ff',
          500: '#317efc',
          600: '#1b5ff0',
          700: '#1548dc',
          800: '#173bb2',
          900: '#18348c',
          950: '#0f2056',
        },
        navy: {
          800: '#132845',
          850: '#0f223d',
          900: '#0b192e',
          950: '#07101f',
        },
        brandYellow: {
          400: '#ffd043',
          500: '#ffc72c',
          600: '#f0b012',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
