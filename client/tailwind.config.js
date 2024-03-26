/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1ec677',
        'primaryLight': '#ccf2d2',
        'primaryDark': '#007035',
        'background': '#fbf8f1',
        'alt': '#ffffff',
        'grayLight': '#4b5563',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

