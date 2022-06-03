import classes from './FeedWrapper.module.scss';

const FeedWrapper: React.FC = ({ children }) => (
  <div className={classes.feed}>{children}</div>
);
export default FeedWrapper;
