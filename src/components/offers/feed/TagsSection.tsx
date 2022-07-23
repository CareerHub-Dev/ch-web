import classes from './TagsSection.module.scss';

const TagsSection: React.FC<{
  tags: Array<Tag>;
}> = ({ tags }) => (
  <section className={classes.tags}>
    {tags &&
      tags.map((tag) => (
        <div key={tag.id} className={classes.tag}>
          {tag.title}
        </div>
      ))}
  </section>
);
export default TagsSection;
