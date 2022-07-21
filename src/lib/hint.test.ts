import { describe, expect, test } from "vitest";
import { getHint, parsers } from "./hint";

const testLetters = "A B C";

test("letters", () => {
  expect(parsers.letters(testLetters)).toEqual(["a", "b", "c"]);
});

const testTable = `4	5	6
A:	1	2	3
B:	-1	1	-
C:	1	-	2`;

const testTableResult = {
  a: { 4: 1, 5: 2, 6: 3 },
  b: { 4: -1, 5: 1, 6: NaN },
  c: { 4: 1, 5: NaN, 6: 2 },
};

test("tableHead", () => {
  const rs = parsers.tableHead(testTable);
  expect(rs).toEqual([4, 5, 6]);
});

test("tableBody", () => {
  const rs = parsers.table(testTable);
  expect(rs).toEqual(testTableResult);
});

const testPairs = `AB-1 AC-2
BC-3
CA-3 CB-2 CC-1`;
const testPairsResult = {
  a: { ab: 1, ac: 2 },
  b: { bc: 3 },
  c: { ca: 3, cb: 2, cc: 1 },
};

test("pairs", () => {
  expect(parsers.pairs(testPairs)).toEqual(testPairsResult);
});

const fullTest = `
SECTIONS
SEARCH
SKIP TO CONTENTSKIP TO SITE INDEXGAMEPLAY
PLAY THE CROSSWORD

Account
Spelling Bee Forum
Feeling stuck on today’s puzzle? We can help.

Give this article


854

Credit...Courtesy of Philip Campbell

By New York Times Games
July 13, 2022
WEDNESDAY — Hi busy bees! Welcome to today’s Spelling Bee forum. There are a number of terms that appear in both this article and other online discussions of the Spelling Bee; a glossary of those terms compiled by Monicat, a Times reader, can be found below. For more Spelling Bee conversation, check out Deb Amlen’s weekly humor column, “Diary of a Spelling Bee Fanatic.”


Glossary of Spelling Bee Terms
July 26, 2021
Spelling Bee Grid
Center letter is in bold.

A B C

WORDS: 60, POINTS: 274, PANGRAMS: 1

4	5	6
A:	1	2	3
B:	-1	1	-
C:	1	-	2
Two letter list:

AB-1 AC-2
BC-3
CA-3 CB-2 CC-1

Further Reading
Think we missed a word? Email us: buzzwords@nytimes.com
`;

test("full hint", () => {
  const res = getHint(fullTest);

  expect(res).toEqual({
    letters: testLetters,
    stats: "WORDS: 60, POINTS: 274, PANGRAMS: 1",
    table: {
      head: [4, 5, 6],
      rows: testTableResult,
    },
    pairs: testPairsResult,
  });
});
