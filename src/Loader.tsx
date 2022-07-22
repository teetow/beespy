import { globalCss } from "@stitches/react";
import { keyframes, styled } from "../stitches.config";
import { getTodayHintUrl } from "./lib/hint";
import A from "./ui/A";
import Image from "./ui/Image";
import Stack from "./ui/Stack";
import TextLabel, { Heading1, Heading2, Heading3 } from "./ui/TextLabel";

const flutterAnim = keyframes({
  "0%": { "--rot": 0.0 },
  "25%": { "--rot": 0.5 },
  "50%": { "--rot": 1.0 },
  "75%": { "--rot": 0.5 },
  "100%": { "--rot": 0.0 },
});

const beeStyle = globalCss({
  "#bee": {
    transform: "rotate(-6deg)",
    transformOrigin: "center",

    "#wingL": {
      animation: `${flutterAnim} 0.16s infinite`,
      transform: "rotate(calc(var(--rot) * 3deg))",
      transformOrigin: "50% 30%",
    },
    "#wingR": {
      animation: `${flutterAnim} 0.16s infinite`,
      transform: "rotate(calc(var(--rot) * -3deg))",
      transformOrigin: "50% 30%",
    },
  },
});

const Container = styled(Stack, {
  gap: "$sm",
});

type Props = {};

const Loader = ({}: Props) => {
  beeStyle();

  return (
    <Container css={{ placeItems: "center", placeContent: "center" }}>
      <Image id="bee" image="bee" style={{ width: "18em", height: "18em" }}></Image>
      <Heading1>Hello!</Heading1>
      <Heading3>
        This is BeeSpy, a little helper app for solving the New York Times' puzzle Spelling Bee.
      </Heading3>
      <Stack strip gap="md" css={{ gridTemplateColumns: "1fr 1fr", maxWidth: "80%" }}>
        <Stack>
          <Heading2>Setup</Heading2>
          <ol>
            <li>
              <span>
                Visit the{" "}
                <A css={{ display: "inline" }} href={getTodayHintUrl(new Date())} target="_blank">
                  Spelling Bee Forum
                </A>
              </span>
            </li>
            <li>Hit Ctrl-A to select all the text</li>
            <li>Hit Ctrl-C to copy</li>
            <li>Come back here and hit Ctrl-V to paste</li>
            <li>Now you have today's hints!</li>
          </ol>
        </Stack>
        <Stack>
          <Heading2>Usage</Heading2>
          <p>
            Once you've done the setup, you can just copy-and-paste the list of words from your
            Spelling Bee{" "}
            <A href="https://www.nytimes.com/puzzles/spelling-bee" target="_blank">
              puzzle page
            </A>{" "}
            to update the hints.
          </p>
          <p>
            BeeSpy will give you an interactive version of the Spelling Bee hint grid and two-letter
            list, and highlight any pangrams you've already found.
          </p>
          <p>
            Note: BeeSpy does NOT know which words are valid. You can paste the phone book for all
            it cares.
          </p>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Loader;
