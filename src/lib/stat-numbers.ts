export type StatNumbersLocaleProvider = {
    thousand: string;
    million: string;
    delimiter: string;
};

export const statNumbersLocaleProviders = {
    EN: {
        thousand: "K",
        million: "M",
        delimiter: ".",
    } satisfies StatNumbersLocaleProvider,
    UA: {
        thousand: "тис.",
        million: "млн.",
        delimiter: ",",
    } satisfies StatNumbersLocaleProvider,
};

export function statAmountToText(
    val: number,
    localeProvider: StatNumbersLocaleProvider = statNumbersLocaleProviders.UA
) {
    let millions = 0;
    let thousands = 0;
    let hundreds = 0;

    if (val < 1000) {
        return val.toString();
    }
    if (val < 1_000_000) {
        thousands = Math.floor(val / 1000);
        hundreds = Math.floor((val % 1000) / 100);
        let hundredsText =
            hundreds > 0 ? `${localeProvider.delimiter}${hundreds}` : "";
        return `${thousands}${hundredsText}${localeProvider.thousand}`;
    }

    millions = Math.floor(val / 1_000_000);
    let hundredsOfThousands = Math.floor((val % 1_000_000) / 100_000);
    let hundredsOfThousandsText =
        hundredsOfThousands > 0
            ? `${localeProvider.delimiter}${hundredsOfThousands}`
            : "";
    return `${millions}${hundredsOfThousandsText}${localeProvider.million}`;
}
