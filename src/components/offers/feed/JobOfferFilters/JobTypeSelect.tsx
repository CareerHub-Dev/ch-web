import useAppDispatch from '@/hooks/useAppDispatch';
import { jobTypeOptions } from '@/models/enums/_JobType';
import { selectJobType, setJobType } from '@/store/job-offers-feed';
import { useSelector } from 'react-redux';

const JobTypeSelect = () => {
  const dispatch = useAppDispatch();
  const jobType = useSelector(selectJobType);
  const jobTypeChangeHandler = (event: any) => {
    dispatch(setJobType(event.target.value));
  };

  return (
    <>
      <label htmlFor="jobType" className="g__text-bold">
        Тип
      </label>
      <select
        id="jobType"
        onChange={jobTypeChangeHandler}
        value={jobType || ''}
        style={{
          width: '100%',
        }}
      >
        {jobTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
export default JobTypeSelect;
