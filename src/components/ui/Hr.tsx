import classes from './Hr.module.scss';

const Hr: React.FC<{
  width?: string;
}> = ({ width = '90%' }) => {
  return (
    <div className={classes.wapper}>
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
