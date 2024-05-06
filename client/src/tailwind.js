
const tailwindConfig = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1EC69A",
        primaryLight: "#C4FCDB",
        primaryDark: "#00705E",
        background: "#F8FBF1",
        alt: "#ffffff",
        grayLight: "#4b5563",
      },
      fontFamily: {
        righteous: ["Righteous", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
}

export default tailwindConfig;