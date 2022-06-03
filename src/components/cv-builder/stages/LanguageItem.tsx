import useAppDispatch from '@/hooks/useAppDispatch';
import { removeLanguage } from '@/store/cv-constructor';
import IndexedObject from '@/model/IndexedObject';
import Language from '@/model/CV/Language';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import classes from './ListItem.module.scss';

const LanguageItem: React.FC<{
  language: IndexedObject<Language>;
}> = ({ language }) => {
  const { id, object } = language;
  const dispatch = useAppDispatch();

  const removeButtonClickHandler = () => {
    dispatch(removeLanguage(id));
  };

  return (
    <li className={classes.item}>
      <p>{object.name}</p>
      <span>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={removeButtonClickHandler}
          className={classes.remove}
        />
      </span>
    </li>
  );
};

export default LanguageItem;
