import isToday from "date-fns/isToday";
import isFuture from "date-fns/isFuture";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import compareAsc from "date-fns/compareAsc";
import addDays from "date-fns/addDays";
import useDateInput from "./useDateInput";

export function useDatepicker({
  daysBarrier,
  initialStartDate,
  initialEndDate,
}: {
  daysBarrier: number;
  initialStartDate?: Date | undefined;
  initialEndDate?: Date | undefined;
}) {
  const today = new Date();
  const defaultStartDate = initialStartDate ?? today;
  const defaultEndDate = initialEndDate ?? addDays(today, daysBarrier);

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
      if (compareAsc(startDate.value, val) === 1) {
        return {
          type: "error",
          message: "Дата кінця не може бути раніше дати початку",
        };
      }
      if (differenceInCalendarDays(val, startDate.value) > daysBarrier) {
        return {
          type: "error",
          message: `Дата кінця не може бути пізніше ніж ${daysBarrier} днів від дати початку`,
        };
      }
      return { type: "success" };
    },
  ]);

  return {
    startDate: {
      ...startDate,
      blur: () => {
        startDate.blur();
        endDate.blur();
      },
    },
    endDate: {
      ...endDate,
      blur: () => {
        startDate.blur();
        endDate.blur();
      },
    },
  };
}

export type UseDatepickerResult = ReturnType<typeof useDatepicker>;
