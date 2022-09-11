import useAppDispatch from '@/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { workFormatOptions } from '@/models/enums/WorkFormat';
import { selectWorkFormat, setWorkFormat } from '@/store/job-offers-feed';

const WorkFormatSelect = () => {
  const dispatch = useAppDispatch();
  const workFormat = useSelector(selectWorkFormat);
  const workFormatChangeHandler = (event: any) => {
    dispatch(setWorkFormat(event.target.value));
  };

  return (
    <>
      <label htmlFor="workFormat" className="g__text-bold">
        Формат
      </label>
      <select
        id="workFormat"
        onChange={workFormatChangeHandler}
        value={workFormat || ''}
        style={{
          width: '100%',
        }}
      >
        {workFormatOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
export default WorkFormatSelect;
