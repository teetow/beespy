import { styled } from "../../stitches.config";

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
      s: {
        gap: "1rem",
      },
      m: {
        gap: "2rem",
      },
      l: {
        gap: "4rem",
      },
    },
    padding: {
      xs: {
        padding: "0.5rem",
      },
      s: {
        padding: "1rem",
      },
      m: {
        padding: "2rem",
      },
      l: {
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
