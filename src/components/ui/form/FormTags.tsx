import { useState, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import cn from 'classnames';
import classes from './Form.module.scss';

const FormTags = ({
  tags,
  onAdd,
  onRemove,
  onReset,
}: {
  tags: Array<string>;
  onRemove: AnyFn;
  onAdd: AnyFn;
  onReset: AnyFn;
}) => {
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
                <XMarkIcon />
              </div>
            </div>
          ))}
        </div>
        <div className={classes['tags-actions']}>
          <div className={classes['tags-action']} onClick={onReset}>
            <XMarkIcon />
          </div>
          <span className={classes['tags-actions-separator']} />
          <div
            className={classes['tags-action']}
            onClick={insertionToggleHandler}
          >
            <ChevronDownIcon />
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
