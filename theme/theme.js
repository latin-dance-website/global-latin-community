import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    purple: "#8547E6",
    pink: "#F63C80",
    blue: "#3C71FF",
    darkblue: "#07037C",
    orange: "#FF4649",
    darkpurple: "#4A42B2",
  },
};

const components = {
  Button: {
    sizes: {
      xl: {
        h: "70px", // Height
        fontSize: "2xl", // Font size
        px: "48px", // Horizontal padding
      },
    },
  },
};

const fonts = {
  fonts: {
    montserrat: `'Montserrat', sans-serif`,
    montserratAlt: `'montserratAlt', sans-serif`,
  },
};

const theme = extendTheme({ colors, fonts, components });

export default theme;
