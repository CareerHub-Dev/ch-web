import "@testing-library/jest-dom";
import * as date from "../date";

describe("formatting month and year", () => {
    it("should format month and year", () => {
        expect(date.getFormattedMonthAndYear(1, 2021)).toBe("01.2021");
    });

    it("should format month and year with strings", () => {
        expect(date.getFormattedMonthAndYear("1", "2021")).toBe("01.2021");
    });
});
