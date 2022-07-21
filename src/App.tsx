import { useState } from "react";
import { globalCss, styled } from "../stitches.config";
import { Props } from "./lib/hint";
import Overview from "./Overview";
import Pastebox from "./Pastebox";

const fonts = ["Inter:wght@100..900", "Roboto+Mono:wght@100;200;300;400;500;600;700;800;900"];
const fq = (name: string) => `family=${name}`;
const fontString2 = `https://fonts.googleapis.com/css2?${fonts.map(fq).join("&")}&display=swap`;

const bodyStyles = globalCss({
  "@import": `url('${fontString2}')`,
  html: {
    minHeight: "100vh",
  },
  body: {
    backgroundColor: "$sand3",
    color: "$sand12",
    display: "grid",
    fontFamily: "$inter",
    fontWeight: 200,
    minHeight: "100vh",
  },

  ".App": {
    minHeight: "100%",
    width: "100%",
  },
});

const AppView = styled("div", {});

const Loader = styled("div", {});

function App() {
  const [userWords, setUserWords] = useState<string[]>();
  const [hints, setHints] = useState<Props>();

  bodyStyles();
  return (
    <AppView className="App">
      <Pastebox></Pastebox>
      {hints ? <Overview {...{ ...hints }}></Overview> : <Loader>No data yet.</Loader>}
    </AppView>
  );
}

export default App;
