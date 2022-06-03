import classes from './BurgerMenu.module.scss';

const BurgerMenu: React.FC<{
  onClick: () => void;
  isClicked: boolean;
}> = ({ onClick, isClicked }) => {
  return (
    <div className={classes.container} onClick={onClick} role="button">
      <div
        className={`${classes.line} ${isClicked ? classes.open : classes.closed}`}
      ></div>
      <div
        className={`${classes.line} ${isClicked ? classes.open : classes.closed}`}
      ></div>
      <div
        className={`${classes.line} ${isClicked ? classes.open : classes.closed}`}
      ></div>
    </div>
  );
};

export default BurgerMenu;
