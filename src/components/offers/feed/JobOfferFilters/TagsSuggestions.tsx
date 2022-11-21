import useAppDispatch from '@/hooks/useAppDispatch';
import { addTag } from '@/context/job-offers-feed';
import cn from 'classnames';
import classes from './TagsSuggestions.module.scss';

const TagsSuggestions = ({
  items,
  display,
}: {
  items: Array<Tag>;
  display: boolean;
}) => {
  const dispatch = useAppDispatch();

  const clickHandler = (tag: Tag) => () => {
    dispatch(addTag(tag));
  };

  const className = cn(
    classes.suggestions,
    'form-input shadow-xl',
    display ? 'block' : 'hidden'
  );

  return (
    <ul className={className}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <li key={index} className={classes.tag} onClick={clickHandler(item)}>
            {item.name}
          </li>
        ))
      ) : (
        <li>Нічого не знайдено</li>
      )}
    </ul>
  );
};
export default TagsSuggestions;
