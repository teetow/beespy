import { describe, expect, test } from "vitest";
import { getHint, parsers } from "./hint";

const testLetters = "M D E I N P T";
const testLettersResult = ["m", "d", "e", "i", "n", "p", "t"];

test("letters", () => {
  expect(parsers.letters(testLetters)).toEqual(testLettersResult);
});

const testTable = `4	5	6	7	8	10	Σ
D:	2	2	3	-	2	-	9
E:	1	1	-	4	-	-	6
I:	1	-	2	1	2	2	8
M:	13	5	5	-	-	-	23
P:	1	-	2	-	-	-	3
T:	3	4	2	1	1	-	11
Σ:	21	12	14	6	5	2	60`;

const tableHeadResult = [4, 5, 6, 7, 8, 10];

const testTableResult = {
  d: { "4": 2, "5": 2, "6": 3, "8": 2 },
  e: { "4": 1, "5": 1, "7": 4 },
  i: { "4": 1, "6": 2, "7": 1, "8": 2, "10": 2 },
  m: { "4": 13, "5": 5, "6": 5 },
  p: { "4": 1, "6": 2 },
  t: { "4": 3, "5": 4, "6": 2, "7": 1, "8": 1 },
};
describe("table", () => {
  const [head, ...table] = testTable.split("\n");
  const tableHead = parsers.tableHead(head);

  test("tableHead", () => {
    expect(tableHead).toEqual(tableHeadResult);
  });

  test("tableBody", () => {
    const rs = parsers.table(tableHead, table);
    expect(rs).toEqual(testTableResult);
  });
});

const testPairs = `DE-7 DI-2
EM-6
IM-7 IT-1
ME-8 MI-15
PE-1 PI-2
TE-8 TI-3`;

const testPairsResult = {
  d: { de: 7, di: 2 },
  e: { em: 6 },
  i: { im: 7, it: 1 },
  m: { me: 8, mi: 15 },
  p: { pe: 1, pi: 2 },
  t: { te: 8, ti: 3 },
};

test("pairs", () => {
  expect(parsers.pairs(testPairs)).toEqual(testPairsResult);
});

const fullTest = `
Spelling Bee Grid
Center letter is in bold.

${testLetters}

WORDS: 60, POINTS: 274, PANGRAMS: 1

${testTable}
Two letter list:

${testPairs}

`;

test("full hint", () => {
  const res = getHint(fullTest);

  expect(res).toEqual({
    letters: testLettersResult,
    stats: "WORDS: 60, POINTS: 274, PANGRAMS: 1",
    table: {
      head: tableHeadResult,
      rows: testTableResult,
    },
    pairs: testPairsResult,
  });
});
