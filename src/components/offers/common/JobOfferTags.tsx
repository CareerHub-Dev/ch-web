import classes from './JobOfferTags.module.scss';

const JobOfferTags = ({
  tags,
  variant = 'light',
}: {
  tags: Array<Tag>;
  variant?: 'dark' | 'light';
}) => {
  const tagClasses = classes[variant];

  return (
    <span className={classes.wrapper}>
      <ul className={classes.tags}>
        {tags.map((tag) => (
          <li key={tag.id}>
            <span className={tagClasses}>{tag.title}</span>
          </li>
        ))}
      </ul>
    </span>
  );
};
export default JobOfferTags;
