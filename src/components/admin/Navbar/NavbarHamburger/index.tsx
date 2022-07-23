import { FC } from 'react';
import classes from './style.module.scss';
export type Props = {
  isOpen: boolean;
  onClick?: (isOpen: boolean) => void;
};

const NavbarHamburger: FC<Props> = ({ isOpen = true, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(!isOpen);
    }
  };

  return (
    <button className={classes.iconWrapper} onClick={handleClick}>
      <div className={`${classes.hamburger} ${isOpen && classes.isActive}`} />
    </button>
  );
};

export default NavbarHamburger;
