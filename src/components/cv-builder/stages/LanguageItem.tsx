import useAppDispatch from '@/hooks/useAppDispatch';
import { removeLanguage } from '@/context/cv-constructor';
import Language from '@/lib/cv/Language';
import TrashIcon from '@/components/ui/icons/TrashIcon';

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
      <span onClick={removeButtonClickHandler} className={classes.remove}>
        <TrashIcon />
      </span>
    </li>
  );
};

export default LanguageItem;
