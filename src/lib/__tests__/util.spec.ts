import "@testing-library/jest-dom";
import { getYearOptions } from "../util";

describe("getYearOptions", () => {
    it("should return from current year by default", () => {
        const opts = getYearOptions(10);
        const currentYear = new Date().getFullYear();
        expect(opts).toHaveLength(10);
        expect(opts[0]!.id).toBe(currentYear.toString());
        expect(opts[0]!.name).toBe(currentYear.toString());
    });

    it("should return from specified year", () => {
        const opts = getYearOptions(10, 2000);
        expect(opts).toHaveLength(10);
        expect(opts[0]!.id).toBe("2000");
        expect(opts[0]!.name).toBe("2000");
    });
});
