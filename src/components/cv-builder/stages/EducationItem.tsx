import useAppDispatch from '@/hooks/useAppDispatch';
import Education from '@/lib/cv/Education';
import { removeEducation } from '@/context/cv-constructor';

import classes from './ListItem.module.scss';

const removeIconStyle = {
  fontSize: '1.2rem',
  cursor: 'pointer',
  marginLeft: '0.5rem',
  color: 'red',
};

const EducationItem: React.FC<{ item: IndexedObject<Education> }> = ({
  item,
}) => {
  const dispatch = useAppDispatch();
  const removeButtonClickHandler = () => {
    dispatch(removeEducation(item.id));
  };

  return (
    <li className={classes.item}>
      <span>{`${item.university}, ${item.city}, ${item.country}`}</span>
      <span>
        {item.title} : {item.degree}
      </span>
      <span>{`${item.startYear} - ${
        item.educationIsCurrent ? 'Досі' : item.endYear
      }`}</span>
      <i
        className="fa-solid fa-xmark"
        style={removeIconStyle}
        onClick={removeButtonClickHandler}
      />
    </li>
  );
};

export default EducationItem;
