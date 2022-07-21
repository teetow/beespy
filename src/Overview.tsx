import { ClipboardEvent, PropsWithChildren, useEffect, useState } from "react";
import { styled } from "../stitches.config";
import { PairHints, Props } from "./lib/hint";
import ScoreTable from "./lib/ScoreTable";
import SortedWords from "./ui/SortedWords";
import Stack from "./ui/Stack";
import Table from "./ui/Table";
import { Heading3 } from "./ui/TextLabel";

const Box = styled("div", {});

const List = styled("ul", {
  display: "flex",
  gap: "$sm",
  flexDirection: "row",
  fontSize: "$lg",
  margin: 0,
  padding: 0,
});

const ListItem = styled("li", {
  listStyle: "none",
  padding: 0,
  margin: 0,
  variants: {
    main: {
      true: {
        fontWeight: 900,
        color: "$yellow9",
      },
    },
  },
});

function getPairs(words: string[]) {
  const pairs = words.reduce((acc, word) => {
    const char: string = word[0];
    const prefix: string = word.slice(0, 2).toUpperCase();

    let count = 0;
    if (char in acc) {
      if (prefix in acc[char]) {
        count = acc[char][prefix];
      }
    }

    const out = { ...acc, [char]: { ...acc[char], [prefix]: count + 1 } };
    return out;
  }, {} as PairHints);

  return pairs;
}

function diffPairs(total: PairHints, found: PairHints): PairHints {
  const outer = Object.entries(total).reduce((acc, [char, hintrow]) => {
    const inner = Object.entries(hintrow).reduce((rowAcc, [prefix, count]) => {
      const foundCount = found[char] && found[char][prefix] ? found[char][prefix] : 0;

      return count !== foundCount ? { ...rowAcc, [prefix]: count - foundCount } : rowAcc;
    }, {});

    if (inner) {
      return { ...acc, [char]: inner };
    } else {
      return acc;
    }
  }, {} as PairHints);

  return outer;
}

type PairProps = {
  pairs: PairHints;
};

const Pairs = ({ pairs }: PairProps) => {
  return (
    <Stack className="pairs" gap="xs" css={{ fontWeight: 700 }}>
      {Object.entries(pairs)
        .filter(([key, pairhints]) => {
          return Object.keys(pairhints).length > 0;
        })
        .map(([key, pairhints], i) => {
          return (
            <Stack strip key={`${i}`} className="pair-char" gap="s">
              {Object.entries(pairhints).map(([prefix, count], i) => {
                return <Pair key={`${i}`}>{`${prefix}-${count}`}</Pair>;
              })}
            </Stack>
          );
        })}
    </Stack>
  );
};

const Pair = styled("span", {});

const Letters = ({ letters }: PropsWithChildren<{ letters: string[] }>) => {
  const main = letters[0];

  return (
    <List>
      {[...letters].sort().map((c) => {
        return (
          <ListItem main={c === main} key={c}>
            {c.toUpperCase()}
          </ListItem>
        );
      })}
    </List>
  );
};

const localstoreKey = "beespy-userwords";

const Overview = ({ letters, stats, table, pairs }: Props) => {
  let storedWords = [];
  if ("localStorage" in globalThis) {
    const words = globalThis.localStorage.getItem(localstoreKey);
    if (words) {
      storedWords = JSON.parse(words);
    }
  }

  const [userWords, setUserWords] = useState<string[]>(storedWords || []);
  const [scoreTable, setScoreTable] = useState<ScoreTable>();

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    const data = event.clipboardData.getData("text");

    if (data.includes("Center letter is in bold.")) {
      console.log("You pasted a hint page.");
    } else {
      const words = data
        .split("\n")
        .map((w) => w.trim())
        .filter((w) => w !== "");
      setUserWords(words);
    }
  };

  useEffect(() => {
    if (!userWords) return;

    if ("localStorage" in globalThis) {
      globalThis.localStorage.setItem(localstoreKey, JSON.stringify(userWords));
    }
  }, [userWords]);

  useEffect(() => {
    if (!table || !userWords) return;
    const userTable = new ScoreTable(table.head, { words: userWords });
    setScoreTable(ScoreTable.subtract(table, userTable));
  }, [userWords, table]);

  return (
    <Stack css={{ gap: "$sm", justifyItems: "center" }} onPaste={handlePaste} className="overview">
      {letters ? <Letters letters={letters}></Letters> : <div>No letters</div>}

      <Stack css={{ className: "stack", gap: "$xs" }}>
        <Heading3>{stats || "no stats"}</Heading3>
      </Stack>

      <Stack strip className="user" gap="l">
        <Box css={{ paddingTop: "3em" }}>{scoreTable && <Table table={scoreTable} />}</Box>
        <Box css={{ paddingTop: "3em" }}>
          {pairs && <Pairs pairs={diffPairs(pairs, getPairs(userWords))} />}
        </Box>
      </Stack>
      <Box>{userWords && <SortedWords words={userWords} onClear={() => setUserWords([])} />}</Box>
    </Stack>
  );
};

export default Overview;
