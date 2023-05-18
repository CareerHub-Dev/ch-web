import "@testing-library/jest-dom";
import { statNumbersLocaleProviders, statAmountToText } from "../stat-numbers";

describe("stat numbers", () => {
    it("should format numbers below 1000 correctly", () => {
        [0, 1, 10, 100, 999].forEach((val) => {
            expect(statAmountToText(val)).toBe(val.toString());

            expect(statAmountToText(val, statNumbersLocaleProviders.EN)).toBe(
                val.toString()
            );

            expect(statAmountToText(val, statNumbersLocaleProviders.UA)).toBe(
                val.toString()
            );
        });
    });

    it("should format numbers between 1000 and 1_000_000 correctly", () => {
        const testCases = [
            { value: 1000, EN: "1K", UA: "1тис." },
            { value: 1001, EN: "1K", UA: "1тис." },
            { value: 1100, EN: "1.1K", UA: "1,1тис." },
            { value: 1110, EN: "1.1K", UA: "1,1тис." },
            { value: 1111, EN: "1.1K", UA: "1,1тис." },
            { value: 9000, EN: "9K", UA: "9тис." },
            { value: 9999, EN: "9.9K", UA: "9,9тис." },
        ];

        testCases.forEach((testCase) => {
            const result_EN = statAmountToText(
                testCase.value,
                statNumbersLocaleProviders.EN
            );
            const result_UA = statAmountToText(
                testCase.value,
                statNumbersLocaleProviders.UA
            );
            expect(result_EN).toBe(testCase.EN);
            expect(result_UA).toBe(testCase.UA);
        });
    });

    it("should format numbers above 1_000_000 correctly", () => {
        const testCases = [
            { value: 1_000_000, EN: "1M", UA: "1млн." },
            { value: 1_000_001, EN: "1M", UA: "1млн." },
            { value: 1_100_000, EN: "1.1M", UA: "1,1млн." },
            { value: 1_100_001, EN: "1.1M", UA: "1,1млн." },
        ];

        testCases.forEach((testCase) => {
            const result_EN = statAmountToText(
                testCase.value,
                statNumbersLocaleProviders.EN
            );
            const result_UA = statAmountToText(
                testCase.value,
                statNumbersLocaleProviders.UA
            );
            expect(result_EN).toBe(testCase.EN);
            expect(result_UA).toBe(testCase.UA);
        });
    });
});
