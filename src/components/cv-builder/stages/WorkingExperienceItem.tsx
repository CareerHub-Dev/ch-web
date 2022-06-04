import useAppDispatch from '@/hooks/useAppDispatch';
import IndexedObject from '@/models/IndexedObject';
import WorkingExperience from '@/models/CV/WorkingExperience';
import { removeWorkingExperience } from '@/store/cv-constructor';
import { getFormattedDate } from '@/lib/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import classes from './ListItem.module.scss';

const WorkingExperienceItem: React.FC<{
  item: IndexedObject<WorkingExperience>;
}> = ({ item }) => {
  const { id, object } = item;
  const dispatch = useAppDispatch();
  const removeButtonClickHandler = () => {
    dispatch(removeWorkingExperience(id));
  };

  return (
    <li className={classes.item}>
      <span>{object.jobTitle}</span>
      <span>
        {object.company} : {object.employmentType}
      </span>
      <span>{object.isRemote ? 'Дистанційно' : object.jobLocation}</span>
      <span>{`${getFormattedDate(object.startMonth, object.startYear)} - ${
        object.jobIsCurrent
          ? 'Досі'
          : getFormattedDate(object.endMonth, object.endYear)
      }`}</span>
      <FontAwesomeIcon
        icon={faTrash}
        onClick={removeButtonClickHandler}
        className={classes.remove}
      />
    </li>
  );
};

export default WorkingExperienceItem;
