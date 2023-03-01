import { type ReactNode } from 'react';
import classes from './InfoItem.module.scss';

const InfoItem: React.FC<{
  icon: JSX.Element;
  children: ReactNode;
}> = ({ icon, children }) => {
  return (
    <div className={classes.item}>
      <span className={classes.icon}>{icon}</span>
      <span className={classes.content}>{children}</span>
    </div>
  );
};

export default InfoItem;
