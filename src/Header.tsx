import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useRef, useState } from "react";
import { globalCss, styled } from "../stitches.config";
import A from "./ui/A";
import Stack from "./ui/Stack";
import TextLabel from "./ui/TextLabel";

const Container = styled(Stack, {});

const iframeCss = globalCss({
  ".spyframe": {
    width: "60em",
    height: "36em",
    transform: "scale(0.5)",
    transformOrigin: "0% 0%",
  },
});

type Props = {
  onClearHints: () => void;
  onClearWords: () => void;
  showClearHints: boolean;
  showClearWords: boolean;
};

const Header = ({ onClearHints, showClearHints, onClearWords, showClearWords }: Props) => {
  const [now, setNow] = useState(new Date());
  const formattedDate = useRef();

  iframeCss();

  return (
    <Container strip align="center" gap="md">
      {showClearHints && (
        <A href="#" onClick={onClearHints}>
          <TextLabel>Clear hints</TextLabel>
        </A>
      )}
      {showClearWords && (
        <A href="#" onClick={onClearWords}>
          <TextLabel>Clear words</TextLabel>
        </A>
      )}
    </Container>
  );
};

export default Header;
