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

describe("getMonthOption", () => {
  it("should return month option by month's index", () => {
    let opt = date.getMonthOption(1);
    expect(opt.id).toBe("02");
    opt = date.getMonthOption(11);
    expect(opt.id).toBe("12");
    opt = date.getMonthOption(6);
    expect(opt.id).toBe("07");
  });

  it("should return first month option if month is out of range", () => {
    let opt = date.getMonthOption(13);
    expect(opt.id).toBe("01");

    opt = date.getMonthOption(12);
    expect(opt.id).toBe("01");

    opt = date.getMonthOption(-1);
    expect(opt.id).toBe("01");

    opt = date.getMonthOption(Infinity);
    expect(opt.id).toBe("01");
  });
});

describe("getYearOptions", () => {
  it("should return from current year by default", () => {
    const opts = date.getYearOptions(10);
    const currentYear = new Date().getFullYear();
    expect(opts).toHaveLength(10);
    expect(opts[0]!.id).toBe(currentYear.toString());
    expect(opts[0]!.name).toBe(currentYear.toString());
  });

  it("should return from specified year", () => {
    const opts = date.getYearOptions(10, 2000);
    expect(opts).toHaveLength(10);
    expect(opts[0]!.id).toBe("2000");
    expect(opts[0]!.name).toBe("2000");
  });
});
