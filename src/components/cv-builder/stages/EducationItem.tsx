import useAppDispatch from '@/hooks/useAppDispatch';
import Education from '@/model/CV/Education';
import IndexedObject from '@/model/IndexedObject';
import { removeEducation } from '@/store/cv-constructor';

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
  const { id, object: education } = item;
  const dispatch = useAppDispatch();
  const removeButtonClickHandler = () => {
    dispatch(removeEducation(id));
  };

  return (
    <li className={classes.item}>
      <span>{`${education.university}, ${education.city}, ${education.country}`}</span>
      <span>
        {education.title} : {education.degree}
      </span>
      <span>{`${education.startYear} - ${
        education.educationIsCurrent ? 'Досі' : education.endYear
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
