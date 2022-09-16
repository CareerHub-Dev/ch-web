import classes from './Card.module.scss';
import cn from 'classnames';
import { type ReactNode } from 'react';

const Card: React.FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => {
  return <section className={cn(classes.card, className)}>{children}</section>;
};

export default Card;
