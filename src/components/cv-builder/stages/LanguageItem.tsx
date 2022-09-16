import useAppDispatch from '@/hooks/useAppDispatch';
import { removeLanguage } from '@/store/cv-constructor';
import Language from '@/models/CV/Language';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import classes from './ListItem.module.scss';

const LanguageItem: React.FC<{
  language: IndexedObject<Language>;
}> = ({ language }) => {
  const dispatch = useAppDispatch();

  const removeButtonClickHandler = () => {
    dispatch(removeLanguage(language.id));
  };

  return (
    <li className={classes.item}>
      <p>{language.name}</p>
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
