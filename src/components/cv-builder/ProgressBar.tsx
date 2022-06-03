import classes from './ProgressBar.module.scss';

const ProgressBar: React.FC<{ bgColor: string; completed: number }> = ({
  bgColor,
  completed,
}) => {
  const fillerWidthAndColor = {
    width: `${completed}%`,
    backgroundColor: bgColor,
  };

  return (
    <div className={classes.container}>
      <div className={classes.filler} style={fillerWidthAndColor}>
        <span className={classes.text}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
