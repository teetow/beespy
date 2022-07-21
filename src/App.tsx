import { globalCss, styled } from "../stitches.config";

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

function App() {
  bodyStyles();
  return <AppView className="App">Bog</AppView>;
}

export default App;
