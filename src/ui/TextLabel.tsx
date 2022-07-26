import { createStyleObject } from "@capsizecss/core";
import interMetrics from "@capsizecss/metrics/inter";
import { styled } from "../../stitches.config";

type CapsizeParams = Parameters<typeof createStyleObject>[0];

const createCapsize = (props: CapsizeParams) => {
  const { fontSize, lineHeight, ...rest } = createStyleObject(props);
  return {
    fontSize,
    lineHeight,
    "&::before": rest["::before"],
    "&::after": rest["::after"],
  };
};

export const H1 = styled("h1", {
  fontFamily: "$inter",
  fontWeight: 200,
  letterSpacing: -0.5,
  textAlign: "center",

  ...createCapsize({
    fontSize: 48,
    lineGap: 0,
    fontMetrics: interMetrics,
  }),
});

export const H2 = styled("h2", {
  fontFamily: "$inter",
  fontWeight: 200,
  letterSpacing: -0.5,
  textAlign: "center",

  ...createCapsize({
    fontSize: 32,
    lineGap: 0,
    fontMetrics: interMetrics,
  }),
});

export const H3 = styled("h3", {
  className: "h3",
  fontFamily: "$inter",
  fontWeight: 300,
  letterSpacing: 0.5,
  textAlign: "center",

  ...createCapsize({
    fontSize: 18,
    lineGap: 0,
    fontMetrics: interMetrics,
  }),
});

export const PStyle = {
  fontFamily: "$inter",
  fontWeight: 300,
  letterSpacing: 1.0,

  ...createCapsize({
    fontSize: 14,
    lineGap: 14,
    fontMetrics: interMetrics,
  }),
};
export const P = styled("p", PStyle);
