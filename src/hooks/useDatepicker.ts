import { useState, useEffect } from 'react';
import { isToday, getDifferenceInDays, getDateFrameValidity } from '@/lib/date';

const useDatepicker = (daysBarrier: number) => {
  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultStartDate.getDate() + daysBarrier);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [startDateIsTouched, setStartDateIsTouched] = useState(false);
  const startDateIsValid = isToday(startDate) || startDate >= defaultStartDate;
  const startDateHasError = !startDateIsValid && startDateIsTouched;

  const startDateChangeHandler = (event: any) => {
    setStartDate(new Date(event.target.value));
  };
  const startDateBlurHandler = () => {
    setStartDateIsTouched(true);
  };
  const startDateResetHandler = () => {
    setStartDate(defaultStartDate);
    setStartDateIsTouched(false);
  };

  const [endDate, setEndDate] = useState(defaultEndDate);
  const [endDateIsTouched, setEndDateIsTouched] = useState(false);
  const endDateIsValid = getDifferenceInDays(startDate, endDate) <= daysBarrier;
  const endDateHasError = !endDateIsValid && endDateIsTouched;

  const [dateFrameIsValid, setDateFrameIsValid] = useState(true);

  const endDateChangeHandler = (event: any) => {
    setEndDate(new Date(event.target.value));
  };
  const endDateBlurHandler = () => {
    setEndDateIsTouched(true);
  };
  const endDateResetHandler = () => {
    setEndDate(defaultEndDate);
    setEndDateIsTouched(false);
  };

  useEffect(() => {
    setDateFrameIsValid(getDateFrameValidity(startDate, endDate));
  }, [startDate, endDate]);

  return {
    startDate: {
      value: startDate,
      isValid: startDateIsValid,
      hasError: startDateHasError,
      change: startDateChangeHandler,
      blur: startDateBlurHandler,
      reset: startDateResetHandler,
    },
    endDate: {
      value: endDate,
      isValid: endDateIsValid,
      hasError: endDateHasError,
      change: endDateChangeHandler,
      blur: endDateBlurHandler,
      reset: endDateResetHandler,
    },
    dateFrameIsValid,
  };
};
export default useDatepicker;

export type UseDatepickerResult = ReturnType<typeof useDatepicker>;
