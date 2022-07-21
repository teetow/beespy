import { sandDark, yellowDark } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...sandDark,
      ...yellowDark,
    },
    space: {
      xs: "0.5rem",
      sm: "1rem",
      md: "2rem",
      lg: "4rem",
      xl: "8rem",
    },
    fonts: {
      inter: "Inter, sans-serif",
      code: "Roboto Mono, monospace",
    },
    fontSizes: {
      xs: "0.8rem",
      sm: "1.0rem",
      md: "1.6rem",
      lg: "2rem",
      xl: "3rem",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
  },
  utils: {
    marginX: (value: Number) => ({ marginLeft: value, marginRight: value }),
  },
});
