import "@testing-library/jest-dom";
import * as util from "../util";

describe("student email pattern", () => {
    it("should match student email", () => {
        const email = "firstname.lastName@nure.ua";
        expect(util.studentEmailPattern.test(email)).toBe(true);
    });

    it("should not match non-student email", () => {
        const email = "firstname.lastname@gmail.com";
        expect(util.studentEmailPattern.test(email)).toBe(false);
    });

    it("should not match email with spaces", () => {
        const email = "firstname.l stname@nure.ua";
        expect(util.studentEmailPattern.test(email)).toBe(false);
    });
});

describe("student email matching function", () => {
    it("should match student email", () => {
        const email = "firstname.lastname@nure.ua";
        expect(util.getStudentEmailValidity(email)).toBe(true);
    });

    it("should not match non-student email", () => {
        const email = "firstname.lastname@gmail.com";
        expect(util.getStudentEmailValidity(email)).toBe(false);
    });

    it("should not match email with spaces", () => {
        const email = "firstname.l stname@nure.ua";
        expect(util.getStudentEmailValidity(email)).toBe(false);
    });
});

describe("notEmpty function", () => {
    it("should return true for a non-empty string", () => {
        expect(util.notEmpty("test")).toBe(true);
    });

    it("should return false for an empty string", () => {
        expect(util.notEmpty("")).toBe(false);
    });

    it("should return false for null", () => {
        expect(util.notEmpty(null)).toBe(false);
    });

    it("should return true for a non-empty array", () => {
        expect(util.notEmpty([1, 2, 3])).toBe(true);
    });

    it("should return false for an empty array", () => {
        expect(util.notEmpty([])).toBe(false);
    });
});

describe("getYearOptions", () => {
    it("should return from current year by default", () => {
        const opts = util.getYearOptions(10);
        const currentYear = new Date().getFullYear();
        expect(opts).toHaveLength(10);
        expect(opts[0]!.id).toBe(currentYear.toString());
        expect(opts[0]!.name).toBe(currentYear.toString());
    });

    it("should return from specified year", () => {
        const opts = util.getYearOptions(10, 2000);
        expect(opts).toHaveLength(10);
        expect(opts[0]!.id).toBe("2000");
        expect(opts[0]!.name).toBe("2000");
    });
});
