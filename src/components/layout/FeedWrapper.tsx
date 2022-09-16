import { type ReactNode } from 'react';
import classes from './FeedWrapper.module.scss';

const FeedWrapper: React.FC<{
  children: ReactNode;
}> = ({ children }) => <div className={classes.feed}>{children}</div>;
export default FeedWrapper;
