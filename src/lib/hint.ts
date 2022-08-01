import { Linereader } from "./linereader";
import ScoreTable from "./ScoreTable";

export type PairHints = Record<string, Record<string, number>>;

export type HintProps = {
  letters?: string[];
  stats?: string;
  table?: ScoreTable;
  pairs?: PairHints;
};

export const parsers = {
  letters: (str: string) => str.split(" ").map((s) => s.toLowerCase()),

  stats: (str: string) => str,

  tableHead: (str: string) =>
    str
      .split("\n")[0]
      .split("\t")
      .map((n) => Number(n))
      .filter((n) => Number.isInteger(n)),

  table: (head: number[], rows: string[] | string | undefined) => {
    if (!rows) {
      return;
    }

    if (typeof rows === "string") {
      rows = [rows];
    }

    return rows.reduce((obj, line) => {
      const [char, ...counts] = line.split("\t");

      return {
        ...obj,
        ...(/[a-zA-Z]/.test(char) && {
          [char[0].toLowerCase()]: counts.reduce(
            (row, count, i) => ({
              ...row,
              ...(head[i] !== undefined &&
                Number.isInteger(Number(count)) && { [head[i]]: Number(count) }),
            }),
            {} as Record<number, number>
          ),
        }),
      };
    }, {} as Record<string, Record<number, number>>);
  },

  // "Two-letter list"
  inter1: (str: string) => null,

  // pairs
  pairs: (str: string) =>
    str
      .toUpperCase()
      .replace(/\n{2,}/gi, "\n")
      .replace(/[ ]{2,}/gi, "")
      .split("\n")
      .filter((row) => row.trim() !== "")
      .map((row) => row.split(" "))
      .reduce((acc, hintpairs) => {
        const char = hintpairs[0][0].toLowerCase();

        const pairRow = hintpairs.reduce((charHint, hintpair) => {
          const [prefix, count] = hintpair.split("-");
          return { ...charHint, [prefix.toLowerCase()]: Number(count) };
        }, {});

        return { ...acc, [char]: { ...{ ...pairRow } } };
      }, {}),
};

//*/
export function getHint(input: string): HintProps | undefined {
  const r = new Linereader(input.split("\n"));

  const ffwd = () => {
    while (r.nextLine.trim() === "") {
      r.readLine();
    }
  };

  try {
    if (!r.readUntil("Center letter is in bold.")) {
      throw "Expected Spelling Bee clue page";
    }
    r.readLine();
    ffwd();

    const letters = parsers.letters(r.readLine());
    ffwd();

    const stats = parsers.stats(r.readLine());
    ffwd();

    const head = parsers.tableHead(r.readLine());
    const rows = parsers.table(head, r.readUntil("Two letter list:"));
    const table = head ? new ScoreTable(head, { rows: rows }) : undefined;
    ffwd();
    r.readLine();
    ffwd();

    const pairLines = r.readUntilTrue((l) => l.trim() === "") as string[];
    const pairs = parsers.pairs(pairLines.join("\n"));

    return { letters, stats, table, pairs } as HintProps;
  } catch (error) {
    console.log(error);
  }
}
/**/

const pad = (date: Number) => date.toString().padStart(2, "0");

export const getTodayHintUrl = (date: Date) =>
  `https://www.nytimes.com/${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(
    date.getDate()
  )}/crosswords/spelling-bee-forum.html`;
