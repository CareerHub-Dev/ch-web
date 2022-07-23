import { FC } from 'react';
import classes from './style.module.scss';
export type Props = {
  isOpen: boolean;
  onClick?: (isOpen: boolean) => void;
  theme?: 'dark' | 'light';
};

const NavbarHamburger: FC<Props> = ({
  isOpen = false,
  onClick,
  theme = 'light',
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(!isOpen);
    }
  };
  const themeStyles: { [key: string]: string } = {
    dark: classes.dark,
    light: classes.light,
  };

  return (
    <button className={classes.iconWrapper} onClick={handleClick}>
      <div
        className={`${classes.hamburger} ${isOpen && classes.isActive} ${
          themeStyles[theme]
        }`}
      />
    </button>
  );
};

export default NavbarHamburger;
