export const RangeOld = (length: number, start = 0, step = 1) => ({
  *[Symbol.iterator]() {
    for (let i = start; i < start + length; i += step) {
      yield i;
    }
  },
});

export const Range = (lengthOrStart: number, end?: number, step: number = 1) => {
  if (step === 0) {
    return [];
  }

  let [start, stop] = end === undefined ? [0, lengthOrStart] : [lengthOrStart, end];

  if (stop < start && step >= 0) {
    step = -1;
  }

  let check = step < 0 ? (a: number, b: number) => a > b : (a: number, b: number) => a < b;

  return {
    *[Symbol.iterator]() {
      for (let i = start; check(i, stop); i += step) {
        yield i;
      }
    },
  };
};

export const isEmpty = (obj: any) =>
  obj && // 👈 null and undefined check
  Object.keys(obj).length === 0 &&
  Object.getPrototypeOf(obj) === Object.prototype;
