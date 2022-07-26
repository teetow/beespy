import { styled } from "../../stitches.config";

// const Box = styled("div", {});

// const Stack = styled(Box, {
const Stack = styled("div", {
  display: "grid",
  gridAutoFlow: "row",
  alignContent: "start",
  justifyContent: "start",

  variants: {
    align: {
      start: { alignItems: "start" },
      center: { alignItems: "center" },
      stretch: { alignItems: "stretch" },
    },
    justify: {
      start: { justifyItems: "start" },
      center: { justifyItems: "center" },
      stretch: { justifyItems: "stretch" },
    },
    gap: {
      none: {
        gap: "0",
      },
      xxxs: {
        gap: "0.125rem",
      },
      xxs: {
        gap: "0.25rem",
      },
      xs: {
        gap: "0.5rem",
      },
      sm: {
        gap: "1rem",
      },
      md: {
        gap: "2rem",
      },
      lg: {
        gap: "4rem",
      },
    },
    padding: {
      xs: {
        padding: "0.5rem",
      },
      sm: {
        padding: "1rem",
      },
      md: {
        padding: "2rem",
      },
      lg: {
        padding: "4rem",
      },
    },
    strip: {
      true: {
        gridAutoFlow: "column",
      },
    },
  },
});

export default Stack;
