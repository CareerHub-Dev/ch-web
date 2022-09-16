import cn from 'classnames';
import { type ReactNode } from 'react';
import classes from './AssistantTip.module.scss';

type TipType = 'default' | 'good-example' | 'bad-example';

const AssistantTip: React.FC<{ type?: TipType; children: ReactNode }> = ({
  type = 'default',
  children,
}) => {
  return (
    <div className={cn(classes.tip, classes[type])}>
      {(type === 'good-example' && <i className="far fa-thumbs-up" />) ||
        (type === 'bad-example' && <i className="far fa-thumbs-down" />)}
      {children}
    </div>
  );
};

export default AssistantTip;
