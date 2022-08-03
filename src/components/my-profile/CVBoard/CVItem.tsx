import { getReadableDateFromString } from '@/lib/util';
import cn from 'classnames';
import classes from './CVItem.module.scss';

const CVItem: React.FC<{
  id: string;
  title: string;
  created: string;
  modified?: string;
  onClick: (id: string) => any;
}> = ({ id, title, created, modified, onClick }) => {
  const dummyLastEditedDate = modified || created;

  const clickHandler = () => {
    onClick(id);
  };

  const readableCreatedDate = getReadableDateFromString(created);
  const readableEditedDate = getReadableDateFromString(dummyLastEditedDate);

  return (
    <div className={classes.wrapper} onClick={clickHandler}>
      <h2>{title}</h2>
      <p>{`Створено: ${readableCreatedDate}`}</p>
      <p
        className={cn(modified === undefined && classes.hidden)}
      >{`Редаговано: ${readableEditedDate}`}</p>
    </div>
  );
};
export default CVItem;
