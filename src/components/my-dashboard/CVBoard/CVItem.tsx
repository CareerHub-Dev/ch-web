import cn from 'classnames';
import classes from './CVItem.module.scss';

type OnClickFn = (id: string) => any;

const CVItem: React.FC<{
  id: string;
  title: string;
  creationDate: string;
  lastEditingDate?: string;
  onClick: OnClickFn;
}> = ({ id, title, creationDate, lastEditingDate, onClick }) => {
  const dummyLastEditedDate = lastEditingDate || creationDate;

  const clickHandler = () => {
    onClick(id);
  };

  return (
    <div className={classes.wrapper} onClick={clickHandler}>
      <h2>{title}</h2>
      <p>{`Створено: ${creationDate}`}</p>
      <p
        className={cn(lastEditingDate === undefined && classes.hidden)}
      >{`Редаговано: ${dummyLastEditedDate}`}</p>
    </div>
  );
};
export default CVItem;
