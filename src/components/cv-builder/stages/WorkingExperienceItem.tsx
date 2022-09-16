import useAppDispatch from '@/hooks/useAppDispatch';
import WorkingExperience from '@/models/CV/WorkingExperience';
import { removeWorkingExperience } from '@/store/cv-constructor';
import { getFormattedDate } from '@/lib/util';
import TrashIcon from '@/components/ui/icons/TrashIcon';

import classes from './ListItem.module.scss';

const WorkingExperienceItem: React.FC<{
  item: IndexedObject<WorkingExperience>;
}> = ({ item }) => {
  const dispatch = useAppDispatch();
  const removeButtonClickHandler = () => {
    dispatch(removeWorkingExperience(item.id));
  };

  return (
    <li className={classes.item}>
      <span>{item.jobTitle}</span>
      <span>
        {item.company} : {item.employmentType}
      </span>
      <span>{item.isRemote ? 'Дистанційно' : item.jobLocation}</span>
      <span>{`${getFormattedDate(item.startMonth, item.startYear)} - ${
        item.jobIsCurrent
          ? 'Досі'
          : getFormattedDate(item.endMonth, item.endYear)
      }`}</span>
      <span onClick={removeButtonClickHandler} className={classes.remove}>
        <TrashIcon />
      </span>
    </li>
  );
};

export default WorkingExperienceItem;
