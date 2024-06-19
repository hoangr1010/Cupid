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

        grayLighter: "#E0E0E0",
        grayLight: "#828282",

        pinkLight: "#F48FB1",
        pink: "#E91E63",
        pinkDark: "#AD1457",

        purpleLight: "#9FA8DA",
        purpleDark: "#283593",
      },
      fontFamily: {
        dm: ["DM Sans", "sans-serif"],
        righteous: ["Righteous", "sans-serif"],
        darker: ["Darker Grotesque", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  safelist: [
    "bg-pinkLight",
    "text-pinkDark",
    "bg-purpleLight",
    "text-purpleDark",
    "bg-grayLighter",
    "text-black",
    "border-pinkLight",
    "border-purpleLight",
    "border-grayLighter",
  ],
};

export default tailwindConfig;
