import { convertParams } from "../axios/convert-params";
import "@testing-library/jest-dom";

describe("convertParams", () => {
  it("should return correct query string from an object", () => {
    const params = {
      a: 1,
      b: 2,
      c: 3,
    };
    const expected = "a=1&b=2&c=3";
    const result = convertParams(params);
    expect(result.toString()).toBe(expected);
  });

  it("should return correct query string from an object with array values", () => {
    const params = {
      a: 1,
      b: 2,
      c: [3, 4, 5],
    };
    const expected = "a=1&b=2&c=3&c=4&c=5";
    const result = convertParams(params);
    expect(result.toString()).toBe(expected);
  });

  it("should return correct query string from an object with array values and undefined/null values", () => {
    const params = {
      a: 1,
      b: 2,
      c: [3, undefined, 4, null, 5],
    };
    const expected = "a=1&b=2&c=3&c=4&c=5";
    const result = convertParams(params);
    expect(result.toString()).toBe(expected);
  });

  it("should return correct query string from an object with array values and empty array", () => {
    const params = {
      a: 1,
      b: 2,
      c: [],
    };
    const expected = "a=1&b=2";
    const result = convertParams(params);
    expect(result.toString()).toBe(expected);
  });

  it("should return correct query from an empty object", () => {
    const params = {};
    const expected = "";
    const result = convertParams(params);
    expect(result.toString()).toBe(expected);
  });
});
