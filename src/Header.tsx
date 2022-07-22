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
};

const Header = ({ onClearHints, onClearWords }: Props) => {
  const [now, setNow] = useState(new Date());
  const formattedDate = useRef();

  iframeCss();

  return (
    <Container strip align="center" gap="md">
      <Popover>
        <PopoverTrigger>Show puzzle</PopoverTrigger>
        <PopoverContent>
          <iframe className="spyframe" src="https://www.nytimes.com/puzzles/spelling-bee"></iframe>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>Hint page</PopoverTrigger>
        <PopoverContent>
          <iframe
            className="spyframe"
            src={`https://www.nytimes.com/${now.getFullYear()}/${(now.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${now.getDate()}/crosswords/spelling-bee-forum.html`}
          />
        </PopoverContent>
      </Popover>
      <A href="#" onClick={onClearHints}>
        <TextLabel>Clear hints</TextLabel>
      </A>
      <A href="#" onClick={onClearWords}>
        <TextLabel>Clear words</TextLabel>
      </A>
    </Container>
  );
};

export default Header;
