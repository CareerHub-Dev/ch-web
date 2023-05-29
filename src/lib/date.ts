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

export const MONTH_OPTIONS = [
  { id: "01", name: "Січень (01)" },
  { id: "02", name: "Лютий (02)" },
  { id: "03", name: "Березень (03)" },
  { id: "04", name: "Квітень (04)" },
  { id: "05", name: "Травень (05)" },
  { id: "06", name: "Червень (06)" },
  { id: "07", name: "Липень (07)" },
  { id: "08", name: "Серпень (08)" },
  { id: "09", name: "Вересень (09)" },
  { id: "10", name: "Жовтень (10)" },
  { id: "11", name: "Листопад (11)" },
  { id: "12", name: "Грудень (12)" },
];

export function getMonthOption(monthIndex: number): {
  id: string;
  name: string;
} {
  return MONTH_OPTIONS[monthIndex] || MONTH_OPTIONS[0]!;
}

/**
 * Returns an array of years options
 */
export function getYearOptions(range: number, from?: number) {
  if (from === undefined) {
    from = new Date().getFullYear();
  }
  const options: Array<{ id: string; name: string }> = [];
  for (let i = from; i > from - range; i--) {
    options.push({
      id: i.toString(),
      name: i.toString(),
    });
  }
  return options;
}
