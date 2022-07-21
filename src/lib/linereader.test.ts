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
    expect(t.read()).toEqual("hello");
  });

  test("Read two lines", () => {
    const t = new Linereader(testData);
    expect(t.read(2)).toEqual(["hello", "world"]);
  });

  test("Read two lines consecutively", () => {
    const t = new Linereader(testData);

    expect([t.read(), t.read()]).toEqual(["hello", "world"]);
  });

  test("Read past eof", () => {
    const t = new Linereader(testData);
    expect(t.read(5)).toEqual(testData);
  });
});

describe("readUntil", () => {
  test("Read until", () => {
    const t = new Linereader(testData);
    expect(t.readUntil("world")).toEqual(["hello", "world"]);
  });

  test("Read until, then read next two lines", () => {
    const t = new Linereader(testData);
    t.readUntil("world");
    expect(t.read(2)).toEqual(["tell me how", "ya doin'"]);
  });

  test("Read until, then read next two lines consecutively", () => {
    const t = new Linereader(testData);
    t.readUntil("world");
    expect([t.read(), t.read()]).toEqual(["tell me how", "ya doin'"]);
  });

  test("ReadUntil fail", () => {
    const t = new Linereader(testData);
    expect(t.readUntil("nothing")).toEqual(undefined);
  });

  test("ReadUntil fail, then hit", () => {
    const t = new Linereader(testData);
    t.readUntil("not found");
    expect(t.readUntil("world")).toEqual(["hello", "world"]);
  });
});
