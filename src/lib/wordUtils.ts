export const checkPangram = (word: string) =>
  word
    .toLowerCase()
    .split("")
    .filter((s, i, items) => items.indexOf(s) === i).length === 7;
