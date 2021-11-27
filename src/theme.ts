import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

export const _theme = {
  colors: {
    gray: {
      100: "#F2F2F2",
      500: "#848484",
    },
    primary: {
      50: "#F7A492",
      100: "#F7A492",
      200: "#F7A492",
      300: "#F58E77",
      400: "#F3775B",
      500: "#ee4a25",
      600: "#ee4a25",
      700: "#C02F0E",
      800: "#A0270C",
      900: "#801F0A",
    },
    pitchBlack: {
      0: "#000",
      100: "#000",
      200: "#000",
      300: "#000",
      400: "#000",
      500: "#000",
      600: "#000",
      700: "#000",
      800: "#000",
      900: "#000",
    },
    borderColors: {
      900: "#ccc",
      800: "#ccc",
      700: "#ccc",
      600: "#e6e6e6",
      500: "#e6e6e6",
      400: "#f4f4f4",
      300: "#f0f0f0",
      200: "#f0f0f0",
      100: "#f0f0f0",
      50: "#f0f0f0",
    },
    background: {
      default: "#fff",
      50: "#F5F5F5",
      100: "#F5F5F5",
      200: "#F5F5F5",
      300: "#F5F5F5",
      400: "#F5F5F5",
      500: "#F5F5F5",
      600: "#F5F5F5",
      700: "#F5F5F5",
      800: "#F5F5F5",
      900: "#F5F5F5",
    },
  },
  shadows: {
    outline: "0 0 0 2px rgba(0, 0, 0, 0.1)",
  },
  sizes: {
    container: {
      main: "1120px",
    },
  },
};

const theme = extendTheme(_theme);

type Theme = typeof theme;
export type { Theme };

export default theme;
