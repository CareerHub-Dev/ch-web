import useAppDispatch from '@/hooks/useAppDispatch';
import { jobTypeOptions } from '@/lib/enums/JobType';
import { selectJobType, setJobType } from '@/context/job-offers-feed';
import { useSelector } from 'react-redux';

const JobTypeSelect = () => {
  const dispatch = useAppDispatch();
  const jobType = useSelector(selectJobType);
  const jobTypeChangeHandler = (event: any) => {
    dispatch(setJobType(event.target.value));
  };

  return (
    <>
      <label htmlFor="jobType" className="font-semibold">
        Тип
      </label>
      <select
        id="jobType"
        onChange={jobTypeChangeHandler}
        value={jobType || ''}
        className="form-input w-full p-1"
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
