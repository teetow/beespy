import { globalCss } from "@stitches/react";
import { keyframes, styled } from "../stitches.config";
import Image from "./ui/Image";
import Stack from "./ui/Stack";

const flutterAnim = keyframes({
  "0%": { "--rot": 0.0 },
  "25%": { "--rot": 0.5 },
  "50%": { "--rot": 1.0 },
  "75%": { "--rot": 0.5 },
  "100%": { "--rot": 0.0 },
});

const beeStyle = globalCss({
  "#bee": {
    "#blender_object_glass": {},
    "#blender_object_bee\\.wings": {
      "#wing\\.L": {
        animation: `${flutterAnim} 0.16s infinite`,
        transform: "rotate(calc(var(--rot) * 3deg))",
        transformOrigin: "-5% 12%",
      },
      "#wing\\.R": {
        animation: `${flutterAnim} 0.16s infinite`,
        transform: "rotate(calc(var(--rot) * -3deg))",
        transformOrigin: "-5% 12%",
      },
    },
  },
});

const Container = styled(Stack, {
  gap: "$md",
});

type Props = {};

const Loader = ({}: Props) => {
  beeStyle();
  return (
    <Container css={{ placeItems: "center", placeContent: "center" }}>
      <Image id="bee" image="bee" style={{ width: "18em", height: "18em" }}></Image>
      No puzzle data yet.
    </Container>
  );
};

export default Loader;
