import { describe, expect, test } from "vitest";
import { Range } from "./utils";

describe("Range -- basic", () => {
  test("0", () => {
    expect([...Range(0)]).toEqual([]);
  });

  test("1,1", () => {
    expect([...Range(1, 1)]).toEqual([]);
  });
});

describe("Range -- positive step", () => {
  test("1", () => {
    expect([...Range(1)]).toEqual([0]);
  });

  test("1,2", () => {
    expect([...Range(1, 2)]).toEqual([1]);
  });

  test("3", () => {
    expect([...Range(3)]).toEqual([0, 1, 2]);
  });

  test("3,5", () => {
    expect([...Range(3, 5)]).toEqual([3, 4]);
  });
});

describe("Range -- negative step", () => {
  test("3,-2,-1", () => {
    expect([...Range(3, -2, -1)]).toEqual([3, 2, 1, 0, -1]);
  });

  test("3,-2", () => {
    expect([...Range(3, -2)]).toEqual([3, 2, 1, 0, -1]);
  });
});
