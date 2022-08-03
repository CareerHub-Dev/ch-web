import Link from 'next/link';
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
  disabled?: boolean;
}> = ({
  link,
  onClick,
  style = 'dark-blue-primary',
  additionalClasses,
  children,
  disabled = false,
}) => {
  const allClasses = cn(
    classes[style],
    additionalClasses,
    disabled && classes.disabled
  );

  if (link) {
    return (
      <Link href={link}>
        <a className={allClasses}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={allClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default LinkButton;
