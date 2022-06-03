import classes from './Card.module.scss';
import cn from 'classnames';

const Card: React.FC<{ className?: string }> = ({ className, children }) => {
  return <section className={cn(classes.card, className)}>{children}</section>;
};

export default Card;
