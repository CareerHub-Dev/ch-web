import useAppDispatch from '@/hooks/useAppDispatch';
import WorkFormat from '@/models/enums/WorkFormat';
import { selectWorkFormat, setWorkFormat } from '@/store/job-offers-feed';
import { useSelector } from 'react-redux';

const workFormatOptions = [
  { value: '', label: 'Не обрано' },
  { label: 'Віддалено', value: WorkFormat.Remote },
  { label: 'Офіс', value: WorkFormat.OnSite },
  { label: 'Гібридний', value: WorkFormat.Hybrid },
];

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
