// import axios from "axios";
// import * as cheerio from "cheerio";
import { Linereader } from "./linereader";
import ScoreTable, { ScoreCharCount, ScoreRow } from "./ScoreTable";

// https://www.nytimes.com/2022/07/13/crosswords/spelling-bee-forum.html;

export type PairHints = Record<string, Record<string, number>>;

export type Props = {
  letters: string[];
  stats: string;
  table: ScoreTable;
  pairs?: PairHints;
};

const padNum = (num: number) => num.toString().padStart(2, "0");

const dateUrl = (date: Date) => {
  const [y, m, d] = [date.getFullYear(), padNum(date.getMonth() + 1), date.getDate()];
  return `https://www.nytimes.com/${y}/${m}/${d}/crosswords/spelling-bee-forum.html`;
};

export const parsers = {
  // "Center letter is in"
  preamble: (str: string) => null,

  // Letters
  letters: (str: string) =>
    str
      .replace(/\s+/gi, "")
      .split("")
      .map((s) => s.toLowerCase()),

  // WORDS: 00, POINTS: 000, PANGRAMS: 00
  stats: (str: string) => str,

  tableHead: (str: string) =>
    str
      .split("\n")[0]
      .split("\t")
      .map((n) => Number(n))
      .filter((n) => Number.isInteger(n)),

  table: (str: string) => {
    let [headRaw, ...rows] = str.split("\n");
    const head = headRaw
      .split("\t")
      .map((n) => Number(n))
      .filter((n) => Number.isInteger(n));

    return rows.reduce((obj, line) => {
      const [char, ...counts] = line.split("\t");

      return {
        ...obj,
        [char[0].toLowerCase()]: counts.reduce(
          (row, count, i) => ({
            ...row,
            [head[i]]: Number(count),
          }),
          {} as Record<number, number>
        ),
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
export function getHint(input: string) {
  const r = new Linereader(input.split("\n"));

  const readEmpty = () => {
    if (r.readIf("")) {
      return;
    } else {
      throw "Expected empty line";
    }
  };

  try {
    if (!r.readUntil("Center letter is in bold.")) {
      throw "Expected Spelling Bee clue page";
    }
    readEmpty();

    const letters = parsers.letters(r.read());
    readEmpty();

    const stats = parsers.stats(r.read());
    readEmpty();

    const head = parsers.tableHead(r.read());
    const rows = parsers.table(r.read(8).join("\n"));
    const table = head ? new ScoreTable(head, { rows: rows }) : undefined;

    if (!r.readUntil("Two letter list:")) {
      throw "Expected two-letter list";
    }
    const pairLines = r.readUntilTrue((l) => l.trim() === "") as string[];
    const pairs = parsers.pairs(pairLines.join("\n"));
    console.log({ letters, stats, table, pairs });
    return { letters, stats, table, pairs } as Props;
  } catch (error) {
    console.log(error);
  }
}
/**/
