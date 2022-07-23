import { globalCss } from "@stitches/react";
import { keyframes, styled } from "../stitches.config";
import { getTodayHintUrl } from "./lib/hint";
import A from "./ui/A";
import Image from "./ui/Image";
import Stack from "./ui/Stack";
import TextLabel, { Heading1, Heading2 } from "./ui/TextLabel";

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

const Container = styled(Stack, {
  gap: "$sm",
});

type Props = {};

const Loader = ({}: Props) => {
  beeStyle();

  return (
    <Container css={{ placeItems: "center", placeContent: "center" }}>
      <Image id="bee" image="bee" style={{ width: "12em", height: "12em" }}></Image>
      <Heading1>Hello!</Heading1>
      <TextLabel css={{ textAlign: "center" }}>
        This is BeeSpy, a little helper app for solving the New York Times' puzzle Spelling Bee.
      </TextLabel>
      <Stack strip={{ "@bp2": true }} gap="md" css={{ maxWidth: "80%" }}>
        <Stack>
          <Heading2>Setup</Heading2>
          <Ol>
            <li>
              <TextLabel>
                Visit the{" "}
                <A css={{ display: "inline" }} href={getTodayHintUrl(new Date())} target="_blank">
                  Spelling Bee Forum
                </A>
              </TextLabel>
            </li>
            <li>
              <TextLabel>Hit Ctrl-A to select all the text</TextLabel>
            </li>
            <li>
              <TextLabel>Hit Ctrl-C to copy</TextLabel>
            </li>
            <li>
              <TextLabel>Come back here and hit Ctrl-V to paste</TextLabel>
            </li>
            <li>
              <TextLabel>Now you have today's hints!</TextLabel>
            </li>
          </Ol>
        </Stack>
        <Stack>
          <Heading2>Usage</Heading2>
          <TextLabel>
            Once you've done the setup, you can just copy-and-paste the list of words from your
            Spelling Bee{" "}
            <A href="https://www.nytimes.com/puzzles/spelling-bee" target="_blank">
              puzzle page
            </A>{" "}
            to update the hints.
          </TextLabel>
          <TextLabel>
            BeeSpy will give you an interactive version of the Spelling Bee hint grid and two-letter
            list, and highlight any pangrams you've already found.
          </TextLabel>
          <TextLabel>
            Note: BeeSpy does NOT know which words are valid. You can paste the phone book for all
            it cares.
          </TextLabel>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Loader;
