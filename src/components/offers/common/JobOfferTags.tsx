import cn from 'classnames';
import classes from './JobOfferTags.module.scss';

const JobOfferTags = ({
  tags,
  variant = 'light',
  onClick,
}: {
  tags: Array<Tag>;
  variant?: 'dark' | 'light';
  onClick?: (tag: Tag) => void;
}) => {
  const tagClasses = cn(classes[variant], !!onClick && classes.clickable);
  const clickHandler = (tag: Tag) => (event: any) => {
    event.preventDefault();
    if (onClick) {
      onClick(tag);
    }
  };
  return (
    <span className={classes.wrapper}>
      <ul className={classes.tags}>
        {tags.map((tag) => (
          <li key={tag.id}>
            <span className={tagClasses} onClick={clickHandler(tag)}>
              {tag.title}
            </span>
          </li>
        ))}
      </ul>
    </span>
  );
};
export default JobOfferTags;
