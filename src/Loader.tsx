import { globalCss } from "@stitches/react";
import { keyframes, styled } from "../stitches.config";
import { getTodayHintUrl } from "./lib/hint";
import A from "./ui/A";
import Image from "./ui/Image";
import Stack from "./ui/Stack";
import { H1, H2, P, PStyle } from "./ui/TextLabel";

const flutterAnimL = keyframes({
  "0%": { transform: "rotate(0.0deg)" },
  "25%": { transform: "rotate(2deg)" },
  "50%": { transform: "rotate(3deg)" },
  "75%": { transform: "rotate(2deg)" },
  "100%": { transform: "rotate(0.0deg)" },
});

const flutterAnimR = keyframes({
  "0%": { transform: "rotate(0.0deg)" },
  "25%": { transform: "rotate(-2deg)" },
  "50%": { transform: "rotate(-3deg)" },
  "75%": { transform: "rotate(-2deg)" },
  "100%": { transform: "rotate(0.0deg)" },
});

const beeStyle = globalCss({
  "#bee": {
    transform: "rotate(-6deg)",
    transformOrigin: "center",

    "#wingL": {
      animation: `${flutterAnimL} 0.16s infinite`,
      transformOrigin: "50% 30%",
    },
    "#wingR": {
      animation: `${flutterAnimR} 0.16s infinite`,
      transformOrigin: "50% 30%",
    },
  },
});

const Ol = styled("ol", {
  lineHeight: "1.667em",
  padding: 0,
  margin: 0,
});

const Li = styled("li", {
  fontSize: PStyle.fontSize,
  fontWeight: PStyle.fontWeight,
  letterSpacing: PStyle.letterSpacing,

  "&::marker": {
    color: "$sand10",
  },
});

const Keys = styled("span", {
  backgroundColor: "$sand8",
  borderRadius: "4px",
  color: "white",
  display: "inline-block",
  fontWeight: 400,
  lineHeight: "2px",
  padding: "10px 6px",
});

const Container = styled(Stack, {
  gap: "$sm",
});

type Props = {};

const Loader = ({}: Props) => {
  beeStyle();

  return (
    <Container css={{ placeItems: "center", placeContent: "center" }}>
      <Image id="bee" image="bee" style={{ width: "12em", height: "12em" }}></Image>
      <H1>Hello!</H1>
      <P css={{ textAlign: "center" }}>
        This is BeeSpy, a little helper app for solving the New York Times' puzzle Spelling Bee.
      </P>
      <Stack strip={{ "@bp2": true }} gap="md" css={{ maxWidth: "80%" }}>
        <Stack>
          <H2 css={{ placeSelf: "start" }}>Setup</H2>
          <Ol>
            <Li>
              Visit the{" "}
              <A href={getTodayHintUrl(new Date())} target="_blank">
                Spelling Bee Forum
              </A>
            </Li>
            <Li>
              Hit <Keys>Ctrl-A</Keys> to select all the text
            </Li>
            <Li>
              Hit <Keys>Ctrl-C</Keys> to copy
            </Li>
            <Li>
              Come back here and hit <Keys>Ctrl-V</Keys> to paste
            </Li>
            <Li>Now you have today's hints!</Li>
          </Ol>
        </Stack>
        <Stack>
          <H2 css={{ placeSelf: "start" }}>Usage</H2>
          <P>
            Once you've done the setup, you can just copy-and-paste the list of words from your
            Spelling Bee{" "}
            <A href="https://www.nytimes.com/puzzles/spelling-bee" target="_blank">
              puzzle page
            </A>{" "}
            to update the hints.
          </P>
          <P>
            BeeSpy will give you an interactive version of the Spelling Bee hint grid and two-letter
            list, and highlight any pangrams you've already found.
          </P>
          <P>
            Note: BeeSpy does NOT know which words are valid. You can paste the phone book for all
            it cares.
          </P>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Loader;
