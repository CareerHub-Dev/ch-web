import { useSelector } from 'react-redux';
import useAppDispatch from '@/hooks/useAppDispatch';
import { removeTag, selectTags } from '@/context/job-offers-feed';
import { XMarkIcon } from '@heroicons/react/24/outline';

import classes from './SelectedTags.module.scss';

const SelectedTags = () => {
  const dispatch = useAppDispatch();
  const tags = useSelector(selectTags);

  if (tags.length === 0) {
    return (
      <div className="text-center italic text-sm">{`Тегів не обрано`}</div>
    );
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
                <XMarkIcon />
              </div>
            </span>
          </li>
        ))}
      </ul>
    </span>
  );
};
export default SelectedTags;
