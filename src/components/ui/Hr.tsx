import cn from 'classnames';
import classes from './Hr.module.scss';

const Hr: React.FC<{
  width?: string;
}> = ({ width = '90%' }) => {
  return (
    <div className={cn(classes.wapper, 'my-2')}>
      <div
        className={classes.hr}
        style={{
          width,
        }}
      />
    </div>
  );
};
export default Hr;
