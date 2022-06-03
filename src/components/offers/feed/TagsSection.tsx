import classes from './TagsSection.module.scss';

type Props = {
  tags?: Array<string>;
};

const TagsSection = ({ tags }: Props) => (
  <section className={classes.tags}>
    {tags &&
      tags.map((tag) => (
        <div key={tag} className={classes.tag}>
          {tag}
        </div>
      ))}
  </section>
);
export default TagsSection;
