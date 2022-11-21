import LinkButton from '@/components/ui/LinkButton';
import useAppDispatch from '@/hooks/useAppDispatch';
import {
  reset as resetFilters,
  selectFilterApplied,
  setFilterApplied,
} from '@/context/job-offers-feed';
import { useSelector } from 'react-redux';
import ExperienceLevelSelect from './ExperienceLevelSelect';
import JobTypeSelect from './JobTypeSelect';
import SearchTerm from './SearchTerm';
import TagsControls from './TagsControls';

import classes from './JobOffersFilters.module.scss';

const JobOffersFilters = () => {
  const dispatch = useAppDispatch();
  const filterApplied = useSelector(selectFilterApplied);

  const submit = (event: any) => {
    event.preventDefault();
    dispatch(setFilterApplied(true));
  };

  const reset = (event: any) => {
    event.preventDefault();
    dispatch(resetFilters());
  };

  return (
    <div className={classes.filters}>
      <form onSubmit={submit} className={classes.form}>
        <div className={classes.controls}>
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

        <LinkButton onClick={submit}>Пошук</LinkButton>
        {filterApplied && <LinkButton onClick={reset}>Очистити</LinkButton>}
      </form>
    </div>
  );
};

export default JobOffersFilters;
