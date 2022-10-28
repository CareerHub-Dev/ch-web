import Link from 'next/link';
import cn from 'classnames';

const NavLink = ({
  href,
  active,
  text,
}: {
  href: string;
  active?: boolean;
  text: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'hover:text-primaryBlack transition-all ease duration-200',
        active && 'text-lightBlueAccent hover:text-lightBlueAccent'
      )}
    >
      {text}
    </Link>
  );
};
export default NavLink;
