import Link from 'next/link';
import type { AnyFn } from '@/lib/util/types';
import cn from 'classnames';
import classes from './LinkButton.module.scss';

type ButtonStyle =
  | 'dark-blue-primary'
  | 'light-blue-primary'
  | 'dark-blue-secondary'
  | 'lgbt';

const LinkButton: React.FC<{
  link?: string;
  onClick?: AnyFn;
  style?: ButtonStyle;
  additionalClasses?: string | Array<string>;
}> = ({
  link,
  onClick,
  style = 'dark-blue-primary',
  additionalClasses,
  children,
}) => {
  const allClasses = cn(classes[style], additionalClasses);

  if (link) {
    return (
      <Link href={link}>
        <a className={allClasses}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={allClasses} onClick={onClick}>
      {children}
    </button>
  );
};
export default LinkButton;
