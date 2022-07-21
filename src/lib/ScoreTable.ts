const makeTable = (words: string[]) => {
  const table: ScoreRow = {};

  words.forEach((w) => {
    const key = w[0].toLowerCase();

    const wordLen = w.trim().length;
    if (!table[key]) {
      table[key] = {};
    }
    if (!table[key][wordLen]) {
      table[key][wordLen] = 0;
    }
    table[key][wordLen]++;
  });

  return table;
};
export type ScoreCharCount = Record<number, number>;
export type ScoreRow = Record<string, ScoreCharCount>;

type ScoreTableProps = {
  rows?: ScoreRow;
  words?: string[];
};

class ScoreTable {
  readonly head: number[];
  readonly rows: ScoreRow;

  constructor(head: number[], { rows, words }: ScoreTableProps) {
    this.head = head;

    if (rows) {
      this.rows = rows;
    } else if (words) {
      this.rows = makeTable(words);
    } else {
      this.rows = {};
    }
  }

  static lengths = (table: ScoreTable) => {
    return table.head.map((length) => Number(length));
  };

  static columnForLength = (table: ScoreTable, length: number) => {
    const lenghts = ScoreTable.lengths(table);
    return lenghts.indexOf(length);
  };

  static subtract = (total: ScoreTable, found: ScoreTable) => {
    const newRows = Object.entries(total.rows).reduce((acc, [char, counts]) => {
      return {
        ...acc,
        [char]: Object.entries(counts).reduce((charAcc, [length, count]) => {
          const len = Number(length);
          const foundCount = found.rows[char]?.[len] ?? 0;
          return {
            ...charAcc,
            [length]: count - foundCount,
          };
        }, {}),
      };
    }, {});
    return new ScoreTable([...total.head], { rows: newRows });
  };
}

export default ScoreTable;
