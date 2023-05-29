import isToday from "date-fns/isToday";
import isFuture from "date-fns/isFuture";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import compareAsc from "date-fns/compareAsc";
import addDays from "date-fns/addDays";
import useDateInput from "./useDateInput";

export function useDatepicker(daysBarrier: number) {
  const today = new Date();
  const defaultStartDate = today;
  const defaultEndDate = addDays(today, daysBarrier);

  const startDate = useDateInput(defaultStartDate, [
    (val) => {
      if (isToday(val) || isFuture(val)) {
        return { type: "success" };
      }
      return {
        type: "error",
        message: "Дата початку не може бути раніше поточної доби",
      };
    },
  ]);

  const endDate = useDateInput(defaultEndDate, [
    (val) => {
      if (differenceInCalendarDays(startDate.value, val) > daysBarrier) {
        return {
          type: "error",
          message: `Дата кінця не може бути пізніше ніж ${daysBarrier} днів від дати початку`,
        };
      }
      if (compareAsc(startDate.value, val) === 1) {
        return {
          type: "error",
          message: "Дата кінця не може бути раніше дати початку",
        };
      }
      return { type: "success" };
    },
  ]);

  return {
    startDate,
    endDate,
  };
}

export type UseDatepickerResult = ReturnType<typeof useDatepicker>;
