import type { UseDatepickerResult } from '@/hooks/useDatepicker';
import cn from 'classnames';

import classes from './JobOfferForm.module.scss';

const DatePicker = ({
  startDate,
  endDate,
  maxDaysFrame,
  dateFrameIsValid,
}: {
  startDate: UseDatepickerResult['startDate'];
  endDate: UseDatepickerResult['endDate'];
  maxDaysFrame: number;
  dateFrameIsValid: boolean;
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <div className="col-2">
            <label htmlFor="startDateInput">{'Дата початку'}</label>
            <input
              id="startDateInput"
              className={cn(
                classes['field-date'],
                (!dateFrameIsValid || startDate.hasError) && classes.invalid
              )}
              value={startDate.value.toISOString().substring(0, 10)}
              type="date"
              onChange={startDate.change}
              onBlur={startDate.blur}
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="col-2">
            <label htmlFor="endDateInput">{'Дата закінчення'}</label>
            <input
              id="endDateInput"
              className={cn(
                classes['field-date'],
                (!dateFrameIsValid || endDate.hasError) && classes.invalid
              )}
              value={endDate.value.toISOString().substring(0, 10)}
              type="date"
              onChange={endDate.change}
              onBlur={endDate.blur}
              required
            />
          </div>
        </div>
      </div>
      {startDate.hasError && (
        <p id="startDateValidationMessage" className={classes['validation']}>
          {'Дата початку має бути актуальною'}
        </p>
      )}
      {endDate.hasError && (
        <p id="endDateValidationMessage" className={classes['validation']}>
          {`Дати повинні відрізнятися не більш ніж на ${maxDaysFrame} днів`}
        </p>
      )}
      {!dateFrameIsValid && (
        <p id="dateFrameValidationMessage" className={classes['validation']}>
          {'Дата початку повинна бути раніше ніж дата закінчення'}
        </p>
      )}
    </>
  );
};

export default DatePicker;
