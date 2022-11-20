import { useState, useRef } from 'react';
import ChervonDownIcon from '../icons/ChevronDownIcon';
import RemoveIcon from '../icons/RemoveIcon';
import cn from 'classnames';
import classes from './Form.module.scss';
import ArrowRightIcon from '../icons/ArrowRightIcon';

type Props = {
  tags: Array<string>;
  onRemove: AnyFn;
  onAdd: AnyFn;
  onReset: AnyFn;
};

const FormTags = ({ tags, onAdd, onRemove, onReset }: Props) => {
  const [insertionIsOpen, setInsertionIsOpen] = useState(false);
  const tagInsertionInputRef = useRef<HTMLInputElement>(null);

  const insertionToggleHandler = () => {
    setInsertionIsOpen((prev) => !prev);
  };

  const insertionSubmitHandler = () => {
    const tag = tagInsertionInputRef.current?.value;
    onAdd(tag);
    tagInsertionInputRef.current!.value = '';
  };

  return (
    <>
      <div className={classes['tags-control']}>
        <div className={classes.tags}>
          {tags.map((tag) => (
            <div key={tag} className={classes.tag}>
              <div className={classes['tag-label']}>{tag}</div>
              <div
                className={classes['remove-tag']}
                onClick={onRemove.bind(null, tag)}
              >
                <RemoveIcon />
              </div>
            </div>
          ))}
        </div>
        <div className={classes['tags-actions']}>
          <div className={classes['tags-action']} onClick={onReset}>
            <RemoveIcon />
          </div>
          <span className={classes['tags-actions-separator']} />
          <div
            className={classes['tags-action']}
            onClick={insertionToggleHandler}
          >
            <ChervonDownIcon />
          </div>
        </div>
      </div>
      <div className={cn(classes['tags-control'], insertionIsOpen && 'hidden')}>
        <div className={classes.tags}>
          <input className={classes['tag-insert']} ref={tagInsertionInputRef} />
        </div>
        <div className={classes['tags-actions']}>
          <div
            className={classes['tags-action']}
            onClick={insertionSubmitHandler}
          >
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </>
  );
};
export default FormTags;
