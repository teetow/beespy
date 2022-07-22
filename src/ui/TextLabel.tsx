import { createStyleObject } from "@capsizecss/core";
import interMetrics from "@capsizecss/metrics/inter";
import { styled } from "../../stitches.config";

const heading1Styles = createStyleObject({
  fontSize: 48,
  leading: 0.001,
  fontMetrics: interMetrics,
});

export const Heading1 = styled("h1", {
  ...heading1Styles,
  fontFamily: "$inter",
  fontWeight: 200,
  letterSpacing: -0.5,
  textAlign: "center",
});

const heading2Styles = createStyleObject({
  fontSize: 32,
  leading: 0.001,
  fontMetrics: interMetrics,
});

export const Heading2 = styled("h2", {
  ...heading2Styles,
  fontFamily: "$inter",
  fontWeight: 200,
  letterSpacing: -0.5,
  textAlign: "center",
});

const heading3Styles = createStyleObject({
  fontSize: 18,
  leading: 0.001,
  fontMetrics: interMetrics,
});

export const Heading3 = styled("h3", {
  ...heading3Styles,
  fontFamily: "$inter",
  fontWeight: 200,
  letterSpacing: -0.5,
  textAlign: "center",
});

const TextLabel = styled("p", {
  fontFamily: "$inter",
  fontWeight: 300,
  letterSpacing: 1.0,
});

export default TextLabel;
