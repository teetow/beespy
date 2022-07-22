import { describe, test, expect } from "vitest";
import { checkPangram } from "./wordUtils";

describe("wordUtils", () => {
  test("hit for ABCDEFG", () => {
    expect(checkPangram("ABCDEFG")).toBeTruthy();
  });

  test("hit for ABCDEFGGG", () => {
    expect(checkPangram("ABCDEFGGG")).toBeTruthy();
  });

  test("fail for ABC", () => {
    expect(checkPangram("ABC")).toBeFalsy();
  });

  test("fail for ABCDEFF", () => {
    expect(checkPangram("ABCDEFF")).toBeFalsy();
  });
});
