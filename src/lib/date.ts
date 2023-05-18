const msInDay = 24 * 60 * 60 * 1000;

export function getTimeSincePublishingCaption(date: number) {
    const timePassedSinceOfferPublishing = Math.abs((Date.now() - date) / 1000);
    let result;

    result = Math.floor(timePassedSinceOfferPublishing / 86400);
    if (result) {
        return `${result} днів тому`;
    }

    result = Math.floor(timePassedSinceOfferPublishing / 3600) % 24;
    if (result) {
        return `${result} годин тому`;
    }

    return "тільки що";
}

export function getDateFrameValidity(startDate: Date, endDate: Date) {
    return endDate.getTime() - startDate.getTime() >= 0;
}

export function getDifferenceInDays(startDate: Date, endDate: Date) {
    return Math.floor(
        Math.abs(endDate.getTime() - startDate.getTime()) / msInDay
    );
}

export function isToday(date: Date) {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

export function getFormattedMonthAndYear(
    month: string | number,
    year: string | number
) {
    if (typeof month === "number") {
        month = month.toString();
    }
    if (typeof year === "number") {
        year = year.toString();
    }
    return month.padStart(2, "0") + "." + year;
}

export function getReadableDateFromString(
    date: string,
    locale: string = "uk-UA"
) {
    return new Date(date).toLocaleDateString(locale, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
}
