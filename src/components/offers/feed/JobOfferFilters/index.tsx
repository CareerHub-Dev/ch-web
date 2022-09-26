import LinkButton from '@/components/ui/LinkButton';
import useAppDispatch from '@/hooks/useAppDispatch';
import {
  reset,
  selectFilterApplied,
  setFilterApplied,
} from '@/store/job-offers-feed';
import { useSelector } from 'react-redux';
import ExperienceLevelSelect from './ExperienceLevelSelect';
import JobTypeSelect from './JobTypeSelect';
import SearchTerm from './SearchTerm';
import TagsControls from './TagsControls';

import classes from './JobOffersFilters.module.scss';

const JobOffersFilters = () => {
  const dispatch = useAppDispatch();
  const filterApplied = useSelector(selectFilterApplied);

  const submissionHandler = (event: any) => {
    event.preventDefault();
    dispatch(setFilterApplied(true));
  };

  const resetHandler = (event: any) => {
    event.preventDefault();
    dispatch(reset());
  };

  return (
    <div className={classes.filters}>
      <form className={classes.form}>
        <div className={classes.controls}>
          <h1>Фільтри</h1>

          <div className={classes.control}>
            <SearchTerm />
          </div>
          <div className={classes.control}>
            <JobTypeSelect />
          </div>
          <div className={classes.control}>
            <ExperienceLevelSelect />
          </div>
          <div className={classes.control}>
            <TagsControls />
          </div>
        </div>

        <LinkButton onClick={submissionHandler}>Пошук</LinkButton>
        {filterApplied && (
          <LinkButton onClick={resetHandler}>Очистити</LinkButton>
        )}
      </form>
    </div>
  );
};

export default JobOffersFilters;
