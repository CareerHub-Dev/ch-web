import classes from './LoadMoreSection.module.scss';

type Props = {
  onClick?: (...params: any[]) => any;
};

const LoadMoreSection = ({ onClick }: Props) => (
  <section className={classes.more}>
    <button onClick={onClick}>Більше</button>
  </section>
);
export default LoadMoreSection;
