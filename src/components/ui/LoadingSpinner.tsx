import classes from './LoadingSpinner.module.scss';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={classes['spinner-wrapper']}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
