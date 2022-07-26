import { useRef, useState } from "react";
import { globalCss, styled } from "../stitches.config";
import A from "./ui/A";
import Stack from "./ui/Stack";
import { P } from "./ui/TextLabel";

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
          <P>Clear hints</P>
        </A>
      )}
      {showClearWords && (
        <A href="#" onClick={onClearWords}>
          <P>Clear words</P>
        </A>
      )}
    </Container>
  );
};

export default Header;
