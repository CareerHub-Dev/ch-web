import { isPhoneNumber } from "../phone";
import "@testing-library/jest-dom";

describe("isPhoneNumber", () => {
  it("should return true if the value is a valid phone number", () => {
    expect(isPhoneNumber("123-456-7890")).toEqual(true);
    expect(isPhoneNumber("123 456 7890")).toEqual(true);
    expect(isPhoneNumber("123.456.7890")).toEqual(true);
    expect(isPhoneNumber("(123) 456-7890")).toEqual(true);
    expect(isPhoneNumber("1234567890")).toEqual(true);
  });

  it("should return false if the value is not a valid phone number", () => {
    expect(isPhoneNumber("123-456-789")).toEqual(false);
    expect(isPhoneNumber("123-456-78901")).toEqual(false);
    expect(isPhoneNumber("123-4567-890")).toEqual(false);
    expect(isPhoneNumber("123-45-67890")).toEqual(false);
  });
});
