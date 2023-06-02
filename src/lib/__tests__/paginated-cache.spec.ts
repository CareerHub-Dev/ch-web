import { removeFromPaginatedCache } from "../paginated-cache";
import "@testing-library/jest-dom";

describe("removeFromPaginatedCache", () => {
  it("should return the same data if it is not an object", () => {
    const testValues = [
      null,
      "test",
      123,
      undefined,
      {},
      { items: [1, 2, 3] },
      { pages: [1, 2, 3] },
      { pages: 123 },
      { pages: "test" },
    ];
    testValues.forEach((value) => {
      expect(removeFromPaginatedCache(value, "test")).toEqual(value);
    });
  });


  it("should correctly remove an item from the cache", () => {
    const data = {
      pages: [
        { items: [{ id: "1" }, { id: "2" }, { id: "3" }] },
        { items: [{ id: "4" }, { id: "5" }, { id: "6" }] },
        { items: [{ id: "7" }, { id: "8" }, { id: "9" }] },
      ],
    };
    const expectedData = {
      pages: [
        { items: [{ id: "1" }, { id: "2" }, { id: "3" }] },
        { items: [{ id: "4" }, { id: "6" }] },
        { items: [{ id: "7" }, { id: "8" }, { id: "9" }] },
      ],
    };
    expect(removeFromPaginatedCache(data, "5")).toEqual(expectedData);
  });
});

