import useAppDispatch from '@/hooks/useAppDispatch';
import ExperienceLevel from '@/models/enums/ExperienceLevel';
import {
  selectExperienceLevel,
  setExperienceLevel,
} from '@/store/job-offers-feed';
import { useSelector } from 'react-redux';

const experienceLevelOptions = [
  { value: '', label: 'Не обрано' },
  { label: 'Trainee', value: ExperienceLevel.Trainee },
  { label: 'Intern', value: ExperienceLevel.Intern },
  { label: 'Junior', value: ExperienceLevel.Junior },
  { label: 'Middle', value: ExperienceLevel.Middle },
  { label: 'Senior', value: ExperienceLevel.Senior },
];

const ExperienceLevelSelect = () => {
  const dispatch = useAppDispatch();
  const experienceLevel = useSelector(selectExperienceLevel);
  const experienceLevelChangeHandler = (event: any) => {
    dispatch(setExperienceLevel(event.target.value));
  };

  return (
    <>
      <label htmlFor="jobType" className="g__text-bold">
        Рівень
      </label>
      <select
        id="jobType"
        onChange={experienceLevelChangeHandler}
        value={experienceLevel || ''}
        style={{
          width: '100%',
        }}
      >
        {experienceLevelOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
export default ExperienceLevelSelect;
