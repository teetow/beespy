import { ClipboardEvent, useEffect, useState } from "react";
import { globalCss, styled } from "../stitches.config";
import ErrorBoundary from "./ErrorBoundary";
import Header from "./Header";
import { getHint, getWords, HintProps } from "./lib/hint";
import { isEmpty } from "./lib/utils";
import Loader from "./Loader";
import Overview from "./Overview";
import Stack from "./ui/Stack";

const fonts = ["Inter:wght@100..900", "Roboto+Mono:wght@100;200;300;400;500;600;700;800;900"];
const fq = (name: string) => `family=${name}`;
const fontString2 = `https://fonts.googleapis.com/css2?${fonts.map(fq).join("&")}&display=swap`;

const bodyStyles = globalCss({
  "@import": `url('${fontString2}')`,
  html: {
    minHeight: "100vh",
  },
  body: {
    backgroundColor: "$appbg",
    color: "$sand12",
    display: "grid",
    fontFamily: "$inter",
    fontWeight: 200,
    minHeight: "100vh",
  },
});

const AppView = styled(Stack, {
  gap: "$md",
  margin: "0 auto",
  maxWidth: "60rem",
  placeContent: "start center",
  placeItems: "center",
});

const loadLocal = (key: string) => {
  if ("localStorage" in globalThis) {
    const thing = globalThis.localStorage.getItem(key);
    if (thing) {
      return JSON.parse(thing);
    }
  }
};

const storeLocal = (key: string, obj: any) => {
  if ("localStorage" in globalThis) {
    globalThis.localStorage.setItem(key, JSON.stringify(obj));
  }
};

const storeKeyWords = "beespy-words";
const storeKeyHints = "beespy-hints";

function App() {
  const [words, setWords] = useState<string[]>(loadLocal(storeKeyWords) || []);
  const [hints, setHints] = useState<HintProps>(loadLocal(storeKeyHints) || {});

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    const data = event.clipboardData.getData("text");

    if (data.includes("Center letter is in bold.")) {
      console.log("You pasted a hint page.");
      const h = getHint(data);
      if (h) {
        setHints(h);
        storeLocal(storeKeyHints, h);
      }
    } else if (data.includes("You have found")) {
      const words = getWords(data);
      setWords(words);
    } else {
      console.log("you pasted words.");
      const words = data
        .split("\n")
        .map((w) => w.trim().toLowerCase())
        .filter((w) => w !== "");
      setWords([...new Set(words)]);
    }
  };

  useEffect(() => {
    if (hints) storeLocal(storeKeyHints, hints);
  }, [hints]);

  useEffect(() => {
    if (words) storeLocal(storeKeyWords, words);
  }, [words]);

  bodyStyles();

  return (
    <ErrorBoundary>
      <AppView className="App" onPaste={handlePaste}>
        <Header
          showClearHints={!isEmpty(hints)}
          onClearHints={() => setHints({})}
          showClearWords={words.length !== 0}
          onClearWords={() => setWords([])}
        ></Header>
        {!isEmpty(hints) ? <Overview {...{ words, ...hints }}></Overview> : <Loader />}
      </AppView>
    </ErrorBoundary>
  );
}

export default App;
