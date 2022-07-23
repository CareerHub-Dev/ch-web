import classes from './style.module.scss';
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

export type Props = {
  label: string;
  onClick?: () => void;
  icon?: IconProp;
};
const NavMenuItem: FC<Props> = ({
  label = 'test label',
  onClick,
  icon,
}: Props) => {
  return (
    <li className={classes.wrapper}>
      <div className={classes.current} />
      {icon && <FontAwesomeIcon icon={icon} />}
      <span>{label}</span>
    </li>
  );
};

export default NavMenuItem;
