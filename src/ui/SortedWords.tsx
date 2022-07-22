import { useEffect, useState } from "react";
import { styled } from "../../stitches.config";
import { checkPangram } from "../lib/wordUtils";
import A from "./A";
import Stack from "./Stack";
import { Heading3 } from "./TextLabel";

const Word = styled("div", {
  display: "grid",
  gridTemplateAreas: `"main"`,

  "& > word": {
    gridArea: "main",
  },

  "&:before": {
    alignSelf: "center",
    backgroundColor: "$sand3",
    color: "$sand10",
    content: "var(--label)",
    fontSize: "0.9em",
    fontWeight: 900,
    gridArea: "main",
    justifySelf: "start",
    padding: "0 0.5em 0 0",
    position: "absolute",
    textTransform: "uppercase",
    transform: "translate(0, -1.9em)",
  },

  variants: {
    break: {
      true: {
        borderTop: "1px solid $sand7",
        paddingTop: "$sm",
        marginTop: "$xs",
      },
    },
    pangram: {
      true: {
        color: "$yellow10",
      },
    },
  },
});

const groupGroupsBy = (words: string[], method: SortMethod) => {
  const groupedWords = words.reduce((acc, word) => {
    const key = word[0].toLowerCase();

    const innerKey = method === "alpha" ? word.slice(0, 2) : word.length.toString();
    const prevInnerGroup = acc?.[key] || [];
    const prevWords: string[] = acc?.[key]?.[innerKey] || [];

    return {
      ...acc,
      [key]: { ...prevInnerGroup, [innerKey]: [...prevWords, word] },
    } as Record<string, Record<string, string[]>>;
  }, {} as Record<string, Record<string, string[]>>);

  return Object.keys(groupedWords)
    .sort()
    .reduce((obj, key) => {
      obj[key] = groupedWords[key];
      return obj;
    }, {} as Record<string, Record<string, string[]>>);
};

const compareWords = (a: string, b: string, method: SortMethod) => {
  if (method === "alpha") {
    return a[1].localeCompare(b[1]);
  } else return a.length - b.length;
};

const sortByLength = (words: string[]) => {
  return words.sort((a, b) => {
    if (a.length === b.length) {
      return a.localeCompare(b);
    }
    return a.toString().length - b.toString().length;
  });
};

type SortMethod = "alpha" | "length";

const defaultMethod: SortMethod = "length";

type SortedWordProps = {
  words: string[];
};

const SortedWords = ({ words }: SortedWordProps) => {
  const [method, setMethod] = useState<SortMethod>(defaultMethod);
  const [sortedWords, setSortedWords] = useState<string[]>();
  const [groupedWords, setGroupedWords] = useState<Record<string, Record<string, string[]>>>();

  const handleSortClick = () => {
    const newMethod = method === "alpha" ? "length" : "alpha";
    setMethod(newMethod);
  };

  useEffect(() => {
    setSortedWords(method === "alpha" ? words.sort() : sortByLength(words));
  }, [words, method]);

  useEffect(() => {
    if (sortedWords) setGroupedWords(groupGroupsBy(sortedWords, method));
  }, [sortedWords, method]);

  return (
    <Stack css={{ fontFamily: "$code", fontWeight: 300 }}>
      <Stack strip gap="md" align="center">
        <Heading3>{`${sortedWords?.length} words`}</Heading3>

        <A href="#" onClick={handleSortClick}>
          <Heading3 css={{ fontSize: "0.8rem" }}>
            {method === "alpha" ? "Alphabetical" : "By Length"}
          </Heading3>
        </A>
      </Stack>

      <Stack
        className="user-sorted-words"
        strip
        gap="sm"
        css={{
          gridTemplateColumns: `repeat(${
            (groupedWords && Object.keys(groupedWords).length) || 7
          }, 6rem)`,
        }}
      >
        {groupedWords &&
          Object.entries(groupedWords).map(([char, charGroup], charIndex) => {
            return (
              <Stack
                key={`${char}-${charIndex}`}
                className="user-word-column"
                gap="xs"
                css={{ justifyContent: "stretch" }}
              >
                <Heading3 css={{ textAlign: "left", paddingBottom: "1rem" }}>
                  {char.toUpperCase()}
                </Heading3>

                {Object.entries(charGroup).map(([prefix, prefixGroup]) => {
                  return prefixGroup
                    .sort((a, b) => compareWords(a, b, method))
                    .map((word, i) => {
                      const isFirst = i === 0;
                      return (
                        <Word
                          key={`${word}-${i}`}
                          break={isFirst}
                          css={isFirst ? { "--label": `"${prefix}"` } : {}}
                          pangram={checkPangram(word)}
                        >
                          <span className="word">{word}</span>
                        </Word>
                      );
                    });
                })}
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default SortedWords;
