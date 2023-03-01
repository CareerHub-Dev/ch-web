const msInDay = 24 * 60 * 60 * 1000;

export const getTimeSincePublishingCaption = (date: number) => {
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
};

export const getDateFrameValidity = (startDate: Date, endDate: Date) =>
  endDate.getTime() - startDate.getTime() >= 0;

export const getDifferenceInDays = (startDate: Date, endDate: Date) => {
  return Math.floor(
    Math.abs(endDate.getTime() - startDate.getTime()) / msInDay
  );
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const getFormattedDate = (month: string, year: string) => {
  return month.padStart(2, "0") + "." + year;
};

export const getReadableDateFromString = (
  date: string,
  locale: string = "uk-UA"
) =>
  new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
