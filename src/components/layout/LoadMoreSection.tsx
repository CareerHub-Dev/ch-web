import classes from './LoadMoreSection.module.scss';

const LoadMoreSection = ({ onClick }: { onClick: AnyFn }) => (
  <section className={classes.more}>
    <button onClick={onClick}>Більше</button>
  </section>
);
export default LoadMoreSection;
