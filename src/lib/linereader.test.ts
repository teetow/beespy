import { describe, expect, test } from "vitest";
import { Linereader } from "./linereader";

const testData = ["hello", "world", "tell me how", "ya doin'"];

describe("Linereader -- basic", () => {
  test("Create new instance", () => {
    const t = new Linereader(testData);
    expect(t).instanceOf(Linereader);
  });

  test("Read one line", () => {
    const t = new Linereader(testData);
    expect(t.readLine()).toEqual("hello");
  });

  test("Read two lines", () => {
    const t = new Linereader(testData);
    expect(t.read(2)).toEqual(["hello", "world"]);
  });

  test("Read two lines consecutively", () => {
    const t = new Linereader(testData);

    expect([t.readLine(), t.readLine()]).toEqual(["hello", "world"]);
  });

  test("Read past eof", () => {
    const t = new Linereader(testData);
    expect(t.read(5)).toEqual(testData);
  });
});

const ifTest = `HELLO
WORLD

TELL ME
HOW
YA DOIN`;

describe("readIf", () => {
  const t = new Linereader(ifTest.split("\n"));
  test(`undefined when not found`, () => {
    expect(t.readLineIf("")).toBeUndefined();
  });

  test(`fail when reading the same line twice`, () => {
    expect(t.readLineIf("HELLO")).toEqual("HELLO");
    expect(t.readLineIf("HELLO")).toBeUndefined();
  });

  test(`fail when reading finding word, then empty line`, () => {
    expect(t.readLineIf("WORLD")).toEqual("WORLD");
    expect(t.readLineIf("")).toEqual("");
  });
});

describe("readUntil", () => {
  test("Read until", () => {
    const t = new Linereader(testData);
    expect(t.readUntil("world")).toEqual(["hello"]);
  });

  test("Read until, then read next two lines", () => {
    const t = new Linereader(testData);
    t.readUntil("world");
    expect(t.read(2)).toEqual(["world", "tell me how"]);
  });

  test("Read until, then read next two lines consecutively", () => {
    const t = new Linereader(testData);
    t.readUntil("world");
    expect([t.readLine(), t.readLine()]).toEqual(["world", "tell me how"]);
  });

  test("ReadUntil fail", () => {
    const t = new Linereader(testData);
    expect(t.readUntil("nothing")).toEqual(undefined);
  });

  test("ReadUntil fail, then hit", () => {
    const t = new Linereader(testData);
    t.readUntil("not found");
    expect(t.readUntil("world")).toEqual(["hello"]);
  });
});
