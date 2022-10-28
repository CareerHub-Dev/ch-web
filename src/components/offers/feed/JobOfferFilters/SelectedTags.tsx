import { useSelector } from 'react-redux';
import useAppDispatch from '@/hooks/useAppDispatch';
import { removeTag, selectTags } from '@/context/job-offers-feed';
import RemoveIconAlt from '@/components/ui/icons/RemoveIconAlt';

import classes from './SelectedTags.module.scss';

const SelectedTags = () => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectTags);

  if (tags.length === 0) {
    return <div className="g__center">{`Тегів не обрано`}</div>;
  }

  const removeHandler = (tag: Tag) => () => {
    dispatch(removeTag(tag));
  };

  return (
    <span className={classes.wrapper}>
      <ul className={classes.tags}>
        {tags.map((tag) => (
          <li key={tag.id}>
            <span>
              <div className={classes['tag-title']}>{tag.name}</div>
              <div
                role="button"
                className={classes['tag-remove']}
                onClick={removeHandler(tag)}
              >
                <RemoveIconAlt />
              </div>
            </span>
          </li>
        ))}
      </ul>
    </span>
  );
};
export default SelectedTags;
