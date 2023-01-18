import cn from 'classnames';
import { type ReactNode } from 'react';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';
import classes from './AssistantTip.module.scss';

type TipType = 'default' | 'good-example' | 'bad-example';

const AssistantTip: React.FC<{ type?: TipType; children: ReactNode }> = ({
  type = 'default',
  children,
}) => {
  return (
    <div className={cn(classes.tip, classes[type])}>
      {(type === 'good-example' && (
        <HandThumbUpIcon className="h-5 w-5 text-green-600" />
      )) ||
        (type === 'bad-example' && (
          <HandThumbDownIcon className="h-5 w-5 text-red-600" />
        ))}
      {children}
    </div>
  );
};

export default AssistantTip;
