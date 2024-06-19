import tailwindConfig from "./../tailwind.js";
import resolveConfig from 'tailwindcss/resolveConfig';

const colorMap = {
  primary: ["primaryLight", "primaryDark"],
  pink: ["pinkLight", "pinkDark"],
  purple: ["purpleLight", "purpleDark"],
  gray: ["grayLighter", "black"]
};

export const getHexColor = (color) => {
  const fullTailwindConfig = resolveConfig(tailwindConfig);
  const colorPalette = fullTailwindConfig.theme.colors;

  return colorPalette[color];
}

export const getColorPair = (color) => {
  
  return colorMap[color];
}

export const getColorPairHex = (color) => {
  const [backgroundColor, textColor] = getColorPair(color);

  const backgroundColorHex = getHexColor(backgroundColor);
  const textColorHex = getHexColor(textColor);

  return [backgroundColorHex, textColorHex];
}

